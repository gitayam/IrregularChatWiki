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
| Source Control | GitHub + Forgejo | Redundancy, community access |
| Content Format | Markdown/MDX | Simple, portable, component support |

### Enabled Plugins

- **starlight-tags** - Tagging system for content organization
- **starlight-site-graph** - Interactive site visualization
- **starlight-scroll-to-top** - Scroll to top button
- **starlight-page-actions** - Page action buttons
- **starlight-ui-tweaks** - UI customization
- **starlight-videos** - Video embed support

## Contributing

### Option 1: Edit Directly Online

Edit pages directly in your browser:

- **GitHub:** [github.com/gitayam/IrregularChatWiki](https://github.com/gitayam/IrregularChatWiki)
- **Forgejo:** [git.irregularchat.com/sac/IrregularChatWiki](https://git.irregularchat.com/sac/IrregularChatWiki)

Navigate to any file in `src/content/docs/`, click Edit, make your changes, and submit a pull request.

### Option 2: Local Development

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
│   └── styles/             # Custom CSS
├── public/                 # Static assets (images, etc.)
├── astro.config.mjs        # Astro/Starlight configuration
├── tags.yml                # Tag definitions
├── .github/workflows/      # GitHub Actions (sync to Forgejo)
├── .forgejo/workflows/     # Forgejo Actions (deploy to Cloudflare)
└── package.json            # Node.js dependencies
```

## Architecture

```
GitHub Repository ──sync──> Forgejo ──deploy──> Cloudflare Pages ──> irregularpedia.org
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
- **Forgejo:** [git.irregularchat.com/sac/IrregularChatWiki](https://git.irregularchat.com/sac/IrregularChatWiki)
- **Community:** [IrregularChat](https://irregularchat.com)
