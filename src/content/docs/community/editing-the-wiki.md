---
title: Editing the Wiki
description: How to contribute to Irregularpedia using the in-page editor
tags: ["community", "contributing", "wiki"]
---

# Editing the Wiki

Irregularpedia is a community wiki - anyone with an IrregularChat account can contribute. This guide explains how to use the in-page editor to make changes.

## Quick Start

1. **Login** - Click the user icon in the header and sign in with your IrregularChat SSO account
2. **Navigate** - Go to the page you want to edit
3. **Click Edit** - Click the pencil icon (✏️) next to the page title
4. **Make Changes** - Edit the markdown with live preview
5. **Save** - Click Save to publish your changes

## The Editor

The in-page editor provides a split-pane view:

| Left Pane | Right Pane |
|-----------|------------|
| Markdown source | Live preview |

As you type, the preview updates in real-time so you can see how your changes will look.

### Keyboard Shortcuts

- **Cmd/Ctrl + S** - Save (when in editor)
- **Escape** - Close save dialog

## Markdown Basics

### Headers

```markdown
# Heading 1
## Heading 2
### Heading 3
```

### Text Formatting

```markdown
**bold text**
*italic text*
`inline code`
```

### Links

```markdown
[Link text](https://example.com)
[Internal link](/ai-ml/claude-code)
```

### Lists

```markdown
- Bullet point
- Another point
  - Nested point

1. Numbered item
2. Second item
```

### Code Blocks

````markdown
```python
def hello():
    print("Hello, world!")
```
````

### Tables

```markdown
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
| Cell 3   | Cell 4   |
```

### Callouts

Starlight supports special callout blocks:

```markdown
:::note[Note Title]
This is informational content.
:::

:::tip[Tip]
Helpful advice goes here.
:::

:::caution[Warning]
Be careful about this.
:::

:::danger[Danger]
Critical warning!
:::
```

## Page Frontmatter

Every wiki page starts with frontmatter (metadata):

```markdown
---
title: Your Page Title
description: Brief description for search engines
tags: ["tag1", "tag2"]
---

# Your content starts here
```

### Required Fields

- `title` - The page title (shown in browser tab and navigation)

### Optional Fields

- `description` - SEO description (shown in search results)
- `tags` - Array of tags for organization
- `sidebar` - Custom sidebar configuration

## Conflict Resolution

If someone else edited the page while you were editing, you'll see a conflict message. You have two options:

1. **Reload** - Load the latest version (your changes will be lost)
2. **Copy your work** - Before reloading, copy your changes to paste back in

:::tip[Avoid Conflicts]
Save frequently when making large edits to minimize the risk of conflicts.
:::

## Bookmarks

You can bookmark pages for quick access:

1. Login to your account
2. Click the bookmark icon on any page
3. Access your bookmarks from the user menu

## Creating New Pages

Currently, new pages must be created via Git (GitHub or Forgejo). The in-page editor only supports editing existing pages.

To create a new page:

1. Go to [GitHub](https://github.com/gitayam/IrregularChatWiki) or [Forgejo](https://git.irregularchat.com/irregulars/IrregularChatWiki)
2. Navigate to `src/content/docs/` and the appropriate subfolder
3. Create a new `.md` file with frontmatter
4. Submit a pull request

## Getting Help

- **Questions?** Ask in the [IrregularChat community](https://irregularchat.com)
- **Found a bug?** Report it on [GitHub Issues](https://github.com/gitayam/IrregularChatWiki/issues)

## Related Pages

- [Community Welcome](/community/welcome)
- [Community Guidelines](/community)
