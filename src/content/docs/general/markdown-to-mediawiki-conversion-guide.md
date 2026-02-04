---
title: "Markdown to MediaWiki Conversion Guide"
---

# Markdown to MediaWiki Conversion Guide

## Convert Markdown to MediaWiki
Mediawiki syntax is a bit different from markdown syntax and GPT tends to prefer markdown syntax and defaults to it even when you ask it to convert to mediawiki.

This template is a guide to convert markdown to mediawiki syntax using gpt along with regex instructions to do the find and replace what is often missed by gpt.

### Exporting to Intellipedia
Intellipedia at every enclave doesn't allow importing by default. It does however allow you to create pages using the source editor (Edit Source).

On any pages you want on this wiki or even wikipedia you can view source or edit source and copy the text and paste it into the source editor as a file with extension .txt.

Transfer that file over to your government computer securely then open the file in notepad or any other text editor and copy the text. Paste that text into the source editor on Intellipedia.

| Title | Find | Replace | Description |
|-------|------|---------|-------------|
| Bold | `\*\*(?!\s)(.*?)(?<!\s)\*\*` | `**$1**` | Converts markdown bold to MediaWiki bold |
| Heading | `=(.*?)=` | `==$1==` | Adjusts heading level |
| Bullet | `^ \*` | `**` | Converts indented bullets to MediaWiki |
| Numbering | `^\d(.*?)` | `#` | Converts numbered lists |
| Italics | `\_(.*?)\_` | `*$1*` | Converts markdown italics |
| External Links | `\[(.*?)\]\((https?:\/\/.*?)\)` | `[$2 $1]` | Converts external links |
| Internal Links | `\[(.*?)\]\((.*?)\.md\)` | `[[$2|$1]]` | Converts internal links |
| Images | `!\[(.*?)\]\((.*?)\)` | `[[File:$2|alt=$1]]` | Converts images |
| Code Blocks | ` ```(.*?)``` ` | `<pre>$1</pre>` | Converts code blocks |
| Inline Code | `` `(.*?)` `` | `<code>$1</code>` | Converts inline code |
| Horizontal Rule | `^---$` | `----` | Converts horizontal rule |
| Level 1 Heading | `^# (.*?)$` | `= $1 =` | Converts H1 heading |
| Level 2 Heading | `^## (.*?)$` | `== $1 ==` | Converts H2 heading |
| Level 3 Heading | `^### (.*?)$` | `=== $1 ===` | Converts H3 heading |

#### SED
You can do this on a mac or linux machine with sed using the clipboard as input and pipe it through sed and awk commands to get the output using the find and replace commands.
echo pbpaste | sed -E 's/\*\*(.*?)\*\*/**$1**/g' | sed -E 's/=(.*?)=/==$1==/g' | sed -E 's/^ \*/**/g' | sed -E 's/^\d(.?)/#/g'

#### Python

### GPT Prompt Template Markdown to Mediawiki
```

Please convert the following page into MediaWiki format, adhering to the following guidelines:

1. **General Formatting**:
- Remove any "---" separators, as they can interfere with formatting.
- Convert any code blocks to use `` tags for MediaWiki formatting.
- Replace Markdown bold (`**text**`) with MediaWiki bold (`**text**`).

2. **Links**:
- Convert Markdown external links `[Text](Link)(http://example.com)` to MediaWiki external links: `[Link Text](http://example.com)` (add a space between the URL and the title).
- Convert Markdown internal links `[Text](Link)(/path/page_title.md)` to MediaWiki internal links: `[Text](Link)(/page-title)`.
- Convert File Links from markddown `![Text](Alt)(http://example.com/image.jpg)` to MediaWiki syntax: `[Text](alt=Alt)(/file-image-jpg)`.
- Remove .md from the end of any internallink.

3. **Images**:
- Replace Markdown image syntax `![Text](Alt)(http://example.com/image.jpg)` with MediaWiki syntax: `[Text](alt=Alt)(/file-image-jpg)`.

4. **Lists**:
- Convert unordered lists:
- Replace Markdown `- item` or `* item` with MediaWiki list syntax:
  - `* item`
  - `** subitem`
  - `*** sub-sub-item`
- Convert ordered lists:
- Replace Markdown `1. item` or `2. item` with MediaWiki list syntax:
  - `# item`
  - `## subitem`
  - `### sub-sub-item`

5. **Tables**:
- Replace Markdown table syntax with MediaWiki table syntax:
- Example Markdown:
```
| Header 1 | Header 2 |

| Row 1    | Data 1   |
```
- Example MediaWiki:
```
| **Header 1
| **Header 2

| Row 1
| Data 1

```

6. **References**:
- Add references for any links used on the page. Include them as basic MediaWiki references and ensure a `` tag is added at the bottom of the page.

7. **Special Characters**:
- Escape any special characters that may conflict with MediaWiki formatting by using `<nowiki>` tags where necessary.

8. **Categories**:
- Add appropriate categories to the page using MediaWiki category syntax: `[Name](Category:Category)(/category-category-name)`.

9. **Preservation of Content**:
- Ensure all original content is preserved in meaning and context.
- Maintain the integrity of the original text during conversion.

10. **Headers**:
- Convert Markdown headers (`# Header`, `## Subheader`) to MediaWiki headers:
**`== Header ==`
**`=== Subheader ===`

Apply these instructions to the provided content, ensuring that the final output complies with MediaWiki standards and preserves readability and accuracy.

```

