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

## Contributing

There are several ways to contribute to the wiki:

### Option 1: Edit Directly Online

Edit pages directly in your browser:

- **GitHub:** [github.com/gitayam/IrregularChatWiki](https://github.com/gitayam/IrregularChatWiki)
- **Forgejo:** [git.irregularchat.com/sac/IrregularChatWiki](https://git.irregularchat.com/sac/IrregularChatWiki)

Navigate to any file in `docs/`, click Edit, make your changes, and submit a pull request.

### Option 2: Local Editing with Obsidian (Recommended)

For larger contributions or frequent editing, we recommend using [Obsidian](https://obsidian.md/) - a free, powerful Markdown editor.

**Setup:**

```bash
# Clone the repository
git clone https://github.com/gitayam/IrregularChatWiki.git
cd IrregularChatWiki

# Open the docs folder in Obsidian
# File > Open Vault > Select the "docs" folder
```

**Benefits of Obsidian:**
- Excellent Markdown editing with live preview
- Wiki-style `[[internal links]]` support
- Graph view to visualize connections between pages
- Works offline - edit anywhere
- Free for personal use

**Submitting Changes:**

```bash
# Create a branch for your changes
git checkout -b my-contribution

# Add and commit your changes
git add .
git commit -m "Add: description of your changes"

# Push and create a pull request
git push origin my-contribution
```

Then open a Pull Request on GitHub or Forgejo.

### Option 3: Run the Wiki Locally

Preview your changes before submitting:

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server runs at `http://localhost:5173` with hot reload.

## Content Guidelines

- Write in clear, accessible language
- Use Markdown formatting
- Place new pages in the appropriate `docs/` subdirectory
- Add frontmatter with title and description
- Link related pages using `[text](relative-path.md)` syntax

**Page Template:**

```markdown
---
title: Your Page Title
description: Brief description for search engines
---

# Your Page Title

Your content here...

## Related Pages

- [Related Topic](./related-topic.md)
```

## Architecture

### How It Works

```
GitHub Repository ──push──> Cloudflare Pages ──deploy──> irregularpedia.org
       │
       └──sync──> Forgejo (git.irregularchat.com)
```

### Tech Stack

| Component | Technology | Why |
|-----------|------------|-----|
| Static Site Generator | [VitePress](https://vitepress.dev/) | Fast, Vue-powered, excellent for documentation |
| Hosting | [Cloudflare Pages](https://pages.cloudflare.com/) | Free, global CDN, automatic HTTPS |
| Source Control | GitHub + Forgejo | Redundancy, community access |
| Content Format | Markdown | Simple, portable, works with any editor |

### Why This Stack?

**VitePress:**
- Lightning-fast builds and hot reload
- Built-in search functionality
- Clean, modern documentation theme
- Vue components when needed
- Markdown extensions (code highlighting, containers, etc.)

**Cloudflare Pages:**
- Free tier includes unlimited sites and bandwidth
- Automatic deployments on every push
- Global edge network for fast loading worldwide
- Automatic HTTPS certificates
- Preview deployments for pull requests

**Cost:** $0/month for hosting and deployment

## Repository Structure

```
IrregularChatWiki/
├── docs/                    # Wiki content (Markdown files)
│   ├── index.md            # Homepage
│   ├── ai-ml/              # AI/ML topics
│   ├── cybersecurity/      # Security guides
│   ├── community/          # Community info
│   └── general/            # General topics
├── .vitepress/
│   └── config.ts           # VitePress configuration
├── .github/workflows/      # GitHub Actions (sync to Forgejo)
├── .forgejo/workflows/     # Forgejo Actions (sync to GitHub)
└── package.json            # Node.js dependencies
```

## Syncing

The repository is mirrored between GitHub and Forgejo:

- Push to either platform automatically syncs to the other
- Cloudflare Pages deploys from GitHub
- Both platforms accept pull requests

## License

Content is provided for educational purposes by the IrregularChat community.

## Links

- **Wiki:** [irregularpedia.org](https://irregularpedia.org)
- **GitHub:** [github.com/gitayam/IrregularChatWiki](https://github.com/gitayam/IrregularChatWiki)
- **Forgejo:** [git.irregularchat.com/sac/IrregularChatWiki](https://git.irregularchat.com/sac/IrregularChatWiki)
- **Community:** [IrregularChat](https://irregularchat.com)
