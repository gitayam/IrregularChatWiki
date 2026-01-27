---
title: "Cloudflare Workers: A Complete Beginner's Guide"
description: "Learn Cloudflare Workers from scratch - manual setup for learning, then AI-assisted development and Git integration for productivity"
tags: ["cloudflare", "workers", "serverless", "beginner", "tutorial"]
lastUpdated: 2025-01-27
---

This guide takes you from zero to deploying your first Cloudflare Worker. We'll start with manual setup so you understand what's happening, then show you how AI coding assistants can speed up your workflow.

**Quick Navigation:**
- [What Are Cloudflare Workers?](#what-are-cloudflare-workers)
- [Manual Setup (Learn the Basics)](#manual-setup-the-learning-path)
- [Your First Worker](#your-first-worker)
- [Adding Databases & Storage](#level-up-adding-databases--storage)
- [AI-Assisted Development](#ai-assisted-development)
- [Git Integration & CI/CD](#git-integration--automatic-deployments)
- [Common Mistakes](#common-mistakes--how-to-fix-them)

---

## What Are Cloudflare Workers?

Imagine you built a website and someone in Tokyo visits it. If your server is in New York, their request has to travel across the Pacific Ocean, get processed, and travel back. That's slow.

**Cloudflare Workers run your code in 300+ cities worldwide.** When someone visits your site, the nearest server handles their request. Tokyo user? Tokyo server. London user? London server.

```
Traditional Server:
User (Tokyo) → → → → → Server (New York) → → → → → User (Tokyo)
                    [500ms round trip]

Cloudflare Worker:
User (Tokyo) → Server (Tokyo) → User (Tokyo)
              [50ms round trip]
```

### Why Should You Care?

| Benefit | What It Means |
|---------|---------------|
| **Free tier** | 100,000 requests/day free - enough for learning and small projects |
| **No server management** | No Linux commands, no updates, no security patches |
| **Instant deployment** | Code goes live in seconds, not minutes |
| **Scales automatically** | 1 user or 1 million users - same code, same price |
| **Great for portfolios** | Impress recruiters with deployed projects, not localhost demos |

### What Can You Build?

- **APIs** - Backend for your mobile app or website
- **Redirects** - Short URLs like bit.ly
- **Authentication** - Login systems
- **Chatbots** - Discord/Slack bots
- **Scrapers** - Fetch data from other websites
- **Full websites** - With Cloudflare Pages

---

## Prerequisites

Before we start, you need:

### 1. A Cloudflare Account (Free)

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Click "Sign Up"
3. Use your email (school email works fine)
4. Verify your email

### 2. Node.js Installed

Node.js lets you run JavaScript on your computer (not just in browsers).

**Check if you have it:**
```bash
node --version
```

If you see a version number (like `v20.10.0`), you're good. If not:

- **Windows**: Download from [nodejs.org](https://nodejs.org/) (LTS version)
- **Mac**: `brew install node` (if you have Homebrew) or download from nodejs.org
- **Linux**: `sudo apt install nodejs npm` (Ubuntu/Debian)

### 3. A Code Editor

Any text editor works, but we recommend:

- **[VS Code](https://code.visualstudio.com/)** - Free, popular, great extensions
- **[Cursor](https://cursor.sh/)** - VS Code fork with built-in AI
- **[Claude Code](/ai-ml/claude-code)** - Terminal-based AI coding assistant (works alongside any editor)

### 4. Basic Terminal Knowledge

You'll type commands in:
- **Windows**: PowerShell or Command Prompt
- **Mac**: Terminal
- **Linux**: Terminal

Don't worry - we'll show you exactly what to type.

---

## Manual Setup (The Learning Path)

Let's set everything up step by step. This might seem like extra work, but understanding these steps makes debugging easier later.

### Step 1: Install Wrangler

**Wrangler** is Cloudflare's command-line tool. It's how you create, test, and deploy Workers.

```bash
npm install -g wrangler
```

:::note[What does this do?]
- `npm` = Node Package Manager (installs JavaScript tools)
- `install` = download and set up
- `-g` = "global" - install so you can use it anywhere, not just one project
- `wrangler` = the tool we're installing
:::

**Verify it worked:**
```bash
wrangler --version
```

You should see something like `3.x.x`.

### Step 2: Log In to Cloudflare

```bash
wrangler login
```

This opens your browser. Click "Allow" to give Wrangler permission to deploy code to your account.

### Step 3: Create Your Project Folder

```bash
mkdir my-first-worker
cd my-first-worker
```

:::note[What does this do?]
- `mkdir` = "make directory" (create a folder)
- `cd` = "change directory" (go into that folder)
:::

### Step 4: Initialize the Project

```bash
npm init -y
```

This creates a `package.json` file that tracks your project's dependencies.

### Step 5: Create the Wrangler Config

Create a file called `wrangler.toml` (this tells Wrangler about your project):

```toml
name = "my-first-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

[observability]
enabled = true
```

:::note[What do these mean?]
- `name` = Your Worker's name (shows up in Cloudflare dashboard)
- `main` = Where your code lives
- `compatibility_date` = Which version of Workers features to use
- `observability` = Enables logging so you can debug
:::

### Step 6: Create Your Code Folder

```bash
mkdir src
```

Now your project structure looks like:
```
my-first-worker/
├── package.json
├── wrangler.toml
└── src/
    └── (your code goes here)
```

---

## Your First Worker

### The Code

Create `src/index.js`:

```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello from my first Cloudflare Worker! 🎉");
  },
};
```

**Let's break this down:**

```javascript
export default {
  // This makes your code available to Cloudflare
```

```javascript
  async fetch(request, env, ctx) {
    // "fetch" runs every time someone visits your Worker
    // "request" = info about the visitor (URL, headers, etc.)
    // "env" = your environment variables and databases
    // "ctx" = advanced stuff (ignore for now)
```

```javascript
    return new Response("Hello from my first Cloudflare Worker! 🎉");
    // Send text back to the visitor
  },
};
```

### Test Locally

Before deploying, test on your computer:

```bash
wrangler dev
```

You'll see:
```
⎔ Starting local server...
Ready on http://localhost:8787
```

Open `http://localhost:8787` in your browser. You should see your message!

Press `Ctrl+C` to stop the local server.

### Deploy to the World

```bash
wrangler deploy
```

You'll see something like:
```
Uploaded my-first-worker (1.23 sec)
Published my-first-worker (0.45 sec)
  https://my-first-worker.YOUR-SUBDOMAIN.workers.dev
```

**That URL is live!** Share it with friends. It works from anywhere in the world.

---

## Making It Interactive

Let's make a more useful Worker that responds differently based on the URL.

### A Simple API

Replace your `src/index.js`:

```javascript
export default {
  async fetch(request, env, ctx) {
    // Get the URL path (e.g., "/hello" from "https://example.com/hello")
    const url = new URL(request.url);
    const path = url.pathname;

    // Route to different responses
    if (path === "/") {
      return new Response("Welcome to my API! Try /hello or /time");
    }

    if (path === "/hello") {
      // Get the name from ?name=YourName
      const name = url.searchParams.get("name") || "stranger";
      return new Response(`Hello, ${name}! 👋`);
    }

    if (path === "/time") {
      const now = new Date().toISOString();
      return Response.json({ currentTime: now });
    }

    // 404 for unknown paths
    return new Response("Not found", { status: 404 });
  },
};
```

**Test it:**
```bash
wrangler dev
```

Then visit:
- `http://localhost:8787/` - Welcome message
- `http://localhost:8787/hello` - "Hello, stranger!"
- `http://localhost:8787/hello?name=Alex` - "Hello, Alex!"
- `http://localhost:8787/time` - Current time as JSON

### Understanding the Code

```javascript
const url = new URL(request.url);
// Parses "https://example.com/hello?name=Alex" into parts

const path = url.pathname;
// Gets "/hello"

const name = url.searchParams.get("name");
// Gets "Alex" from "?name=Alex"

return Response.json({ currentTime: now });
// Returns JSON instead of plain text
// Automatically sets Content-Type: application/json
```

---

## Level Up: Adding Databases & Storage

Cloudflare offers several storage options. Here's when to use each:

| Service | Use Case | Example |
|---------|----------|---------|
| **KV** | Simple key-value data | User sessions, feature flags |
| **D1** | Relational data (SQL) | User accounts, blog posts |
| **R2** | Files and images | Profile pictures, uploads |

### Adding KV (Key-Value Storage)

KV is like a giant dictionary: you store values by keys.

**1. Create a KV namespace:**
```bash
wrangler kv namespace create "MY_KV"
```

You'll see:
```
🌀 Creating namespace with title "my-first-worker-MY_KV"
✨ Success! Add the following to your wrangler.toml:
[[kv_namespaces]]
binding = "MY_KV"
id = "abc123..."
```

**2. Add it to `wrangler.toml`:**
```toml
name = "my-first-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

[[kv_namespaces]]
binding = "MY_KV"
id = "abc123..."  # Use YOUR actual ID from the command output
```

**3. Use it in your code:**
```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/visit") {
      // Get current count (or 0 if not set)
      const count = parseInt(await env.MY_KV.get("visits") || "0");

      // Increment and save
      const newCount = count + 1;
      await env.MY_KV.put("visits", newCount.toString());

      return new Response(`You are visitor #${newCount}!`);
    }

    return new Response("Visit /visit to be counted!");
  },
};
```

**4. Test locally:**
```bash
wrangler dev
```

Visit `/visit` multiple times - the count increases!

### Adding D1 (SQL Database)

D1 is SQLite at the edge - perfect for structured data.

**1. Create a database:**
```bash
wrangler d1 create my-database
```

**2. Add to `wrangler.toml`:**
```toml
[[d1_databases]]
binding = "DB"
database_name = "my-database"
database_id = "your-database-id"  # From command output
```

**3. Create a table (migration file):**

Create `migrations/0001_create_users.sql`:
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

**4. Run the migration:**
```bash
# Locally (for testing)
wrangler d1 execute my-database --local --file=migrations/0001_create_users.sql

# Production
wrangler d1 execute my-database --remote --file=migrations/0001_create_users.sql
```

**5. Use in your code:**
```javascript
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname === "/users" && request.method === "GET") {
      // Get all users
      const { results } = await env.DB.prepare(
        "SELECT * FROM users ORDER BY created_at DESC"
      ).all();

      return Response.json(results);
    }

    if (url.pathname === "/users" && request.method === "POST") {
      // Add a user
      const body = await request.json();

      await env.DB.prepare(
        "INSERT INTO users (name, email) VALUES (?, ?)"
      ).bind(body.name, body.email).run();

      return new Response("User created!", { status: 201 });
    }

    return new Response("Try GET or POST /users");
  },
};
```

**Test with curl:**
```bash
# Add a user
curl -X POST http://localhost:8787/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Alex", "email": "alex@example.com"}'

# List users
curl http://localhost:8787/users
```

---

## AI-Assisted Development

Once you understand the basics, AI coding assistants can dramatically speed up your workflow.

### Using Claude Code

[Claude Code](/ai-ml/claude-code) is Anthropic's CLI for AI-assisted development.

**Setup:**
```bash
# Install (requires Claude Pro/Max subscription)
npm install -g @anthropic-ai/claude-code

# Start in your project
cd my-first-worker
claude
```

**Example prompts for Workers:**

```
Create a Cloudflare Worker that:
- Has a /shorten endpoint to create short URLs
- Stores them in KV
- Redirects /go/:code to the original URL
- Returns JSON errors with proper status codes
```

```
Add a D1 database to store click analytics:
- Track timestamp, IP country, and user agent
- Add a /stats/:code endpoint to view analytics
```

```
Set up wrangler.toml for this project with:
- KV namespace for URLs
- D1 database for analytics
- Environment variables for admin auth
```

### Using Cursor

[Cursor](https://cursor.sh/) is VS Code with built-in AI.

**Workflow:**
1. Open your project in Cursor
2. Press `Cmd+K` (Mac) or `Ctrl+K` (Windows) to open the AI prompt
3. Describe what you want

**Example:**
```
Create a REST API for a todo list with:
- GET /todos - list all
- POST /todos - create one
- DELETE /todos/:id - delete one
Use D1 for storage. Include proper error handling.
```

Cursor generates the code inline. Review it, then accept or modify.

### Using GitHub Copilot

If you use VS Code with [GitHub Copilot](https://github.com/features/copilot):

1. Start typing a comment describing what you want
2. Copilot suggests code
3. Press `Tab` to accept

```javascript
// Create a function that validates email addresses
// and returns true/false
```

Copilot will suggest the implementation.

### Effective Prompts for Workers

**Be specific about Cloudflare APIs:**

```
# Good
"Use Cloudflare KV to cache API responses for 1 hour"

# Vague
"Add caching"
```

**Mention the environment:**

```
# Good
"This runs on Cloudflare Workers - use the fetch handler pattern
and access KV through env.MY_KV"

# Missing context
"Store data in a key-value store"
```

**Ask for error handling:**

```
"Add try-catch blocks that return proper JSON errors
with status codes (400 for bad input, 500 for server errors)"
```

---

## Git Integration & Automatic Deployments

Manual `wrangler deploy` works, but real projects use Git for automatic deployments.

### Option 1: GitHub Actions (Recommended)

Every time you push code to GitHub, it automatically deploys.

**1. Create a Cloudflare API token:**

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Profile → API Tokens
2. Click "Create Token"
3. Use the "Edit Cloudflare Workers" template
4. Copy the token (you'll only see it once!)

**2. Add secrets to GitHub:**

1. Go to your repo → Settings → Secrets and variables → Actions
2. Add these secrets:
   - `CLOUDFLARE_API_TOKEN` = your token
   - `CLOUDFLARE_ACCOUNT_ID` = from your Cloudflare dashboard URL

**3. Create `.github/workflows/deploy.yml`:**

```yaml
name: Deploy Worker

on:
  push:
    branches:
      - main  # Deploy when you push to main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout code
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Install dependencies
        run: npm install

      - name: Deploy to Cloudflare
        uses: cloudflare/wrangler-action@v3
        with:
          apiToken: ${{ secrets.CLOUDFLARE_API_TOKEN }}
          accountId: ${{ secrets.CLOUDFLARE_ACCOUNT_ID }}
```

**4. Push and watch it deploy:**

```bash
git add .
git commit -m "Add GitHub Actions deployment"
git push origin main
```

Go to your repo → Actions tab to watch the deployment.

### Option 2: Cloudflare Pages (For Full Websites)

If you're building a website with a Worker backend, use Cloudflare Pages:

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com) → Workers & Pages
2. Click "Create" → "Pages" → "Connect to Git"
3. Select your GitHub repo
4. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Click "Save and Deploy"

**For Workers functions with Pages:**

Put your Worker code in a `functions/` folder:
```
my-project/
├── src/           # Frontend code
├── functions/     # Worker code (automatic!)
│   └── api/
│       └── hello.js
├── package.json
└── wrangler.toml
```

`functions/api/hello.js`:
```javascript
export async function onRequest(context) {
  return new Response("Hello from Pages Function!");
}
```

This automatically creates an API at `/api/hello`.

### Option 3: Direct Git Integration

Cloudflare can deploy directly from your repo without GitHub Actions:

1. Workers & Pages → Create → Workers
2. Click "Connect to Git"
3. Authorize Cloudflare to access your GitHub
4. Select your repo and branch

Cloudflare handles the rest - pushes trigger deployments automatically.

---

## Environment Variables & Secrets

Never put passwords or API keys in your code!

### Setting Variables

**For local development**, create `.dev.vars`:
```
API_KEY=your-secret-key
DATABASE_URL=postgres://localhost/mydb
```

:::danger[Don't commit secrets!]
Add `.dev.vars` to your `.gitignore`:
```
.dev.vars
```
:::

**For production**, use the dashboard or CLI:

```bash
# Set a secret (hidden in logs)
wrangler secret put API_KEY
# Then type or paste the value

# Set a plain variable (in wrangler.toml)
```

In `wrangler.toml`:
```toml
[vars]
ENVIRONMENT = "production"
MAX_ITEMS = "100"
```

### Using Variables in Code

```javascript
export default {
  async fetch(request, env, ctx) {
    // Access secrets and variables through 'env'
    const apiKey = env.API_KEY;
    const maxItems = parseInt(env.MAX_ITEMS);

    if (!apiKey) {
      return new Response("API key not configured", { status: 500 });
    }

    // Use the variables...
  },
};
```

---

## Common Mistakes & How to Fix Them

### Mistake 1: "Error: No account id found"

**Problem:** Wrangler doesn't know your Cloudflare account.

**Fix:**
```bash
wrangler login
# Or add to wrangler.toml:
account_id = "your-account-id"
```

### Mistake 2: "ReferenceError: require is not defined"

**Problem:** Workers use ES modules, not CommonJS.

**Wrong:**
```javascript
const axios = require('axios');  // ❌
```

**Right:**
```javascript
import axios from 'axios';  // ✅ (but see below)
```

**Better:** Use the built-in `fetch` instead of axios:
```javascript
const response = await fetch('https://api.example.com/data');
const data = await response.json();
```

### Mistake 3: KV/D1 Returns `null` or `undefined`

**Problem:** You're testing locally but didn't create local storage.

**Fix for KV:**
```bash
wrangler kv namespace create "MY_KV" --preview
# Add the preview_id to wrangler.toml
```

**Fix for D1:**
```bash
# Run migrations locally first
wrangler d1 execute my-database --local --file=migrations/0001_init.sql
```

### Mistake 4: "Error 10021: Script too large"

**Problem:** Your Worker exceeds the 1MB limit (compressed).

**Fixes:**
- Remove unused dependencies
- Use dynamic imports for large libraries
- Consider splitting into multiple Workers
- Upgrade to Workers Paid ($5/month) for 10MB limit

### Mistake 5: CORS Errors in Browser

**Problem:** Your frontend can't call your Worker API.

**Fix:** Add CORS headers:

```javascript
function corsHeaders() {
  return {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
  };
}

export default {
  async fetch(request, env, ctx) {
    // Handle preflight requests
    if (request.method === "OPTIONS") {
      return new Response(null, { headers: corsHeaders() });
    }

    // Your normal response with CORS headers
    return new Response("Hello", {
      headers: corsHeaders(),
    });
  },
};
```

### Mistake 6: "Error: D1_ERROR: no such table"

**Problem:** Migrations weren't run on production.

**Fix:**
```bash
# Run on production (note: --remote not --local)
wrangler d1 execute my-database --remote --file=migrations/0001_init.sql
```

---

## Project Ideas for Beginners

Build these to practice and add to your portfolio:

### 1. Link Shortener (Beginner)
- Store short codes in KV
- Redirect to original URLs
- Track click counts

### 2. Joke API (Beginner)
- Return random jokes from a list
- Add categories (/joke/programming, /joke/dad)
- Let users submit jokes

### 3. Webhook Relay (Intermediate)
- Receive webhooks from services (GitHub, Stripe)
- Log them to D1
- Forward to Discord/Slack

### 4. Image Resizer (Intermediate)
- Accept image uploads to R2
- Resize on request using Workers
- Cache results in KV

### 5. Full CRUD API (Intermediate)
- Users, posts, comments
- Authentication with JWTs
- Rate limiting

---

## Quick Reference

### Essential Commands

```bash
# Create new project
wrangler init my-project

# Run locally
wrangler dev

# Deploy to production
wrangler deploy

# View logs
wrangler tail

# Create KV namespace
wrangler kv namespace create "NAME"

# Create D1 database
wrangler d1 create my-db

# Run D1 migration
wrangler d1 execute my-db --remote --file=migrations/001.sql

# Set secret
wrangler secret put SECRET_NAME
```

### Project Structure

```
my-worker/
├── src/
│   └── index.js          # Main Worker code
├── migrations/           # D1 database migrations
│   └── 0001_init.sql
├── wrangler.toml         # Cloudflare config
├── package.json          # Node.js dependencies
├── .dev.vars             # Local secrets (don't commit!)
└── .gitignore            # Ignore node_modules, .dev.vars
```

### Minimal `wrangler.toml`

```toml
name = "my-worker"
main = "src/index.js"
compatibility_date = "2024-01-01"

[observability]
enabled = true
```

### Minimal Worker

```javascript
export default {
  async fetch(request, env, ctx) {
    return new Response("Hello World!");
  },
};
```

---

## Next Steps

1. **Read the official docs**: [developers.cloudflare.com/workers](https://developers.cloudflare.com/workers/)
2. **Join the community**: [Cloudflare Discord](https://discord.cloudflare.com/)
3. **Explore examples**: [github.com/cloudflare/workers-sdk/tree/main/templates](https://github.com/cloudflare/workers-sdk/tree/main/templates)
4. **Learn TypeScript**: Makes Workers development much smoother

---

## Related Resources

- [Project Rules & Lessons Learned](/ai-ml/project-rules-lessons-learned) - Common bugs and fixes
- [Claude Code Guide](/ai-ml/claude-code) - AI-assisted development
- [Software Engineering](/development/software-engineering) - Development resources

---

*Questions? Found an error? [Open an issue](https://github.com/anthropics/claude-code/issues) or contribute to this guide.*
