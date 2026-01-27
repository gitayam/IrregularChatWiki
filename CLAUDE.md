# IrregularChat Wiki - Claude Code Configuration

## Project Overview

This is **Irregularpedia** - an Astro Starlight documentation wiki for the IrregularChat community covering cybersecurity, AI/ML, military topics, and technical guides.

- **Live Site:** https://irregularpedia.org
- **Tech Stack:** Astro Starlight + Cloudflare Pages
- **Content:** Markdown/MDX in `src/content/docs/`

---

## Plugin & Context Management Rules

### Example Prompts This Supports

- "Can you assess whether any plugins or MCP servers are eating up all my context?"
- "Implement <FEATURE_X> but first look at the possible claude plugins and perhaps select ones that are best for the job"

### Context Assessment

When asked to assess context usage from plugins or MCP servers:

1. **Check active plugins:** Review `~/.claude/plugins/` and any project-level `.claude/` configs
2. **Identify token-heavy components:**
   - SessionStart hooks (like explanatory-output-style) add instructions to every session
   - MCP servers with large schemas consume context on connection
   - Subagents spawn with full context inheritance
3. **Measure impact:**
   - Estimate tokens used by plugin instructions
   - Check if MCP tool descriptions are verbose
   - Look for redundant or unused plugins
4. **Recommend optimizations:**
   - Disable unused plugins for this session
   - Use lightweight alternatives where available
   - Consider haiku model for simple tasks to reduce cost

### Feature Implementation Protocol

**Before implementing any feature, ALWAYS:**

1. **Check available plugins** in these locations:
   ```
   ~/.claude/plugins/marketplaces/claude-plugins-official/plugins/
   ~/.claude/plugins/marketplaces/superpowers-marketplace/
   ~/.claude/plugins/ccplugins-awesome/plugins/
   ~/.claude/plugins/voltagent-subagents/categories/
   ~/.claude/plugins/oh-my-claudecode/
   ```

2. **Match feature to plugin capability:**
   - Documentation tasks → documentation-engineer, technical-writer, documentation-generator
   - Content creation → content-marketer, content-creator
   - Code quality → code-reviewer, debugger
   - Git operations → commit, create-pr, changelog-generator
   - Research → explore, analyze-codebase

3. **Select and use appropriate plugin** before writing custom code

4. **Document plugin usage** in commit messages when a plugin significantly assisted

---

## Recommended Plugins for This Wiki

### Documentation & Content (Primary)

| Plugin | Source | Use Case |
|--------|--------|----------|
| **documentation-engineer** | voltagent | Wiki architecture, content organization, search optimization |
| **technical-writer** | voltagent | Clear documentation, tutorials, user guides |
| **documentation-generator** | ccplugins | Generate comprehensive docs |
| **content-marketer** | voltagent | SEO, content strategy, engagement |
| **analyze-codebase** | ccplugins | Understand project structure |

### Development & Quality

| Plugin | Source | Use Case |
|--------|--------|----------|
| **changelog-generator** | ccplugins | Auto-generate changelogs from commits |
| **code-reviewer** | voltagent | Review Astro components and configs |
| **git-workflow-manager** | voltagent | Git operations, branch management |
| **explore** | ccplugins | Codebase exploration |

### Orchestration (For Complex Tasks)

| Plugin | Source | Use Case |
|--------|--------|----------|
| **superpowers** | superpowers-marketplace | TDD workflow, systematic development |
| **oh-my-claudecode** | omc | Multi-agent orchestration (autopilot, ultrapilot) |

---

## Enabled Plugins

- **explanatory-output-style** - Provides educational insights about implementation choices

---

## Project-Specific Guidelines

### Content Structure

```
src/content/docs/
├── index.mdx           # Homepage
├── ai-ml/              # AI/ML topics
├── cybersecurity/      # Security guides
├── community/          # Community info
└── general/            # General topics
```

### Frontmatter Template

```markdown
---
title: Page Title
description: Brief SEO description
tags: ["tag1", "tag2"]
---
```

### Callout Syntax (Starlight)

```markdown
:::note[Title]
Content
:::

:::tip[Title]
Content
:::

:::caution[Title]
Content
:::

:::danger[Title]
Content
:::
```

### Build Commands

```bash
npm run dev      # Development server (localhost:4321)
npm run build    # Production build
npm run preview  # Preview production build
```

### Deployment

- Push to GitHub → syncs to Forgejo → deploys to Cloudflare Pages
- Site: irregularpedia.org

---

## Available Plugin Locations Reference

```
~/.claude/plugins/
├── marketplaces/
│   ├── claude-plugins-official/plugins/   # Official Anthropic plugins
│   └── superpowers-marketplace/           # Agentic workflow plugins
├── ccplugins-awesome/plugins/             # 100+ community plugins
├── voltagent-subagents/categories/        # 126+ specialized subagents
│   ├── 01-core-development/
│   ├── 02-language-specialists/
│   ├── 03-infrastructure/
│   ├── 04-quality-security/
│   ├── 05-data-ai/
│   ├── 06-developer-experience/           # documentation-engineer here
│   ├── 07-specialized-domains/
│   ├── 08-business-product/               # technical-writer here
│   ├── 09-meta-orchestration/
│   └── 10-research-analysis/
└── oh-my-claudecode/                      # Multi-agent orchestration
```
