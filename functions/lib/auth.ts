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
