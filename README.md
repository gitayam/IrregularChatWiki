# IrregularChat Wiki (Irregularpedia)

A community-driven knowledge base for the IrregularChat community, covering cybersecurity, AI/ML, military topics, and more.

**Live Wiki:** [irregularpedia.org](https://irregularpedia.org)

## About

Irregularpedia is an open wiki maintained by the IrregularChat community. It serves as a collaborative knowledge repository covering:

- Cybersecurity guides and certifications
- AI/ML resources and learning paths
- Military career and professional development
- Community events and projects
- Technical guides and tutorials

## Tech Stack

| Component | Technology | Why |
|-----------|------------|-----|
| Static Site Generator | [Astro Starlight](https://starlight.astro.build/) | Modern, fast, excellent documentation framework |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) | Free, global CDN, automatic HTTPS |
| Backend | [Cloudflare Workers](https://workers.cloudflare.com/) | Serverless functions for auth & editing |
| Database | [Cloudflare D1](https://developers.cloudflare.com/d1/) | SQLite at the edge |
| Auth | [Authentik SSO](https://goauthentik.io/) | Self-hosted OAuth2/OIDC |
| Source Control | GitHub + Forgejo | Redundancy, community access |
| Content Format | Markdown/MDX | Simple, portable, component support |

### Interactive Features

- **In-Page Editor** - Edit any page directly with live markdown preview
- **User Authentication** - SSO login via Authentik (IrregularChat accounts)
- **Bookmarks** - Save favorite pages for quick access (requires login)

### Enabled Plugins

- **starlight-tags** - Tagging system for content organization
- **starlight-scroll-to-top** - Scroll to top button
- **starlight-page-actions** - Page action buttons
- **starlight-ui-tweaks** - UI customization
- **starlight-videos** - Video embed support

## Contributing

### Option 1: Edit In-Page (Recommended)

The easiest way to contribute - edit any page directly from the wiki:

1. **Login** - Click the user icon and sign in with your IrregularChat SSO account
2. **Navigate** - Go to any wiki page you want to edit
3. **Edit** - Click the pencil icon (✏️) next to the page title
4. **Write** - Use the split-pane markdown editor with live preview
5. **Save** - Click Save to commit your changes directly

Your edits are committed to the main branch with your username as the author. Git history tracks all changes.

### Option 2: Edit via Git Platforms

Edit pages directly in your browser:

- **GitHub:** [github.com/gitayam/IrregularChatWiki](https://github.com/gitayam/IrregularChatWiki)
- **Forgejo:** [git.irregularchat.com/irregulars/IrregularChatWiki](https://git.irregularchat.com/irregulars/IrregularChatWiki)

Navigate to any file in `src/content/docs/`, click Edit, make your changes, and submit a pull request.

### Option 3: Local Development

```bash
# Clone the repository
git clone https://github.com/gitayam/IrregularChatWiki.git
cd IrregularChatWiki

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:4321` with hot reload.

### Submitting Changes

```bash
# Create a branch for your changes
git checkout -b my-contribution

# Add and commit your changes
git add .
git commit -m "Add: description of your changes"

# Push and create a pull request
git push origin my-contribution
```

## Content Guidelines

- Write in clear, accessible language
- Use Markdown formatting
- Place new pages in the appropriate `src/content/docs/` subdirectory
- Add frontmatter with title and description
- Add tags to help organize content

**Page Template:**

```markdown
---
title: Your Page Title
description: Brief description for search engines
tags: ["tag1", "tag2"]
---

# Your Page Title

Your content here...

## Related Pages

- [Related Topic](./related-topic.md)
```

### Callouts/Admonitions

Starlight uses the following callout syntax:

```markdown
:::note[Note Title]
This is a note callout.
:::

:::tip[Tip Title]
This is a tip callout.
:::

:::caution[Caution Title]
This is a caution callout.
:::

:::danger[Danger Title]
This is a danger callout.
:::
```

## Repository Structure

```
IrregularChatWiki/
├── src/
│   ├── content/
│   │   └── docs/           # Wiki content (Markdown files)
│   │       ├── index.mdx   # Homepage
│   │       ├── ai-ml/      # AI/ML topics
│   │       ├── cybersecurity/  # Security guides
│   │       ├── community/  # Community info
│   │       └── general/    # General topics
│   ├── components/         # Custom Astro components
│   │   ├── Header.astro    # Custom header with login
│   │   ├── UserMenu.astro  # User auth dropdown
│   │   ├── EditButton.astro    # In-page edit button
│   │   └── BookmarkButton.astro # Bookmark toggle
│   └── styles/             # Custom CSS
├── functions/              # Cloudflare Workers Functions
│   ├── api/
│   │   ├── auth/           # OAuth2 endpoints (login, callback, logout)
│   │   ├── bookmarks/      # Bookmark CRUD
│   │   └── pages/          # Page content fetch/edit
│   ├── lib/                # Shared utilities (auth, etc.)
│   └── types.ts            # TypeScript types
├── public/
│   └── edit.html           # In-page markdown editor
├── astro.config.mjs        # Astro/Starlight configuration
├── wrangler.toml           # Cloudflare configuration
├── tags.yml                # Tag definitions
├── .github/workflows/      # GitHub Actions (sync to Forgejo)
├── .forgejo/workflows/     # Forgejo Actions (deploy to Cloudflare)
└── package.json            # Node.js dependencies
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        irregularpedia.org                            │
├─────────────────────────────────────────────────────────────────────┤
│  Cloudflare Pages                                                    │
│  ├── Static Site (Astro Starlight)                                  │
│  ├── Workers Functions (/api/*)                                      │
│  │   ├── /api/auth/* - OAuth2 with Authentik SSO                    │
│  │   ├── /api/pages/* - Fetch/edit pages via Forgejo API            │
│  │   └── /api/bookmarks/* - User bookmarks                          │
│  ├── D1 Database - Users, sessions, bookmarks                       │
│  └── KV Namespace - Session storage                                  │
└─────────────────────────────────────────────────────────────────────┘
                              │
    ┌─────────────────────────┼─────────────────────────┐
    ▼                         ▼                         ▼
┌─────────┐           ┌─────────────┐           ┌─────────────┐
│ GitHub  │◄──sync───►│   Forgejo   │──deploy──►│ Cloudflare  │
└─────────┘           │ (git.irr..) │           │   Pages     │
                      └─────────────┘           └─────────────┘
                              │
                              ▼
                      ┌─────────────┐
                      │  Authentik  │
                      │ (SSO/OAuth) │
                      └─────────────┘
```

### Why Astro Starlight?

- Modern documentation framework with excellent defaults
- Built-in search functionality (Pagefind)
- Extensive plugin ecosystem
- MDX support for interactive content
- Excellent accessibility and performance
- Active development and community

**Cost:** $0/month for hosting and deployment

## Syncing

The repository is mirrored between GitHub and Forgejo:

- Push to either platform automatically syncs to the other
- Cloudflare Pages deploys from Forgejo
- Both platforms accept pull requests

## License

Content is provided for educational purposes by the IrregularChat community.

## Links

- **Wiki:** [irregularpedia.org](https://irregularpedia.org)
- **GitHub:** [github.com/gitayam/IrregularChatWiki](https://github.com/gitayam/IrregularChatWiki)
- **Forgejo:** [git.irregularchat.com/irregulars/IrregularChatWiki](https://git.irregularchat.com/irregulars/IrregularChatWiki)
- **Community:** [IrregularChat](https://irregularchat.com)
