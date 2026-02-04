# Phase 1: Foundation - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Set up Cloudflare infrastructure (D1, KV) and Authentik OAuth integration for user authentication.

**Architecture:** Cloudflare Pages Functions handle API routes. D1 stores persistent data (users, submissions, annotations). KV stores ephemeral sessions with TTL. Authentik provides OAuth2/OIDC identity.

**Tech Stack:** TypeScript, Cloudflare Pages Functions, D1, KV, Authentik OAuth2

---

## Prerequisites

Before starting, ensure you have:
- Wrangler CLI installed (`npm install -g wrangler`)
- Logged into Cloudflare (`wrangler login`)
- Access to Authentik admin at `sso.irregularchat.com`

---

## Task 1: Create Wrangler Configuration

**Files:**
- Create: `wrangler.toml`

**Step 1: Create wrangler.toml**

```toml
name = "irregularpedia"
compatibility_date = "2024-01-01"
pages_build_output_dir = "dist"

# D1 Database - will be created in Task 2
# [[d1_databases]]
# binding = "DB"
# database_name = "irregularpedia-db"
# database_id = "TO_BE_FILLED"

# KV Namespace - will be created in Task 3
# [[kv_namespaces]]
# binding = "SESSIONS"
# id = "TO_BE_FILLED"

[vars]
AUTHENTIK_URL = "https://sso.irregularchat.com"
AUTHENTIK_CLIENT_ID = "irregularpedia"
WIKI_URL = "https://irregularpedia.org"

# Secrets to set via `wrangler secret put`:
# - AUTHENTIK_CLIENT_SECRET
# - FORGEJO_API_TOKEN
# - SIGNAL_BOT_TOKEN
# - SIGNAL_MODERATOR_GROUP_ID
```

**Step 2: Verify wrangler recognizes the project**

Run: `wrangler whoami`
Expected: Shows your Cloudflare account info

**Step 3: Commit**

```bash
git add wrangler.toml
git commit -m "chore: add wrangler configuration for Cloudflare Pages"
```

---

## Task 2: Create D1 Database

**Files:**
- Modify: `wrangler.toml`
- Create: `migrations/0001_initial_schema.sql`

**Step 1: Create the D1 database**

Run: `wrangler d1 create irregularpedia-db`
Expected output:
```
✅ Successfully created DB 'irregularpedia-db'

[[d1_databases]]
binding = "DB"
database_name = "irregularpedia-db"
database_id = "<some-uuid>"
```

**Step 2: Update wrangler.toml with the database ID**

Uncomment and fill in the d1_databases section with the ID from Step 1:

```toml
[[d1_databases]]
binding = "DB"
database_name = "irregularpedia-db"
database_id = "<paste-id-from-step-1>"
```

**Step 3: Create migrations directory and initial schema**

Create file `migrations/0001_initial_schema.sql`:

