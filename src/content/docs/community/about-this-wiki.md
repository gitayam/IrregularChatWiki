---
title: "About This Wiki"
tags: ["meta", "wiki", "community", "astro", "starlight", "cloudflare"]
---

# About This Wiki

Irregularpedia is the community-driven knowledge base for IrregularChat. This page explains the thinking behind the wiki, its technical architecture, and how you can contribute.

## Philosophy

### Why a Wiki?

The IrregularChat community generates a tremendous amount of knowledge through discussions, shared resources, and collaborative problem-solving. A wiki serves as:

- **Persistent Memory** - Conversations fade, but wiki pages endure
- **Collaborative Knowledge** - Multiple contributors improve content over time
- **Searchable Reference** - Find information quickly instead of scrolling through chat history
- **Onboarding Resource** - New members can self-serve common questions

### Design Principles

| Principle | Implementation |
|-----------|----------------|
| **Open by Default** | All content publicly accessible, no login required to read |
| **Low Barrier to Contribute** | Edit via browser, Obsidian, or any Markdown editor |
| **Community Owned** | Hosted on community infrastructure, not proprietary platforms |
| **Version Controlled** | Full history of changes, easy rollback if needed |
| **Fast & Lightweight** | Static site, no database, loads instantly worldwide |

## Technical Architecture

### The Stack

```
┌─────────────────────────────────────────────────────────────────┐
│                         CONTENT LAYER                          │
│  Markdown/MDX files in src/content/docs/ with YAML frontmatter │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  BUILD LAYER (Astro Starlight)                 │
│  - Converts Markdown/MDX → HTML                                │
│  - Generates navigation & search index                         │
│  - Applies theme, plugins & Astro components                   │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                    HOSTING (Cloudflare Pages)                  │
│  - Global CDN (300+ edge locations)                            │
│  - Automatic HTTPS                                             │
│  - Preview deployments for PRs                                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                         irregularpedia.org                      │
└─────────────────────────────────────────────────────────────────┘
```

### Astro Starlight

