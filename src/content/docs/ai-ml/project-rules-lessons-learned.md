---
title: Project Rules & Lessons Learned
description: Comprehensive collection of CLAUDE.md patterns, GEMINI.md rules, and lessons learned organized by stack type - synthesized from real production projects
lastUpdated: 2025-01-27
---

This guide synthesizes project rules and lessons learned from multiple production projects. Use it to establish effective CLAUDE.md/GEMINI.md files for your own projects and avoid common pitfalls.

**Quick Navigation:**
- [Cloudflare Workers / Edge-First](#cloudflare-workers--edge-first)
- [React / Frontend Apps](#react--frontend-apps)
- [Signal / Messaging Bots](#signal--messaging-bots)
- [Python / Full-Stack Apps](#python--full-stack-apps)
- [Cross-Cutting Concerns](#cross-cutting-concerns)

---

## Cloudflare Workers / Edge-First

### Key Stack Components

| Service | Purpose | Alternative |
|---------|---------|-------------|
| **Workers** | Edge compute, API routes | Vercel Edge Functions, Deno Deploy |
| **D1** | SQLite database | PlanetScale, Turso, Neon |
| **R2** | Object storage | AWS S3, Backblaze B2 |
| **KV** | Key-value cache | Redis, Upstash |
| **Workers AI** | ML inference | OpenAI API, Replicate |
| **Pages** | Static hosting + Functions | Vercel, Netlify |

### Critical Deployment Pattern

```bash
# CORRECT: Build first, then deploy dist directory
npm run build
rsync -av --delete functions/ dist/functions/
npx wrangler pages deploy dist --project-name=your-project

# WRONG: Deploying root directory serves development index.html
npx wrangler pages deploy . --project-name=your-project  # CAUSES BLANK PAGE!
```

**Why this fails:** Root `index.html` references `/src/main.tsx` (development). Production needs bundled assets in `/assets/`.

### D1 Database Best Practices

```sql
-- ALWAYS use lowercase tables with snake_case fields
CREATE TABLE events (
  id TEXT PRIMARY KEY,
  start_datetime TEXT NOT NULL,
  max_participants INTEGER DEFAULT 0,
  created_at TEXT DEFAULT CURRENT_TIMESTAMP
);

-- NEVER use PascalCase (causes FK constraint failures)
-- Wrong: CREATE TABLE "Event" (...)
```

**Real Incident (Jan 2026):** Orders from logged-in users silently failed for 3 days because `Order` table had FK referencing empty `User` table instead of populated `users` table. Stripe webhooks returned 200 OK while data was lost.

### Timezone Handling

**Workers run in UTC.** Convert to local timezone for user-facing calculations:

```typescript
function convertToEasternTime(utcDate: Date): { dayOfWeek: number; hour: number } {
  const formatter = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/New_York',
    weekday: 'short',
    hour: 'numeric',
    hour12: false
  });
  // Parse formatted parts to get correct local day/time
}
```

**Bug Example:** Date planner recommended closed venues because it checked Friday's hours instead of Thursday's (UTC vs EST mismatch).

### KV Caching Patterns

```typescript
// Check cache first
const cacheKey = `menu:v${version}:${category}`;
const cached = await env.CACHE.get(cacheKey, 'json');
if (cached) return cached;

// Fetch and cache
const data = await fetchFromD1();
await env.CACHE.put(cacheKey, JSON.stringify(data), {
  expirationTtl: 3600 // 1 hour
});
return data;
```

### Weather API Fallback Chain

When using external APIs, implement fallback chains:

```
1. NWS API (api.weather.gov) - Primary, no rate limits
2. Open-Meteo API - Fallback if NWS fails
3. Seasonal averages - Last resort only
```

**Bug Example:** Open-Meteo hit rate limits (429), system silently used identical fallback data for all 7 days. Weather modifiers showed 1.0 (no adjustment).

---

## React / Frontend Apps

### React Error #185 - Infinite Loop Prevention

**NEVER call parent callbacks from useEffect:**

```typescript
// BROKEN - causes infinite loop
useEffect(() => {
  onScoresChange?.(scores, assessment);  // Triggers parent re-render!
}, [scores]);

// FIXED - call from event handlers only
const handleScoreChange = (criterion: string, value: number) => {
  const newScores = { ...scores, [criterion]: value };
  setScores(newScores);
  onScoresChange?.(newScores, calculateAssessment(newScores));
};
```

### Stable Array References

```typescript
// BROKEN - creates new array every render
<Child historicalData={data.map(d => ({ ...d }))} />

// FIXED - memoize transformations
const stableData = useMemo(() =>
  data.map(d => ({ ...d })),
  [data]
);
<Child historicalData={stableData} />
```

### Double JSON Parsing Bug

Data often gets parsed multiple times between API → storage → retrieval:

```typescript
// BROKEN - safeJSONParse returns {} for objects
const parsedData = safeJSONParse(currentAnalysis.data, {});

// FIXED - check type first
const parsedData = typeof currentAnalysis.data === 'object'
  ? currentAnalysis.data
  : safeJSONParse(currentAnalysis.data, {});
```

### SPA Routing on Cloudflare Pages

Create `/public/_redirects` for client-side routing:

```plaintext
# API routes go to Functions
/api/* 200

# Static assets serve directly
/assets/* 200

# All other routes serve index.html
/* /index.html 200
```

**Without this:** Routes like `/tools`, `/settings` return 404 HTML, browser tries to execute as JavaScript → MIME type error.

### Safari-Specific Issues

**Clipboard API requires synchronous user gesture:**

```typescript
// BROKEN - async gap loses user gesture
const blob = await generateImage();
await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);

// FIXED - pass Promise to ClipboardItem
const clipboardItem = new ClipboardItem({
  'image/png': generateImage().then(blob => blob)
});
await navigator.clipboard.write([clipboardItem]);
```

**Mobile Safari CORS for R2:**
- Even with CORS configured, mobile Safari fails
- Solution: Serve critical images locally from `public/images/`

### Tailwind v4 Gotchas

```css
/* container class is broken in v4 */
/* NEVER: container mx-auto */
/* ALWAYS: w-full max-w-7xl mx-auto */

/* Default border color changed to currentColor */
/* Add explicit: border-gray-200 */
```

---

## Signal / Messaging Bots

### Docker Network DNS Resolution

**Use full container names when connected to multiple networks:**

```env
# WRONG - ambiguous, resolves to wrong postgres
DB_HOST=postgres

# CORRECT - full container name
DB_HOST=signal-bot-postgres
```

**Incident:** Bot appeared to work but wrote data to wrong database (`system-postgres` instead of `signal-bot-postgres`).

### Signal-cli Technical Rules

**Mention positions use UTF-16 code units (JavaScript string indices):**

```typescript
// CORRECT - use string indices
const start = message.indexOf(name);
const length = name.length;

// WRONG - UTF-8 bytes cause position drift
const start = Buffer.byteLength(message.substring(0, index), 'utf8');
```

**Why:** Emojis are 4 bytes UTF-8 but 2 code units UTF-16. Every emoji before a mention shifts position by 2.

### Signal Text Styling

```json
{
  "method": "send",
  "params": {
    "message": "Bold text here",
    "textStyles": ["0:9:BOLD"]  // NOT "textStyle" (singular)!
  }
}
```

### Deployment Safety

```bash
# CATASTROPHIC: rsync --delete to wrong directory deleted:
# - docker-compose.yml
# - Signal account registration (UNRECOVERABLE)
# - .env with credentials

# SAFE: Always use deploy.sh which:
# 1. Syncs to correct subdirectory
# 2. Excludes data/, .env, signal-data/
# 3. Uses --dry-run first
./deploy.sh deploy --no-cache
```

### MinIO Dual Client Pattern

```typescript
// Internal client for API operations
const internalClient = new S3Client({
  endpoint: 'http://minio-internal:9000'
});

// Public client for presigned URLs (signatures must match public endpoint)
const presignClient = new S3Client({
  endpoint: 'https://s3.public.domain'
});
```

---

## Python / Full-Stack Apps

### Security-First Development

```python
# NEVER use eval() on user input
# Use safe parsers like ast.literal_eval() or dedicated libraries

# Whitelist inputs instead of blacklisting
ALLOWED_CHARS = set('0123456789+-*/(). ')
if not all(c in ALLOWED_CHARS for c in user_input):
    raise ValueError("Invalid characters")
```

### Database Session Management

```python
# NEVER share sessions across threads
# Create new session per request

from contextlib import contextmanager

@contextmanager
def get_db_session():
    session = SessionLocal()
    try:
        yield session
        session.commit()
    except:
        session.rollback()
        raise
    finally:
        session.close()
```

### OAuth Redirect Patterns

```python
# Store state in session before redirect
session['oauth_state'] = secrets.token_urlsafe(32)
session['return_url'] = request.referrer

# Verify state on callback
if request.args.get('state') != session.pop('oauth_state', None):
    return abort(403, 'State mismatch')
```

### Environment Drift Prevention

```bash
# Always sync configuration files, not just source code
rsync -avz docker-compose.yml nginx.conf server:/path/

# Verify environment variables post-deployment
ssh server "docker exec container printenv | grep 'CRITICAL_VAR'"

# Fail fast on startup
if not os.environ.get('DATABASE_URL'):
    sys.exit("FATAL: DATABASE_URL not set")
```

---

## Cross-Cutting Concerns

### API Field Naming Conventions

**Frontend sends camelCase, backend expects snake_case:**

```typescript
// Backend should accept both
const eventType = body.event_type || body.eventType;
const sessionId = body.session_id || body.sessionId;
```

**Bug Example:** Analytics tracking silently failed for weeks because frontend sent `deviceId` but backend validated `device_id`. `sendBeacon` is fire-and-forget with no error callback.

### Null Value Handling

```typescript
// WRONG - || treats 0 as falsy
cost: selected.average_cost || stopToSwap.cost

// CORRECT - ?? only catches null/undefined
const duration = selected.typical_duration ?? stopToSwap.duration ?? 60;
```

### Atomic Database Updates

```sql
-- CORRECT: Single atomic query prevents race conditions
UPDATE events
SET current_participants = current_participants + ?
WHERE id = ? AND (current_participants + ?) <= max_participants;

-- Check result.changes === 0 means event is full
```

### Webhook Reliability Pattern

```typescript
// Order of operations matters!
async function handleStripeWebhook(event) {
  // 1. Save to database FIRST
  await saveOrder(event.data);

  // 2. Then send confirmation email
  await sendEmail(event.data);

  // 3. Print label last
  await printLabel(event.data);
}

// NOT: email → print → save (if save fails, no record but email sent)
```

### Pre-Change Safety Protocol

```bash
# 1. Check for uncommitted changes
git status

# 2. If changes exist, commit or stash first
git stash

# 3. Pull latest
git pull origin main

# 4. ALWAYS run --dry-run before rsync
rsync -avz --dry-run source/ dest/
```

### Post-Deployment Verification

```bash
# Verify correct content is served
curl -sL "https://your-site.com" | grep -o '<title>[^<]*</title>'

# Check database migrations applied
npx wrangler d1 execute db --remote \
  --command="SELECT name FROM sqlite_master WHERE type='table';"

# Test critical API endpoints
curl -X POST https://api.example.com/health
```

---

## CLAUDE.md Template

Based on these lessons, here's a recommended CLAUDE.md structure:

```markdown
# Project Name - CLAUDE.md

## Critical Rules (MUST READ)
- Deployment command: `./deploy.sh`
- Database naming: lowercase tables, snake_case fields
- NEVER use [specific anti-pattern]

## Stack
- Runtime: Cloudflare Workers
- Database: D1
- Frontend: React + Vite

## Common Commands
\`\`\`bash
npm run dev        # Local development
./deploy.sh        # Production deploy
\`\`\`

## Lessons Learned
### [Date] - [Issue Title]
**Problem:** Brief description
**Root Cause:** Technical explanation
**Fix:** Code or command that resolved it
**Prevention:** How to avoid in future
```

---

## Related Resources

- [Claude Code Guide](/ai-ml/claude-code) - Setup, pricing, and usage
- [Context7 MCP](/ai-ml/claude-code#troubleshooting--debugging) - Documentation fetching
- [Cloudflare Stack](/ai-ml/claude-code#recommended-tech-stacks) - Edge-first architecture

---

*This guide is synthesized from production projects including Downtown-Guide, Muse & Co, Community-Signal-Moderation-Bot, ResearchToolsPy, and others. Last updated: January 2026.*