```sql
-- Users table (synced from Authentik on login)
CREATE TABLE users (
  id TEXT PRIMARY KEY,
  authentik_id TEXT UNIQUE NOT NULL,
  username TEXT NOT NULL,
  email TEXT,
  groups TEXT,  -- JSON array of group names
  created_at INTEGER DEFAULT (unixepoch()),
  last_login INTEGER
);

CREATE INDEX idx_users_authentik ON users(authentik_id);

-- Edit submissions
CREATE TABLE edit_submissions (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,
  original_content TEXT NOT NULL,
  proposed_content TEXT NOT NULL,
  summary TEXT,

  user_id TEXT,
  username TEXT,
  anonymous_id TEXT,

  status TEXT DEFAULT 'pending',
  reviewed_by TEXT,
  reviewed_at INTEGER,
  review_note TEXT,

  created_at INTEGER DEFAULT (unixepoch()),
  forgejo_pr_url TEXT,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_submissions_status ON edit_submissions(status, created_at DESC);
CREATE INDEX idx_submissions_page ON edit_submissions(page_path);

-- Annotations
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,

  anchor_prefix TEXT,
  anchor_exact TEXT NOT NULL,
  anchor_suffix TEXT,
  anchor_page_version TEXT,

  body TEXT NOT NULL,
  parent_id TEXT,

  user_id TEXT,
  username TEXT,
  anonymous_id TEXT,

  status TEXT DEFAULT 'visible',
  upvotes INTEGER DEFAULT 0,

  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (parent_id) REFERENCES annotations(id)
);

CREATE INDEX idx_annotations_page ON annotations(page_path, status);
CREATE INDEX idx_annotations_parent ON annotations(parent_id);

-- Bookmarks
CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  folder TEXT,
  notes TEXT,
  created_at INTEGER DEFAULT (unixepoch()),

  UNIQUE(user_id, page_path),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_bookmarks_user ON bookmarks(user_id);

-- Reading history
CREATE TABLE reading_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  visited_at INTEGER DEFAULT (unixepoch()),
  time_on_page INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE INDEX idx_history_user ON reading_history(user_id, visited_at DESC);

-- User preferences
CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  theme TEXT DEFAULT 'auto',
  sidebar_collapsed INTEGER DEFAULT 0,
  annotation_visibility TEXT DEFAULT 'all',
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER,

  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Annotation votes (prevent duplicate votes)
CREATE TABLE annotation_votes (
  annotation_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  created_at INTEGER DEFAULT (unixepoch()),

  PRIMARY KEY (annotation_id, user_id),
  FOREIGN KEY (annotation_id) REFERENCES annotations(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Step 4: Run migration locally**

Run: `wrangler d1 execute irregularpedia-db --local --file=migrations/0001_initial_schema.sql`
Expected: `🌀 Executing on local database...` with no errors

**Step 5: Run migration on remote (production)**

Run: `wrangler d1 execute irregularpedia-db --remote --file=migrations/0001_initial_schema.sql`
Expected: `🌀 Executing on remote database...` with no errors

**Step 6: Verify tables were created**

Run: `wrangler d1 execute irregularpedia-db --remote --command="SELECT name FROM sqlite_master WHERE type='table' ORDER BY name;"`
Expected: Lists all tables (annotations, bookmarks, edit_submissions, etc.)

**Step 7: Commit**

```bash
git add wrangler.toml migrations/
git commit -m "feat: create D1 database with initial schema"
```

---

## Task 3: Create KV Namespace for Sessions

**Files:**
- Modify: `wrangler.toml`

**Step 1: Create the KV namespace**

Run: `wrangler kv namespace create SESSIONS`
Expected output:
```
🌀 Creating namespace with title "irregularpedia-SESSIONS"
✨ Success!
Add the following to your wrangler.toml:

[[kv_namespaces]]
binding = "SESSIONS"
id = "<some-uuid>"
```

**Step 2: Update wrangler.toml**

Uncomment and fill in the kv_namespaces section:

```toml
[[kv_namespaces]]
binding = "SESSIONS"
id = "<paste-id-from-step-1>"
```

**Step 3: Verify KV is accessible**

Run: `wrangler kv key list --namespace-id=<your-namespace-id>`
Expected: Empty list `[]` (no keys yet)

**Step 4: Commit**

```bash
git add wrangler.toml
git commit -m "feat: create KV namespace for session storage"
```

---

## Task 4: Create TypeScript Types for Cloudflare Bindings

**Files:**
- Create: `functions/types.ts`

**Step 1: Create types file**

Create file `functions/types.ts`:

```typescript
// Cloudflare environment bindings
export interface Env {
  // D1 Database
  DB: D1Database;

  // KV Namespace
  SESSIONS: KVNamespace;

  // Environment variables
  AUTHENTIK_URL: string;
  AUTHENTIK_CLIENT_ID: string;
  AUTHENTIK_CLIENT_SECRET: string;
  WIKI_URL: string;

  // Optional integrations
  FORGEJO_API_TOKEN?: string;
  SIGNAL_BOT_URL?: string;
  SIGNAL_BOT_TOKEN?: string;
  SIGNAL_MODERATOR_GROUP_ID?: string;
}

// Session stored in KV
export interface Session {
  userId: string;
  authentikId: string;
  username: string;
  email: string | null;
  groups: string[];
  createdAt: number;
  lastActive: number;
}

// User from D1
export interface User {
  id: string;
  authentik_id: string;
  username: string;
  email: string | null;
  groups: string | null;  // JSON string in DB
  created_at: number;
  last_login: number | null;
}

// Authentik token response
export interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token?: string;
  id_token?: string;
}

// Authentik user info
export interface AuthentikUserInfo {
  sub: string;
  preferred_username: string;
  email?: string;
  email_verified?: boolean;
  groups?: string[];
}

// API response helpers
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

// Auth context passed to handlers
export interface AuthContext {
  user: Session | null;
  isAuthenticated: boolean;
  hasGroup: (group: string) => boolean;
}
```

**Step 2: Commit**

```bash
git add functions/types.ts
git commit -m "feat: add TypeScript types for Cloudflare bindings"
```

---

## Task 5: Create Auth Utilities

**Files:**
- Create: `functions/lib/auth.ts`

**Step 1: Create auth utilities**

Create file `functions/lib/auth.ts`:

```typescript
import type { Env, Session, AuthContext } from '../types';

