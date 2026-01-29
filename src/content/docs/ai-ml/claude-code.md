---
title: "Claude Code"
description: "Comprehensive guide to Claude Code CLI - pricing, plugins, billing considerations, and workflow tips for military and government users"
tags: ["ai", "coding", "claude", "anthropic", "development"]
---

# Claude Code

Claude Code is Anthropic's official command-line interface (CLI) for AI-assisted software development. It provides agentic coding capabilities, allowing Claude to read files, execute commands, and make changes to your codebase directly from the terminal.

:::tip[Quick Navigation]
**Jump to:** [Troubleshooting & Debugging](#troubleshooting--debugging) | [Recommended Tech Stacks](#recommended-tech-stacks) | [Coding Tips](#coding-tips) | [Plugins](#extending-claude-code-with-plugins) | [Project Rules & Lessons Learned](/ai-ml/project-rules-lessons-learned)
:::

## What is Claude Code?

Claude Code is a terminal-based AI coding assistant that can:

- Read and understand your entire codebase
- Execute shell commands and scripts
- Create, edit, and delete files
- Run tests and debug issues
- Manage git operations (commits, PRs, branches)
- Research documentation and APIs
- Work autonomously on multi-step tasks

Unlike the web-based Claude chat interface, Claude Code operates directly in your development environment with full access to your filesystem and terminal.

:::caution[Important for Government Users]
Claude Code operates in your local environment. Ensure you understand your organization's policies regarding AI tools accessing code repositories and executing commands on government systems.
:::

## Pricing Model

Understanding Claude Code's pricing is critical, especially for military units and contractors budgeting for AI tools.

### Individual Plans

| Plan | Price | Includes |
|------|-------|----------|
| **Claude Pro** | $20/month | Access to Claude Code CLI, priority access to models |
| **Claude Max** | $200/month | 5x the usage of Pro, higher rate limits |

### Business/Team Plans

| Plan | Price | Notes |
|------|-------|-------|
| **Claude Team** | $30/user/month | **Minimum 5 seats required** |
| **Claude Enterprise** | Custom pricing | Volume discounts, SSO, admin controls |

:::danger[Contracting Complication]
Business accounts require a **minimum of 5 user seats** (standard accounts). You can then add premium Claude Code accounts on top. This complicates procurement for:
- Small units or teams with fewer than 5 users
- Service members needing individual access through unit contracts
- Contractors with variable team sizes

**Plan accordingly when writing SOWs or purchase requests.**
:::

### Military Procurement Advice

*   **Recurring Payments:** Recurring charges on a Government Purchase Card (GPC) are rare and often flagged.
*   **Contracting vs. Subscriptions:** If you need a recurring service, avoid simple "subscription" terms. Most cases will require a contract with **Wide Area Workflow (WAWF)** or standard invoice submission.
*   **Vendor Flexibility:** When contacting Anthropic sales, request pricing structures that fit government fiscal years (e.g., annual upfront payment) rather than monthly recurring billing. Be prepared to ask them to arrange pricing in a way that fits specific requiring activity needs.

### Claude Code Add-on (Premium)

For teams already on Claude Team/Enterprise:
- Additional premium Claude Code seats can be added per-user
- These provide enhanced usage limits beyond standard accounts
- Contact Anthropic sales for specific pricing

## Claude Code vs API Credits

### Why Claude Code is More Efficient

| Factor | Claude Code (Subscription) | API Credits |
|--------|---------------------------|-------------|
| **Pricing Model** | Fixed monthly fee | Pay-per-token (can spike rapidly) |
| **Context Management** | Automatic summarization | Manual token management |
| **Tool Use** | Built-in file/shell access | Must implement yourself |
| **Cost Predictability** | Predictable monthly cost | Highly variable |
| **Best For** | Ongoing development work | Short sprints, one-off tasks |

### When API Credits Make Sense

- **Short sprints**: Quick, isolated tasks that won't recur
- **Batch processing**: Automated pipelines with controlled input
- **Integration**: Embedding Claude in custom applications
- **One-time projects**: Tasks that don't justify a subscription

:::caution[API Credit Tiers]
Anthropic only allows purchasing API credits in **escalating tiers**. You can't buy small amounts - minimum purchases increase as you scale:
- Tier 1: $5 minimum
- Tier 2: $40 minimum
- Tier 3: $200 minimum
- Higher tiers: Contact sales

This can lead to over-purchasing for small projects.
:::

## Billing Warnings

### Dark Patterns to Watch For

:::danger[Seamless Charging]
Claude Code may **charge your card on file without a checkout page**. Users expecting a confirmation screen may be surprised when charges appear directly.

**Recommendations:**
- Use a dedicated payment method with spending limits
- Monitor your Anthropic account billing page regularly
- Set up billing alerts if available
- Review charges immediately after enabling new features
:::

### Budget Management Tips

1. **Use a prepaid card or virtual card** with a fixed limit
2. **Check billing weekly** at console.anthropic.com
3. **Set calendar reminders** for renewal dates
4. **Document all charges** for unit expense reports

## Customer Support Reality

:::caution[Support Response Times]
Reaching a human at Anthropic is **very challenging**. Our community experience:

- **Initial response**: ~1 month of constant emailing
- **Subsequent emails**: Somewhat faster, but still days to weeks
- **No phone support**: Email only
- **Limited business hours coverage**

**Plan for self-service troubleshooting.** Community resources and documentation are often faster than support tickets.
:::

### Support Tips

- Use the [Anthropic Status Page](https://status.anthropic.com/) first
- Search the [Anthropic Docs](https://docs.anthropic.com/) thoroughly
- Include detailed logs and reproduction steps in tickets
- Be persistent but professional in follow-ups

## Extending Claude Code with Plugins

Claude Code supports a plugin ecosystem for extending its capabilities. These can significantly improve productivity for specific workflows.

### Plugin Marketplaces

| Marketplace | Installation | Description |
|-------------|--------------|-------------|
| **claude-plugins-official** | Pre-installed | Official Anthropic plugins |
| **superpowers-marketplace** | `/plugin marketplace add obra/superpowers-marketplace` | Agentic workflows, TDD, systematic development |
| **voltagent-subagents** | Manual clone | 126+ specialized subagents |
| **oh-my-claudecode** | Manual clone | Multi-agent orchestration |
| **ccplugins-awesome** | Manual clone | 100+ community plugins |

### Recommended Plugins

#### For Documentation/Wiki Work

| Plugin | Source | Use Case |
|--------|--------|----------|
| documentation-engineer | voltagent | Content organization, search optimization |
| technical-writer | voltagent | Clear documentation, tutorials |
| content-marketer | voltagent | SEO, content strategy |
| changelog-generator | ccplugins | Auto-generate changelogs |

#### For Development

| Plugin | Source | Use Case |
|--------|--------|----------|
| superpowers | superpowers-marketplace | TDD workflow, systematic development |
| code-reviewer | voltagent | Code quality review |
| debugger | voltagent | Issue diagnosis |
| git-workflow-manager | voltagent | Branch/PR management |

#### For Research

| Plugin | Source | Use Case |
|--------|--------|----------|
| explore | ccplugins | Codebase exploration |
| analyze-codebase | ccplugins | Project structure analysis |
| technical-researcher | built-in | Technology evaluation |

### Installing Plugins

```bash
# Add a marketplace
/plugin marketplace add obra/superpowers-marketplace

# Install a plugin
/plugin install explanatory-output-style@claude-plugins-official

# Update plugins
/plugin update superpowers
```

### Context Management with Plugins

:::tip[Monitor Context Usage]
Plugins and MCP servers can consume significant context tokens. To assess impact:

1. **Check active plugins**: Review which hooks run at session start
2. **Identify token-heavy components**: SessionStart hooks add to every session
3. **Disable unused plugins**: Temporarily disable non-essential plugins
4. **Use lightweight models**: Switch to `haiku` for simple tasks
:::

## Troubleshooting & Debugging

When you encounter issues with Claude Code or your project, follow this systematic approach:

### Step 1: Research Online & Use Context7

The [Context7 MCP](https://context7.com/docs/clients/claude-code) fetches up-to-date, version-specific documentation directly into your prompts.

**Install Context7:**
```bash
claude mcp add context7 -- npx -y @upstash/context7-mcp
```

**Usage:**
```
# Add "use context7" to fetch current docs
"use context7 to show me how to configure Vite for Cloudflare Workers"

# Or be specific with a library ID
"use context7 for React Router 7 middleware setup"
```

The `context7-docs-fetcher` plugin (ccplugins) automatically detects when you need library documentation and fetches it.

### Step 2: Use Debugging Subagents

If research doesn't resolve the issue, leverage specialized debugging agents:

| Agent | Source | Specialization |
|-------|--------|----------------|
| **debugger** | voltagent | Root cause analysis, systematic problem-solving |
| **debug-session** | ccplugins | Interactive debugging workflows |
| **error-detective** | ccplugins | Error pattern detection |
| **systematic-debugging** | superpowers | Structured debugging methodology |

**Debugging Agent Capabilities:**
- Stack trace interpretation and log analysis
- Memory leak and race condition detection
- Performance profiling and bottleneck identification
- Minimal reproduction case creation
- Cross-platform debugging (OS, architecture, library versions)

### Step 3: Escalation Path

1. **Search** → Web search, Context7 docs
2. **Analyze** → Use debugger/error-detective agents
3. **Isolate** → Create minimal reproduction
4. **Community** → [Claude Code GitHub Issues](https://github.com/anthropics/claude-code/issues)
5. **Support** → Anthropic support (expect delays)

## Recommended Tech Stacks

These are battle-tested tech stacks that work well with Claude Code for modern full-stack development.

### Edge-First Stack (Recommended)

For projects deploying to Cloudflare Workers or similar edge platforms:

| Layer | Technology | Notes |
|-------|------------|-------|
| **Runtime** | [Cloudflare Workers](https://workers.cloudflare.com/) | Edge compute, global distribution |
| **Framework** | [React Router 7](https://reactrouter.com/) (formerly Remix) | Full-stack React framework |
| **Database** | [Cloudflare D1](https://developers.cloudflare.com/d1/) | Serverless SQLite at the edge |
| **Storage** | [Cloudflare R2](https://developers.cloudflare.com/r2/) | S3-compatible object storage, zero egress fees |
| **AI** | [Workers AI](https://developers.cloudflare.com/workers-ai/) | Edge AI inference |
| **Containers** | [Cloudflare Containers](https://developers.cloudflare.com/containers/) | Run Docker containers at edge |
| **KV** | [Workers KV](https://developers.cloudflare.com/kv/) | Global key-value storage |
| **Components** | [Storybook](https://storybook.js.org/) | Component development & testing |
| **Monorepo** | [Turborepo](https://turbo.build/) | Fast, incremental builds |
| **E2E Testing** | [Playwright](https://playwright.dev/) | Cross-browser testing |
| **Package Manager** | [pnpm](https://pnpm.io/) | Fast, disk-efficient |

**Why Cloudflare Services:**
- **D1**: SQLite at the edge with automatic replication, perfect for read-heavy workloads
- **R2**: Zero egress fees (unlike S3), S3-compatible API
- **Workers AI**: Run inference without managing GPU infrastructure
- **Containers**: Full Docker support when Workers aren't enough

**Why this stack:**
- React Router 7 has [first-class Cloudflare Workers support](https://developers.cloudflare.com/workers/framework-guides/web-apps/react-router/)
- Turborepo + pnpm enables efficient monorepo management
- Storybook 8+ is fully compatible with pnpm
- Playwright supports [portable stories from Storybook](https://storybook.js.org/docs/api/portable-stories/portable-stories-playwright) for component testing

**Starter Templates:**
- [turborepo-react-router-v7-starter](https://github.com/thedammyking/turborepo-react-router-v7-starter) - Turborepo + RR7 + TypeScript
- [cloudflare-turbo-stack](https://github.com/imkeanserna/cloudflare-turbo-stack) - Full SaaS starter with auth

### Alternatives to Cloudflare

While Cloudflare's edge stack is powerful, here are alternatives if you need different capabilities:

| Cloudflare Service | Alternative | When to Consider |
|--------------------|-------------|------------------|
| **Workers** | [Vercel Edge Functions](https://vercel.com/docs/functions/edge-functions), [Deno Deploy](https://deno.com/deploy), [Fastly Compute](https://www.fastly.com/products/edge-compute) | Different edge locations, existing vendor relationship |
| **D1** | [PlanetScale](https://planetscale.com/), [Turso](https://turso.tech/), [Neon](https://neon.tech/) | Need MySQL compatibility, more complex queries |
| **R2** | [AWS S3](https://aws.amazon.com/s3/), [Backblaze B2](https://www.backblaze.com/cloud-storage), [MinIO](https://min.io/) | Existing AWS ecosystem, self-hosted needs |
| **Workers AI** | [Replicate](https://replicate.com/), [Together AI](https://together.ai/), [Ollama](https://ollama.com/) (self-hosted) | Different models, self-hosting requirements |
| **KV** | [Upstash Redis](https://upstash.com/), [Redis Cloud](https://redis.io/cloud/) | Need Redis features, pub/sub |
| **Containers** | [Fly.io](https://fly.io/), [Railway](https://railway.app/), [Render](https://render.com/) | More container features, persistent storage |

:::tip[Hybrid Approach]
Many production systems combine services. Example: Cloudflare Workers + PlanetScale database + R2 storage + self-hosted Ollama for sensitive AI workloads.
:::

### Traditional Full-Stack

For projects requiring more traditional server infrastructure:

| Layer | Technology | Notes |
|-------|------------|-------|
| **Backend** | Node.js / Python / Go | Choose based on team expertise |
| **Frontend** | React / Vue / Svelte | Component-based UI |
| **Database** | PostgreSQL / SQLite | Reliable, well-documented |
| **ORM** | Prisma / Drizzle | Type-safe database access |
| **Testing** | Vitest + Playwright | Unit + E2E coverage |

### Testing Best Practices

Modern frontend testing combines multiple approaches:

| Test Type | Tool | Purpose |
|-----------|------|---------|
| Unit | Vitest | Fast, isolated logic tests |
| Component | Storybook | Visual + interaction testing |
| Integration | Testing Library | User-centric DOM testing |
| E2E | Playwright | Full browser automation |
| Visual | Storybook snapshots | Regression detection |

**Playwright Tips:**
- Use semantic selectors (`getByRole`, `getByLabel`) over CSS selectors
- Isolate tests with fresh browser contexts
- [Mock APIs with MSW](https://mswjs.io/) for deterministic tests

## Coding Tips

### Before Implementing Features

1. **Research first** - Use `context7` to fetch current documentation
2. **Check available plugins** - A plugin may already solve your problem
3. **Match task to capability** - Use specialized agents for specific domains
4. **Start simple** - Use built-in tools before adding plugins

### Effective Prompting

```
# Bad: Vague request
"Fix the bug"

# Good: Specific with context
"The login form throws 'undefined is not a function' on submit.
Check src/components/LoginForm.tsx - use context7 for React Hook Form docs"
```

### Session Management

- Keep context focused on the current task
- Use `/clear` to reset when switching contexts
- Consider separate sessions for unrelated projects
- Ask Claude to assess context usage: *"Are any plugins or MCP servers eating up my context?"*

### Debugging Workflow

1. **Describe the symptom** clearly with error messages
2. **Ask for research**: *"use context7 to check [library] docs for this error"*
3. **Request agent help**: *"use the debugger agent to analyze this stack trace"*
4. **Iterate systematically** - don't jump to solutions without diagnosis

### Cost Optimization

- Use `haiku` model for quick tasks (lower cost)
- Batch related changes in single sessions
- Avoid unnecessary file reads/writes
- Disable unused plugins to reduce context overhead

## Related Resources

- [Cloudflare Workers Guide](/development/cloudflare-workers-guide) - Complete beginner's guide to edge computing
- [Project Rules & Lessons Learned](/ai-ml/project-rules-lessons-learned) - CLAUDE.md patterns, common bugs, and fixes by stack type
- [Full-Stack Development with AI](/development/full-stack-development-with-ai) - AI-powered development workflows
- [AI Prompting Guide](/ai-ml/ai-prompting) - Effective prompt engineering
- [OpenHands Guide](/ai-ml/openhands) - Alternative agentic coding tool
- [Software Engineering](/development/software-engineering) - Development resources hub

## External Links

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Anthropic Console](https://console.anthropic.com/) - Billing and API management
- [Anthropic Status](https://status.anthropic.com/) - Service status
- [Claude Code GitHub Issues](https://github.com/anthropics/claude-code/issues) - Bug reports and feature requests
