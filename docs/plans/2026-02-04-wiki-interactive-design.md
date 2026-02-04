# Irregularpedia Interactive - Design Document

**Date**: 2026-02-04
**Status**: Approved
**Author**: IrregularChat Community

## Overview

Transform the static Irregularpedia wiki (340 pages, Astro Starlight) into a dynamic, community-driven platform using Cloudflare Pages Functions. Enable contributions, personalization, and inline discussions while leveraging existing Authentik SSO infrastructure.

## Goals

1. **Lower friction for contributions** - Edit pages directly from the wiki UI
2. **Enable community discussion** - Inline annotations on any text
3. **Personalization** - Bookmarks, reading history, synced across devices
4. **Maintain quality** - Moderation queue for anonymous submissions
5. **Integrate existing infrastructure** - Authentik SSO, Forgejo, Signal bot

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      irregularpedia.org                         │
├─────────────────────────────────────────────────────────────────┤
│  Astro Starlight (Static)     │  Cloudflare Functions (Dynamic) │
│  ─────────────────────────    │  ───────────────────────────── │
│  • 340 wiki pages             │  /api/auth/*     (Authentik)    │
│  • Search, navigation         │  /api/user/*     (Bookmarks)    │
│  • Site graph, tags           │  /api/edit/*     (Page Editor)  │
│                               │  /api/annotate/* (Comments)     │
│                               │  /api/moderate/* (Review Queue) │
└─────────────────────────────────────────────────────────────────┘
                                        │
        ┌───────────────────────────────┼───────────────────────────────┐
        ▼                               ▼                               ▼
┌───────────────┐             ┌─────────────────┐             ┌─────────────────┐
│  Authentik    │             │  Cloudflare     │             │  External       │
│  SSO          │             │  D1 + KV        │             │  Services       │
│  ───────────  │             │  ────────────   │             │  ───────────    │
│  sso.irregu-  │             │  D1: users,     │             │  Forgejo API    │
│  larchat.com  │             │      bookmarks, │             │  Signal Bot API │
│               │             │      annotations│             │                 │
│               │             │  KV: sessions,  │             │                 │
│               │             │      rate limits│             │                 │
└───────────────┘             └─────────────────┘             └─────────────────┘
```

## Authentication

### Authentik OAuth2/OIDC Flow

1. User clicks "Login" → redirect to `sso.irregularchat.com`
2. User authenticates (existing account)
3. Callback to `/api/auth/callback` with authorization code
4. Exchange code for tokens, fetch user info
5. Create session in Cloudflare KV
6. Set HttpOnly cookie, redirect to original page

### Session Structure (KV)

```typescript
// Key: session:{sessionId}
// TTL: 7 days
{
  userId: "authentik-uuid",
  username: "tacticaloperator",
  email: "user@example.com",
  groups: ["wiki-editors", "moderators"],
  createdAt: 1707100800000,
  lastActive: 1707100800000
}
```

### Role Mapping

| Authentik Group | Wiki Permissions |
|-----------------|------------------|
| `wiki-editors` | Direct PR creation, instant annotations |
| `wiki-moderators` | Review queue access, approve/reject |
| `wiki-admins` | All above + user management |
| (no group) | Authenticated but moderated |

### Authentik Configuration Required

- **Application**: Irregularpedia
- **Provider**: OAuth2/OIDC
- **Redirect URI**: `https://irregularpedia.org/api/auth/callback`
- **Scopes**: `openid profile email groups`

## Page Editor

### UI Design

Split-pane editor with live preview:
- Left: Markdown source editor
- Right: Rendered preview
- Bottom: Summary field, submit buttons

### Submission Flow

```
User submits edit
       │
       ├── Authenticated + wiki-editors group
       │   └── Create Forgejo PR directly
       │
       ├── Authenticated (no editor group)
       │   └── Insert to D1 moderation queue (pending)
       │       └── Signal notification to moderators
       │
       └── Anonymous
           └── Insert to D1 moderation queue (pending)
               └── Signal notification to moderators
```

### D1 Schema: edit_submissions

```sql
CREATE TABLE edit_submissions (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,
  original_content TEXT NOT NULL,
  proposed_content TEXT NOT NULL,
  summary TEXT,

  user_id TEXT,
  username TEXT,
  anonymous_id TEXT,

  status TEXT DEFAULT 'pending',  -- pending, approved, rejected
  reviewed_by TEXT,
  reviewed_at INTEGER,
  review_note TEXT,

  created_at INTEGER DEFAULT (unixepoch()),
  forgejo_pr_url TEXT
);
```

## Inline Annotations

### Text Anchoring

Annotations anchor to text using prefix + exact match + suffix pattern:

```typescript
interface TextAnchor {
  prefix: string;      // 32 chars before selection
  exact: string;       // The highlighted text
  suffix: string;      // 32 chars after selection
  pageVersion: string; // Git commit SHA when created
}
```

### D1 Schema: annotations

```sql
CREATE TABLE annotations (
  id TEXT PRIMARY KEY,
  page_path TEXT NOT NULL,

  anchor_prefix TEXT,
  anchor_exact TEXT NOT NULL,
  anchor_suffix TEXT,
  anchor_page_version TEXT,

  body TEXT NOT NULL,
  parent_id TEXT,  -- For threaded replies

  user_id TEXT,
  username TEXT,
  anonymous_id TEXT,

  status TEXT DEFAULT 'visible',  -- visible, pending, hidden, resolved
  upvotes INTEGER DEFAULT 0,

  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER
);

CREATE INDEX idx_annotations_page ON annotations(page_path, status);
```

### Visibility Rules

| Author Type | Status | Who Can See |
|-------------|--------|-------------|
| Authenticated (editor group) | `visible` | Everyone |
| Authenticated (no group) | `pending` | Author + Moderators |
| Anonymous | `pending` | Moderators only |

## Personalization

### Features

- **Bookmarks**: Save pages, organize into folders, add personal notes
- **Reading History**: Track recently viewed pages (last 100)
- **Preferences**: Theme, sidebar state, annotation visibility

### D1 Schema

```sql
CREATE TABLE bookmarks (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  folder TEXT,
  notes TEXT,
  created_at INTEGER DEFAULT (unixepoch()),
  UNIQUE(user_id, page_path)
);

CREATE TABLE reading_history (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  visited_at INTEGER DEFAULT (unixepoch()),
  time_on_page INTEGER
);

CREATE INDEX idx_history_user ON reading_history(user_id, visited_at DESC);

CREATE TABLE user_preferences (
  user_id TEXT PRIMARY KEY,
  theme TEXT DEFAULT 'auto',
  sidebar_collapsed INTEGER DEFAULT 0,
  annotation_visibility TEXT DEFAULT 'all',
  created_at INTEGER DEFAULT (unixepoch()),
  updated_at INTEGER
);
```

## Moderation

### Forgejo Integration

Approved edits become PRs in `git.irregularchat.com/irregulars/IrregularChatWiki`:
- Label: `community-contribution`
- Branch: `contrib/{submission-id}`
- Auto-generated PR description with diff summary

### Signal Bot Notifications

On new pending submission:

```typescript
async function notifyModerators(submission: EditSubmission, env: Env) {
  const message = `🔔 New wiki edit pending review

Page: ${submission.page_path}
Summary: "${submission.summary || 'No summary'}"
Submitter: ${submission.username || 'anonymous'}

Review: https://irregularpedia.org/moderate/edit/${submission.id}`;

  await fetch(`${env.SIGNAL_BOT_URL}/bot/send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${env.SIGNAL_BOT_TOKEN}`
    },
    body: JSON.stringify({
      groupId: env.SIGNAL_MODERATOR_GROUP_ID,
      message
    })
  });
}
```

### Moderator Actions

| Action | Result |
|--------|--------|
| Approve → Create PR | Creates Forgejo PR with label |
| Approve → Merge Direct | Commits to main (minor fixes) |
| Reject | Marks rejected, optional feedback |

## File Structure

```
IrregularChatWiki/
├── src/content/docs/           # Existing wiki pages
├── functions/                  # Cloudflare Pages Functions
│   └── api/
│       ├── auth/
│       │   ├── login.ts
│       │   ├── callback.ts
│       │   ├── logout.ts
│       │   └── me.ts
│       ├── user/
│       │   ├── bookmarks.ts
│       │   ├── history.ts
│       │   └── preferences.ts
│       ├── edit/
│       │   ├── submit.ts
│       │   └── [id].ts
│       ├── annotate/
│       │   ├── [page].ts
│       │   ├── create.ts
│       │   └── vote.ts
│       └── moderate/
│           ├── queue.ts
│           ├── review.ts
│           └── notify.ts
├── public/js/
│   ├── wiki-interactive.js
│   └── annotation-layer.js
└── wrangler.toml
```

## API Endpoints

| Endpoint | Method | Auth | Purpose |
|----------|--------|------|---------|
| `/api/auth/login` | GET | - | Initiate Authentik login |
| `/api/auth/callback` | GET | - | OAuth callback |
| `/api/auth/logout` | POST | ✓ | End session |
| `/api/auth/me` | GET | ✓ | Current user info |
| `/api/user/bookmarks` | GET/POST/DELETE | ✓ | Manage bookmarks |
| `/api/user/history` | GET/POST | ✓ | Reading history |
| `/api/edit/submit` | POST | ○ | Submit page edit |
| `/api/annotate/[page]` | GET | ○ | Get page annotations |
| `/api/annotate/create` | POST | ○ | Create annotation |
| `/api/moderate/queue` | GET | ✓ mod | Pending submissions |
| `/api/moderate/review` | POST | ✓ mod | Approve/reject |

**Legend**: ✓ = required, ○ = optional (anonymous allowed), ✓ mod = moderator role

## Configuration

### wrangler.toml

```toml
name = "irregularpedia"
compatibility_date = "2024-01-01"

[[d1_databases]]
binding = "DB"
database_name = "irregularpedia-db"
database_id = "your-d1-id"

[[kv_namespaces]]
binding = "SESSIONS"
id = "your-kv-id"

[vars]
AUTHENTIK_URL = "https://sso.irregularchat.com"
AUTHENTIK_CLIENT_ID = "irregularpedia"
SIGNAL_BOT_URL = "http://your-signal-bot:8080"

# Secrets (set via wrangler secret put):
# - AUTHENTIK_CLIENT_SECRET
# - SIGNAL_BOT_TOKEN
# - FORGEJO_API_TOKEN
# - SIGNAL_MODERATOR_GROUP_ID
```

### Environment Variables

| Variable | Description |
|----------|-------------|
| `AUTHENTIK_URL` | `https://sso.irregularchat.com` |
| `AUTHENTIK_CLIENT_ID` | OAuth client ID |
| `AUTHENTIK_CLIENT_SECRET` | OAuth client secret (secret) |
| `SIGNAL_BOT_URL` | Signal bot API URL |
| `SIGNAL_BOT_TOKEN` | Signal bot auth token (secret) |
| `SIGNAL_MODERATOR_GROUP_ID` | Signal group for mod alerts |
| `FORGEJO_API_TOKEN` | Forgejo API token for PRs (secret) |

## Implementation Phases

### Phase 1: Foundation
- [ ] Set up Cloudflare D1 database with schemas
- [ ] Set up KV namespace for sessions
- [ ] Create Authentik OAuth application
- [ ] Implement auth endpoints (login, callback, logout, me)

### Phase 2: Page Editor
- [ ] Build markdown editor UI component
- [ ] Implement edit submission API
- [ ] Integrate Forgejo PR creation
- [ ] Add Signal bot notifications

### Phase 3: Annotations
- [ ] Build text selection and anchoring logic
- [ ] Create annotation UI overlay
- [ ] Implement annotation CRUD API
- [ ] Add threading and voting

### Phase 4: Personalization
- [ ] Implement bookmarks API and UI
- [ ] Add reading history tracking
- [ ] Build "My Library" page
- [ ] User preferences

### Phase 5: Moderation
- [ ] Build moderation queue UI
- [ ] Implement review workflow
- [ ] Direct merge capability
- [ ] Moderation analytics

## Success Criteria

1. **Contribution rate**: 10+ community edits per month
2. **Engagement**: 50+ annotations across wiki
3. **User adoption**: 100+ users with bookmarks
4. **Moderation efficiency**: <24h review time for submissions
