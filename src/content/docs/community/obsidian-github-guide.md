---
title: "Obsidian + GitHub Wiki Workflow"
description: "Guide to editing the Irregularpedia wiki using Obsidian and GitHub"
---

# Obsidian + GitHub Wiki Workflow

This guide explains how to use [Obsidian](https://obsidian.md) as your editor for contributing to Irregularpedia, with GitHub for version control and collaboration.

## Why Obsidian + GitHub?

| Benefit | Description |
|---------|-------------|
| **Local editing** | Work offline, use your preferred editor |
| **Bidirectional links** | See connections between wiki pages |
| **Graph view** | Visualize knowledge relationships |
| **Version control** | Track changes, collaborate, never lose work |
| **No vendor lock-in** | Plain markdown files you own |

---

## Prerequisites

- [Obsidian](https://obsidian.md) installed
- [Git](https://git-scm.com/downloads) installed
- [GitHub account](https://github.com) (or access to git.irregularchat.com)
- Basic familiarity with Git concepts

---

## Initial Setup

### 1. Clone the Repository

Open your terminal and clone the wiki repository:

```bash
# Using HTTPS
git clone https://github.com/irregularchat/wiki.git

# Or using SSH (if you have SSH keys configured)
git clone git@github.com:irregularchat/wiki.git
```

For the IrregularChat Forgejo instance:

```bash
git clone https://git.irregularchat.com/irregulars/IrregularChatWiki.git
```

### 2. Open as Obsidian Vault

1. Open Obsidian
2. Click **Open folder as vault**
3. Navigate to the cloned repository folder
4. Select the `src/content/docs` folder as your vault root

:::tip[Vault Location]
Opening `src/content/docs` directly means your Obsidian links will match the wiki's URL structure.
:::

### 3. Configure Obsidian Settings

Go to **Settings** (gear icon) and configure:

#### Files & Links
- **New link format**: Relative path to file
- **Use [[Wikilinks]]**: OFF (use standard markdown links)
- **Default location for new notes**: Same folder as current file

#### Editor
- **Default editing mode**: Source mode (recommended for markdown)
- **Show frontmatter**: ON

---

## Daily Workflow

### Before You Start Editing

Always pull the latest changes before starting work:

```bash
cd /path/to/IrregularChatWiki
git pull origin main
```

Or use the Obsidian Git plugin (see below).

### Creating New Pages

1. Create a new file in the appropriate folder under `src/content/docs/`
2. Add frontmatter at the top:

```yaml
---
title: "Your Page Title"
description: "Brief description for search and previews"
---
```

3. Write your content in markdown
4. Save the file with a kebab-case name: `my-new-page.md`

### Editing Existing Pages

1. Navigate using Obsidian's file explorer or search (`Ctrl/Cmd + O`)
2. Make your changes
3. Save (`Ctrl/Cmd + S`)

### Linking Between Pages

Use relative markdown links:

```markdown
<!-- Link to page in same folder -->
[Research Tools](./research-tools.md)

<!-- Link to page in different folder -->
[Matrix Guide](/matrix/element-matrix-messenger.md)

<!-- Link with anchor -->
[Getting Started](#getting-started)
```

---

## Git Workflow

### Option A: Command Line

```bash
# Check what changed
git status

# Stage your changes
git add src/content/docs/your-file.md

# Or stage all changes
git add -A

# Commit with a descriptive message
git commit -m "docs: Add guide for drone regulations"

# Push to remote
git push origin main
```

### Option B: Obsidian Git Plugin

Install the **Obsidian Git** community plugin for a GUI experience:

1. Go to **Settings → Community plugins**
2. Disable **Restricted mode**
3. Click **Browse** and search for "Obsidian Git"
4. Install and enable it

#### Plugin Settings (Recommended)

| Setting | Value |
|---------|-------|
| Auto pull interval | 10 minutes |
| Auto push after commit | ON |
| Show status bar | ON |
| Commit message | `docs: {{date}} updates` |

#### Using the Plugin

- **Pull**: `Ctrl/Cmd + P` → "Obsidian Git: Pull"
- **Commit**: `Ctrl/Cmd + P` → "Obsidian Git: Commit all changes"
- **Push**: `Ctrl/Cmd + P` → "Obsidian Git: Push"

---

## Recommended Plugins

These Obsidian plugins enhance the wiki editing experience:

| Plugin | Purpose |
|--------|---------|
| **Obsidian Git** | Git integration without leaving Obsidian |
| **Linter** | Auto-format markdown on save |
| **Paste URL into selection** | Clean link pasting |
| **Advanced Tables** | Easy table editing |
| **Editor Syntax Highlight** | Code block highlighting |
| **Outliner** | Better list manipulation |

---

## Wiki-Specific Conventions

### File Naming
- Use `kebab-case` for filenames: `my-guide-name.md`
- Keep names descriptive but concise
- Avoid special characters

### Frontmatter Requirements

Every page needs at minimum:

```yaml
---
title: "Page Title"
---
```

Optional but recommended:

```yaml
---
title: "Page Title"
description: "One-line description for SEO and previews"
tags: [research, osint, tools]
---
```

### Callouts/Admonitions

Use Starlight's callout syntax:

```markdown
:::note
This is a note callout.
:::

:::tip[Pro Tip]
This is a tip with a custom title.
:::

:::caution
This is a warning.
:::

:::danger
This is a danger/error callout.
:::
```

### Images

1. Place images in `src/assets/` or `public/`
2. Reference them:

```markdown
![Alt text](../../../assets/my-image.png)
```

---

## Handling Merge Conflicts

If you get a merge conflict when pulling:

1. Open the conflicted file
2. Look for conflict markers:
   ```
   <<<<<<< HEAD
   Your local changes
   =======
   Remote changes
   >>>>>>> origin/main
   ```
3. Edit to keep the correct content (remove markers)
4. Save, commit, and push

---

## Best Practices

### Do
- Pull before starting work
- Write descriptive commit messages
- Keep commits focused (one topic per commit)
- Test links work before committing
- Add frontmatter to every page

### Don't
- Commit node_modules or build artifacts
- Force push to main
- Leave merge conflicts unresolved
- Create orphan pages (no links to them)

---

## Troubleshooting

### "Your branch is behind origin/main"

```bash
git pull --rebase origin main
```

### "Permission denied" on push

Check your SSH keys or use HTTPS with a personal access token:

```bash
git remote set-url origin https://github.com/irregularchat/wiki.git
```

### Links not working in Obsidian

Ensure you opened `src/content/docs` as the vault root, not the repository root.

### Obsidian Git not finding repo

The `.git` folder must be accessible. If you opened a subfolder as vault, configure the plugin's "Custom base path" to point to the repo root.

---

## Quick Reference

| Action | Command / Shortcut |
|--------|-------------------|
| Pull latest | `git pull` or `Ctrl+P` → "Git: Pull" |
| Stage all | `git add -A` |
| Commit | `git commit -m "message"` |
| Push | `git push` or `Ctrl+P` → "Git: Push" |
| Check status | `git status` |
| Search files | `Ctrl/Cmd + O` |
| Search content | `Ctrl/Cmd + Shift + F` |
| Command palette | `Ctrl/Cmd + P` |

---

## Resources

- [Obsidian Documentation](https://help.obsidian.md)
- [Obsidian Git Plugin](https://github.com/denolehov/obsidian-git)
- [Git Documentation](https://git-scm.com/doc)
- [Starlight Documentation](https://starlight.astro.build)
- [IrregularChat Forum](https://forum.irregularchat.com)

---

*Questions? Ask on [Q&A](https://qa.irregulars.io) or the [Forum](https://forum.irregularchat.com).*
