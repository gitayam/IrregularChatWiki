---
title: "About This Wiki"
tags: ["meta", "wiki", "community", "vitepress", "cloudflare"]
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
│  Markdown files in /docs with YAML frontmatter                 │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                      BUILD LAYER (VitePress)                   │
│  - Converts Markdown → HTML                                    │
│  - Generates navigation & search index                         │
│  - Applies theme & Vue components                              │
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

### VitePress

[VitePress](https://vitepress.dev/) is the static site generator that powers this wiki.

**Why VitePress?**

- **Speed** - Built on Vite, the fastest JavaScript build tool
- **Vue-Powered** - Can embed interactive Vue components when needed
- **Documentation-First** - Designed specifically for technical documentation
- **Excellent Markdown** - Code highlighting, custom containers, frontmatter
- **Built-in Search** - Local search works offline, no external service needed

**Key Features Used:**

| Feature | Purpose |
|---------|---------|
| Sidebar Navigation | Organized topic hierarchy |
| Local Search | Find content instantly |
| Dark/Light Mode | Reader preference |
| Code Highlighting | Technical examples |
| Frontmatter Tags | Content categorization |
| `createContentLoader` | Dynamic tags page generation |

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
| **Forgejo** | [git.irregularchat.com/sac/IrregularChatWiki](https://git.irregularchat.com/sac/IrregularChatWiki) | Community mirror, self-hosted |

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
├── docs/                      # All wiki content
│   ├── index.md              # Homepage
│   ├── tags.md               # Auto-generated tags page
│   ├── tags.data.ts          # Tags data loader
│   ├── ai-ml/                # AI/ML topics
│   ├── community/            # Community resources
│   ├── cybersecurity/        # Security guides
│   ├── general/              # General topics
│   ├── infrastructure/       # Self-hosting guides
│   ├── matrix/               # Matrix/Element guides
│   ├── privacy/              # Privacy & OPSEC
│   ├── radio/                # RF/SDR topics
│   ├── research/             # OSINT & research
│   ├── server-guides/        # Server setup
│   └── public/               # Static assets (images, logo)
├── .vitepress/
│   └── config.ts             # VitePress configuration
├── .github/
│   └── workflows/            # GitHub Actions
├── package.json              # Node.js dependencies
└── README.md                 # Repository documentation
```

## History

### Migration from MediaWiki

This wiki was originally hosted on MediaWiki. In late 2024, it was migrated to VitePress for several reasons:

| MediaWiki | VitePress |
|-----------|-----------|
| Requires PHP + MySQL | Static files only |
| Server maintenance needed | Zero maintenance |
| WYSIWYG sometimes breaks formatting | Consistent Markdown |
| Complex permission system | Simple Git-based workflow |
| Heavy resource usage | Lightweight, fast |

The migration process involved:
1. Exporting MediaWiki content to XML
2. Converting to Markdown using custom scripts
3. Cleaning up formatting artifacts
4. Restructuring navigation
5. Adding frontmatter and tags

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
# → Opens at http://localhost:5173

# Make your changes in docs/

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
3. Select the `docs/` folder
4. Edit with live preview and wiki-style linking
5. Commit and push changes via Git

### Page Template

```markdown
***
title: "Your Page Title"
tags: ["relevant", "tags", "here"]
***

# Your Page Title

Introduction paragraph explaining the topic.

## Main Section

Content with proper Markdown formatting.

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
- **Forgejo**: [git.irregularchat.com/sac/IrregularChatWiki](https://git.irregularchat.com/sac/IrregularChatWiki)
- **VitePress Docs**: [vitepress.dev](https://vitepress.dev/)
- **Cloudflare Pages Docs**: [developers.cloudflare.com/pages](https://developers.cloudflare.com/pages/)
- **IrregularChat Community**: [irregularchat.com](https://irregularchat.com)