[Astro Starlight](https://starlight.astro.build/) is the documentation framework that powers this wiki, built on top of [Astro](https://astro.build/).

**Why Astro Starlight?**

- **Performance** - Ships zero JavaScript by default, ultra-fast page loads
- **Documentation-First** - Purpose-built for technical documentation
- **Rich Plugin Ecosystem** - Tags, scroll-to-top, videos, and more
- **MDX Support** - Embed interactive components when needed
- **Built-in Search** - Pagefind-powered search works instantly
- **Accessibility** - WCAG 2.1 compliant out of the box

**Key Features & Plugins Used:**

| Feature | Purpose |
|---------|---------|
| Sidebar Navigation | Organized topic hierarchy with collapsible sections |
| Pagefind Search | Fast, client-side full-text search |
| Dark/Light Mode | Reader preference with system detection |
| Code Highlighting | Syntax highlighting with Shiki |
| starlight-tags | Content categorization and tag pages |
| starlight-videos | Embedded video support |
| starlight-kbd | Keyboard shortcut documentation |
| Mermaid & PlantUML | Diagram rendering from code |

### Cloudflare Pages

[Cloudflare Pages](https://pages.cloudflare.com/) hosts the built static files.

**Why Cloudflare Pages?**

- **Free Tier** - Unlimited bandwidth, unlimited sites
- **Global CDN** - Content served from nearest edge location
- **Automatic Deployments** - Push to GitHub → deployed in ~30 seconds
- **Preview Deployments** - Every PR gets a unique preview URL
- **Automatic HTTPS** - SSL certificates managed automatically

**Deployment Flow:**

```
git push → GitHub webhook → Cloudflare builds → Deploy to edge
                                    │
                                    └→ Preview URL for PRs
```

### Source Control & Syncing

The wiki lives in two synchronized repositories:

| Platform | URL | Purpose |
|----------|-----|---------|
| **GitHub** | [github.com/gitayam/IrregularChatWiki](https://github.com/gitayam/IrregularChatWiki) | Primary, triggers Cloudflare deploys |
| **Forgejo** | [git.irregularchat.com/irregulars/IrregularChatWiki](https://git.irregularchat.com/irregulars/IrregularChatWiki) | Community mirror, self-hosted |

**Sync Mechanism:**

GitHub Actions automatically syncs pushes to Forgejo:

```yaml
# .github/workflows/sync-to-forgejo.yml
name: Sync to Forgejo
on:
  push:
    branches: [main]
jobs:
  sync:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - run: |
          git remote add forgejo https://git.irregularchat.com/...
          git push forgejo main --force
```

This ensures:
- **Redundancy** - Content exists on multiple platforms
- **Community Access** - Contributors can use either platform
- **Self-Sovereignty** - Not dependent on any single provider

## Repository Structure

```
IrregularChatWiki/
├── src/
│   ├── content/
│   │   └── docs/              # All wiki content (Markdown/MDX)
│   │       ├── index.mdx      # Homepage
│   │       ├── ai-ml/         # AI/ML topics
│   │       ├── community/     # Community resources
│   │       ├── cybersecurity/ # Security guides
│   │       ├── development/   # Development guides
│   │       ├── general/       # General topics
│   │       ├── hardware/      # Hardware guides
│   │       ├── infrastructure/# Self-hosting guides
│   │       ├── matrix/        # Matrix/Element guides
│   │       ├── military/      # Military resources
│   │       ├── privacy/       # Privacy & OPSEC
│   │       ├── radio/         # RF/SDR topics
│   │       ├── research/      # OSINT & research
│   │       └── server-guides/ # Server setup
│   ├── assets/                # Images and media
│   ├── components/            # Custom Astro components
│   └── styles/                # Custom CSS
├── public/                    # Static assets (favicon, logo)
├── astro.config.mjs           # Astro & Starlight configuration
├── .github/
│   └── workflows/             # GitHub Actions (sync to Forgejo)
├── package.json               # Node.js dependencies
└── README.md                  # Repository documentation
```

## History

### Migration Journey

This wiki has evolved through two major platform migrations:

#### MediaWiki → VitePress (2024)

Originally hosted on MediaWiki, the wiki was migrated to VitePress:

| MediaWiki | VitePress |
|-----------|-----------|
| Requires PHP + MySQL | Static files only |
| Server maintenance needed | Zero maintenance |
| WYSIWYG sometimes breaks formatting | Consistent Markdown |
| Complex permission system | Simple Git-based workflow |
| Heavy resource usage | Lightweight, fast |

#### VitePress → Astro Starlight (2025)

The wiki was further migrated to Astro Starlight for enhanced features:

| VitePress | Astro Starlight |
|-----------|-----------------|
| Vue-based components | Astro components (zero JS by default) |
| Limited plugin ecosystem | Rich plugin ecosystem |
| Manual sidebar configuration | Flexible sidebar with autogenerate |
| Basic search | Pagefind full-text search |
| Single content type | MDX support for interactive content |

**Key improvements from Starlight:**
- Tag-based content organization
- Embedded video support
- Keyboard shortcut documentation
- Mermaid and PlantUML diagram rendering
- Better mobile experience

## Contributing

### Quick Edits

Every page has an "Edit this page on GitHub" link at the bottom. Click it to:
1. Fork the repository (first time only)
2. Edit the Markdown file in your browser
3. Submit a Pull Request
4. Changes deploy automatically when merged

### Larger Contributions

For significant edits, clone the repository locally:

```bash
# Clone
git clone https://github.com/gitayam/IrregularChatWiki.git
cd IrregularChatWiki

# Install dependencies
npm install

# Start development server
npm run dev
# → Opens at http://localhost:4321

# Make your changes in src/content/docs/

# Build to verify
npm run build

# Commit and push
git add .
git commit -m "Add: description of changes"
git push
```

### Using Obsidian

[Obsidian](https://obsidian.md/) is an excellent Markdown editor for wiki content:

1. Clone the repository
2. Open Obsidian → File → Open Vault
3. Select the `src/content/docs/` folder as your vault
4. Edit with live preview and wiki-style linking
5. Commit and push changes via Git

See the [Obsidian + GitHub Guide](/community/obsidian-github-guide) for detailed setup instructions.

### Page Template

```markdown
---
title: "Your Page Title"
description: "Brief description for SEO and previews"
tags: ["relevant", "tags", "here"]
---

# Your Page Title

Introduction paragraph explaining the topic.

## Main Section

Content with proper Markdown formatting.

:::tip
Use callouts for important information!
:::

### Subsection

More detailed content.

## Related Resources

- [Related Page](/path/to/page) - Brief description
- [External Link](https://example.com) - Brief description
```

## Cost

| Service | Cost |
|---------|------|
| Cloudflare Pages | Free |
| GitHub | Free |
| Forgejo (self-hosted) | Already running |
| Domain (irregularpedia.org) | ~$12/year |
| **Total** | **~$12/year** |

## Links

- **Live Wiki**: [irregularpedia.org](https://irregularpedia.org)
- **GitHub**: [github.com/gitayam/IrregularChatWiki](https://github.com/gitayam/IrregularChatWiki)
- **Forgejo**: [git.irregularchat.com/irregulars/IrregularChatWiki](https://git.irregularchat.com/irregulars/IrregularChatWiki)
- **Astro Starlight Docs**: [starlight.astro.build](https://starlight.astro.build/)
- **Astro Docs**: [docs.astro.build](https://docs.astro.build/)
- **Cloudflare Pages Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **IrregularChat Community**: [irregularchat.com](https://irregularchat.com)

<!-- sync test 1769499177 -->
<!-- verified 1769499246 -->
<!-- mirror test 1769500443 -->