const SESSION_COOKIE_NAME = 'wiki_session';
const SESSION_TTL_SECONDS = 7 * 24 * 60 * 60; // 7 days

/**
 * Generate a cryptographically random session ID
 */
export function generateSessionId(): string {
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Generate a random state parameter for OAuth
 */
export function generateState(): string {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Parse session ID from cookie header
 */
export function getSessionIdFromCookies(cookieHeader: string | null): string | null {
  if (!cookieHeader) return null;

  const cookies = cookieHeader.split(';').map(c => c.trim());
  for (const cookie of cookies) {
    const [name, value] = cookie.split('=');
    if (name === SESSION_COOKIE_NAME) {
      return value;
    }
  }
  return null;
}

/**
 * Create Set-Cookie header for session
 */
export function createSessionCookie(sessionId: string, secure: boolean = true): string {
  const parts = [
    `${SESSION_COOKIE_NAME}=${sessionId}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Lax',
    `Max-Age=${SESSION_TTL_SECONDS}`,
  ];

  if (secure) {
    parts.push('Secure');
  }

  return parts.join('; ');
}

/**
 * Create Set-Cookie header to clear session
 */
export function createLogoutCookie(): string {
  return `${SESSION_COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`;
}

/**
 * Store session in KV
 */
export async function storeSession(
  kv: KVNamespace,
  sessionId: string,
  session: Session
): Promise<void> {
  await kv.put(
    `session:${sessionId}`,
    JSON.stringify(session),
    { expirationTtl: SESSION_TTL_SECONDS }
  );
}

/**
 * Retrieve session from KV
 */
export async function getSession(
  kv: KVNamespace,
  sessionId: string
): Promise<Session | null> {
  const data = await kv.get(`session:${sessionId}`);
  if (!data) return null;

  try {
    return JSON.parse(data) as Session;
  } catch {
    return null;
  }
}

/**
 * Delete session from KV
 */
export async function deleteSession(
  kv: KVNamespace,
  sessionId: string
): Promise<void> {
  await kv.delete(`session:${sessionId}`);
}

/**
 * Update session last active time
 */
export async function touchSession(
  kv: KVNamespace,
  sessionId: string,
  session: Session
): Promise<void> {
  session.lastActive = Date.now();
  await storeSession(kv, sessionId, session);
}

/**
 * Get auth context from request
 */
export async function getAuthContext(
  request: Request,
  env: Env
): Promise<AuthContext> {
  const cookieHeader = request.headers.get('Cookie');
  const sessionId = getSessionIdFromCookies(cookieHeader);

  if (!sessionId) {
    return {
      user: null,
      isAuthenticated: false,
      hasGroup: () => false,
    };
  }

  const session = await getSession(env.SESSIONS, sessionId);

  if (!session) {
    return {
      user: null,
      isAuthenticated: false,
      hasGroup: () => false,
    };
  }

  return {
    user: session,
    isAuthenticated: true,
    hasGroup: (group: string) => session.groups.includes(group),
  };
}

/**
 * Require authentication - returns 401 if not authenticated
 */
export function requireAuth(auth: AuthContext): Response | null {
  if (!auth.isAuthenticated) {
    return new Response(JSON.stringify({
      success: false,
      error: 'Authentication required',
    }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}

/**
 * Require specific group - returns 403 if not in group
 */
export function requireGroup(auth: AuthContext, group: string): Response | null {
  const authError = requireAuth(auth);
  if (authError) return authError;

  if (!auth.hasGroup(group)) {
    return new Response(JSON.stringify({
      success: false,
      error: `Requires ${group} group membership`,
    }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  return null;
}
```

**Step 2: Commit**

```bash
git add functions/lib/auth.ts
git commit -m "feat: add auth utilities for session management"
```

---

## Task 6: Create Authentik OAuth Client

**Files:**
- Create: `functions/lib/authentik.ts`

**Step 1: Create Authentik client**

Create file `functions/lib/authentik.ts`:

```typescript
import type { Env, TokenResponse, AuthentikUserInfo } from '../types';

/**
 * Build the Authentik authorization URL
 */
export function buildAuthorizationUrl(
  env: Env,
  state: string,
  redirectUri: string
): string {
  const params = new URLSearchParams({
    client_id: env.AUTHENTIK_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    scope: 'openid profile email groups',
    state: state,
  });

  return `${env.AUTHENTIK_URL}/application/o/authorize/?${params.toString()}`;
}

/**
 * Exchange authorization code for tokens
 */
export async function exchangeCodeForTokens(
  env: Env,
  code: string,
  redirectUri: string
): Promise<TokenResponse> {
  const response = await fetch(`${env.AUTHENTIK_URL}/application/o/token/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: env.AUTHENTIK_CLIENT_ID,
      client_secret: env.AUTHENTIK_CLIENT_SECRET,
      code: code,
      redirect_uri: redirectUri,
    }).toString(),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Token exchange failed: ${error}`);
  }

  return response.json() as Promise<TokenResponse>;
}

/**
 * Fetch user info from Authentik
 */
export async function fetchUserInfo(
  env: Env,
  accessToken: string
): Promise<AuthentikUserInfo> {
  const response = await fetch(`${env.AUTHENTIK_URL}/application/o/userinfo/`, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`User info fetch failed: ${error}`);
  }

  return response.json() as Promise<AuthentikUserInfo>;
}

/**
 * Build the Authentik logout URL
 */
export function buildLogoutUrl(env: Env, postLogoutRedirectUri: string): string {
  const params = new URLSearchParams({
    post_logout_redirect_uri: postLogoutRedirectUri,
  });

  return `${env.AUTHENTIK_URL}/application/o/irregularpedia/end-session/?${params.toString()}`;
}
```

**Step 2: Commit**

```bash
git add functions/lib/authentik.ts
git commit -m "feat: add Authentik OAuth client"
```

---

## Task 7: Create Auth Login Endpoint

**Files:**
- Create: `functions/api/auth/login.ts`

**Step 1: Create login endpoint**

Create file `functions/api/auth/login.ts`:

```typescript
import type { Env } from '../../types';
import { generateState } from '../../lib/auth';
import { buildAuthorizationUrl } from '../../lib/authentik';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Get the return URL from query params (where to redirect after login)
  const url = new URL(request.url);
  const returnTo = url.searchParams.get('return_to') || '/';

  // Generate state parameter (includes return URL)
  const state = generateState();

  // Store state temporarily in KV (5 minute TTL)
  await env.SESSIONS.put(
    `oauth_state:${state}`,
    JSON.stringify({ returnTo }),
    { expirationTtl: 300 }
  );

  // Build redirect URI
  const redirectUri = `${env.WIKI_URL}/api/auth/callback`;

  // Build authorization URL
  const authUrl = buildAuthorizationUrl(env, state, redirectUri);

  // Redirect to Authentik
  return Response.redirect(authUrl, 302);
};
```

**Step 2: Commit**

```bash
git add functions/api/auth/login.ts
git commit -m "feat: add /api/auth/login endpoint"
```

---

## Task 8: Create Auth Callback Endpoint

**Files:**
- Create: `functions/api/auth/callback.ts`

**Step 1: Create callback endpoint**

Create file `functions/api/auth/callback.ts`:

```typescript
import type { Env, Session } from '../../types';
import {
  generateSessionId,
  storeSession,
  createSessionCookie,
} from '../../lib/auth';
import {
  exchangeCodeForTokens,
  fetchUserInfo,
} from '../../lib/authentik';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;
  const url = new URL(request.url);

  // Get authorization code and state from query params
  const code = url.searchParams.get('code');
  const state = url.searchParams.get('state');
  const error = url.searchParams.get('error');
  const errorDescription = url.searchParams.get('error_description');

  // Handle OAuth errors
  if (error) {
    console.error(`OAuth error: ${error} - ${errorDescription}`);
    return Response.redirect(`${env.WIKI_URL}/?error=auth_failed`, 302);
  }

  if (!code || !state) {
    return Response.redirect(`${env.WIKI_URL}/?error=missing_params`, 302);
  }

  // Verify state parameter
  const stateData = await env.SESSIONS.get(`oauth_state:${state}`);
  if (!stateData) {
    console.error('Invalid or expired state parameter');
    return Response.redirect(`${env.WIKI_URL}/?error=invalid_state`, 302);
  }

  // Delete used state
  await env.SESSIONS.delete(`oauth_state:${state}`);

  // Parse state data
  let returnTo = '/';
  try {
    const parsed = JSON.parse(stateData);
    returnTo = parsed.returnTo || '/';
  } catch {
    // Use default
  }

  try {
    // Exchange code for tokens
    const redirectUri = `${env.WIKI_URL}/api/auth/callback`;
    const tokens = await exchangeCodeForTokens(env, code, redirectUri);

    // Fetch user info
    const userInfo = await fetchUserInfo(env, tokens.access_token);

    // Generate session ID
    const sessionId = generateSessionId();

    // Create session object
    const session: Session = {
      userId: userInfo.sub,
      authentikId: userInfo.sub,
      username: userInfo.preferred_username,
      email: userInfo.email || null,
      groups: userInfo.groups || [],
      createdAt: Date.now(),
      lastActive: Date.now(),
    };

    // Store session in KV
    await storeSession(env.SESSIONS, sessionId, session);

    // Upsert user in D1
    await env.DB.prepare(`
      INSERT INTO users (id, authentik_id, username, email, groups, last_login)
      VALUES (?, ?, ?, ?, ?, ?)
      ON CONFLICT (authentik_id) DO UPDATE SET
        username = excluded.username,
        email = excluded.email,
        groups = excluded.groups,
        last_login = excluded.last_login
    `).bind(
      userInfo.sub,
      userInfo.sub,
      userInfo.preferred_username,
      userInfo.email || null,
      JSON.stringify(userInfo.groups || []),
      Date.now()
    ).run();

    // Create response with session cookie
    const response = Response.redirect(`${env.WIKI_URL}${returnTo}`, 302);

    // Clone response to add cookie header
    const headers = new Headers(response.headers);
    headers.set('Set-Cookie', createSessionCookie(sessionId));

    return new Response(response.body, {
      status: 302,
      headers,
    });

  } catch (err) {
    console.error('Auth callback error:', err);
    return Response.redirect(`${env.WIKI_URL}/?error=auth_failed`, 302);
  }
};
```

**Step 2: Commit**

```bash
git add functions/api/auth/callback.ts
git commit -m "feat: add /api/auth/callback endpoint"
```

---

## Task 9: Create Auth Logout Endpoint

**Files:**
- Create: `functions/api/auth/logout.ts`

**Step 1: Create logout endpoint**

Create file `functions/api/auth/logout.ts`:

```typescript
import type { Env } from '../../types';
import {
  getSessionIdFromCookies,
  deleteSession,
  createLogoutCookie,
} from '../../lib/auth';
import { buildLogoutUrl } from '../../lib/authentik';

export const onRequestPost: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Get session ID from cookie
  const cookieHeader = request.headers.get('Cookie');
  const sessionId = getSessionIdFromCookies(cookieHeader);

  // Delete session from KV if exists
  if (sessionId) {
    await deleteSession(env.SESSIONS, sessionId);
  }

  // Build response that clears cookie
  const headers = new Headers();
  headers.set('Set-Cookie', createLogoutCookie());
  headers.set('Content-Type', 'application/json');

  return new Response(JSON.stringify({
    success: true,
    message: 'Logged out successfully',
  }), {
    status: 200,
    headers,
  });
};

// Also support GET for simple logout links
export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  // Get session ID from cookie
  const cookieHeader = request.headers.get('Cookie');
  const sessionId = getSessionIdFromCookies(cookieHeader);

  // Delete session from KV if exists
  if (sessionId) {
    await deleteSession(env.SESSIONS, sessionId);
  }

  // Redirect to home with cleared cookie
  const headers = new Headers();
  headers.set('Set-Cookie', createLogoutCookie());
  headers.set('Location', env.WIKI_URL);

  return new Response(null, {
    status: 302,
    headers,
  });
};
```

**Step 2: Commit**

```bash
git add functions/api/auth/logout.ts
git commit -m "feat: add /api/auth/logout endpoint"
```

---

## Task 10: Create Auth Me Endpoint

**Files:**
- Create: `functions/api/auth/me.ts`

**Step 1: Create me endpoint**

Create file `functions/api/auth/me.ts`:

```typescript
import type { Env } from '../../types';
import { getAuthContext, touchSession, getSessionIdFromCookies } from '../../lib/auth';

export const onRequestGet: PagesFunction<Env> = async (context) => {
  const { env, request } = context;

  const auth = await getAuthContext(request, env);

  if (!auth.isAuthenticated || !auth.user) {
    return new Response(JSON.stringify({
      success: true,
      authenticated: false,
      user: null,
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Touch session to extend TTL
  const sessionId = getSessionIdFromCookies(request.headers.get('Cookie'));
  if (sessionId) {
    await touchSession(env.SESSIONS, sessionId, auth.user);
  }

  return new Response(JSON.stringify({
    success: true,
    authenticated: true,
    user: {
      id: auth.user.userId,
      username: auth.user.username,
      email: auth.user.email,
      groups: auth.user.groups,
    },
  }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
```

**Step 2: Commit**

```bash
git add functions/api/auth/me.ts
git commit -m "feat: add /api/auth/me endpoint"
```

---

## Task 11: Create Authentik Application

**This task is done in Authentik admin UI at sso.irregularchat.com**

**Step 1: Log into Authentik admin**

Navigate to: `https://sso.irregularchat.com/if/admin/`

**Step 2: Create OAuth2/OpenID Provider**

1. Go to **Applications** → **Providers** → **Create**
2. Select **OAuth2/OpenID Provider**
3. Fill in:
   - **Name**: `Irregularpedia`
   - **Authorization flow**: Select your default authorization flow
   - **Client type**: `Confidential`
   - **Client ID**: `irregularpedia` (or let it auto-generate)
   - **Client Secret**: Click generate, **save this value**
   - **Redirect URIs**: `https://irregularpedia.org/api/auth/callback`
   - **Scopes**: Select `openid`, `profile`, `email`
   - **Subject mode**: `Based on User's ID`

4. Click **Create**

**Step 3: Create Application**

1. Go to **Applications** → **Applications** → **Create**
2. Fill in:
   - **Name**: `Irregularpedia`
   - **Slug**: `irregularpedia`
   - **Provider**: Select `Irregularpedia` (created above)
   - **Launch URL**: `https://irregularpedia.org`

3. Click **Create**

**Step 4: Configure Groups Scope (Optional but recommended)**

To include user groups in the token:

1. Go to **Customization** → **Property Mappings**
2. Find or create a mapping for groups
3. Ensure the provider includes this mapping

**Step 5: Store the client secret in Cloudflare**

Run: `wrangler secret put AUTHENTIK_CLIENT_SECRET`
Paste the client secret when prompted.

**Step 6: Document completion**

No code commit needed - this is infrastructure configuration.

---

## Task 12: Test Auth Flow Locally

**Step 1: Start local development server**

Run: `wrangler pages dev dist --d1=DB --kv=SESSIONS`

Note: You may need to build first with `npm run build`

**Step 2: Test login redirect**

Open browser to: `http://localhost:8788/api/auth/login`
Expected: Redirects to `sso.irregularchat.com` login page

**Step 3: Complete login flow**

1. Log in with your Authentik credentials
2. Authorize the Irregularpedia application
3. Should redirect back to `http://localhost:8788/`
4. Check browser cookies - should have `wiki_session` cookie

**Step 4: Test /api/auth/me**

Open: `http://localhost:8788/api/auth/me`
Expected: JSON response with your user info

```json
{
  "success": true,
  "authenticated": true,
  "user": {
    "id": "your-authentik-uuid",
    "username": "yourusername",
    "email": "you@example.com",
    "groups": ["wiki-editors"]
  }
}
```

**Step 5: Test logout**

Open: `http://localhost:8788/api/auth/logout`
Expected: Redirects to home, `wiki_session` cookie cleared

---

## Task 13: Deploy and Verify Production

**Step 1: Build the site**

Run: `npm run build`
Expected: Astro builds to `dist/` directory

**Step 2: Deploy to Cloudflare Pages**

Run: `wrangler pages deploy dist --project-name=irregularchatwiki`
Expected: Deployment URL returned

**Step 3: Verify production auth endpoints**

Test login: `https://irregularpedia.org/api/auth/login`
Expected: Redirects to Authentik

Test me (unauthenticated): `curl https://irregularpedia.org/api/auth/me`
Expected:
```json
{"success":true,"authenticated":false,"user":null}
```

**Step 4: Complete full auth flow in production**

1. Visit `https://irregularpedia.org/api/auth/login`
2. Log in at Authentik
3. Should redirect back to wiki
4. Visit `https://irregularpedia.org/api/auth/me` - should show user info

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Phase 1 - Cloudflare infrastructure and Authentik auth"
git push
```

---

## Summary

Phase 1 establishes:

- ✅ Cloudflare D1 database with full schema
- ✅ Cloudflare KV namespace for sessions
- ✅ Authentik OAuth2 integration
- ✅ Four auth endpoints: login, callback, logout, me
- ✅ Session management utilities
- ✅ TypeScript types for all bindings

**Next Phase**: Phase 2 - Page Editor (markdown editor UI, edit submission API, Forgejo PR integration)
