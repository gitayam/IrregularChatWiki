#!/usr/bin/env node
/**
 * Add # title heading to all pages based on frontmatter title
 * This improves VitePress display and search functionality
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = process.argv[2] || path.join(__dirname, '../docs');

function toTitleCase(str) {
  // Convert kebab-case or snake_case to Title Case
  return str
    .replace(/[-_]/g, ' ')
    .replace(/\b\w/g, char => char.toUpperCase())
    .replace(/\s+/g, ' ')
    .trim();
}

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;

  // Check if file has frontmatter
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);

  if (!frontmatterMatch) {
    // No frontmatter - add title based on filename
    const filename = path.basename(filepath, '.md');
    const title = toTitleCase(filename);

    // Check if first line is already a heading
    if (content.trim().startsWith('# ')) {
      return { fixed: false, title: null };
    }

    // Add frontmatter and heading
    const newContent = `---\ntitle: "${title}"\n---\n\n# ${title}\n\n${content}`;
    fs.writeFileSync(filepath, newContent);
    return { fixed: true, title };
  }

  // Extract title from frontmatter
  const frontmatter = frontmatterMatch[1];
  const titleMatch = frontmatter.match(/title:\s*["']?([^"'\n]+)["']?/);

  if (!titleMatch) {
    // No title in frontmatter - derive from filename
    const filename = path.basename(filepath, '.md');
    const title = toTitleCase(filename);

    // Add title to frontmatter
    const newFrontmatter = `title: "${title}"\n${frontmatter}`;
    content = content.replace(/^---\n([\s\S]*?)\n---/, `---\n${newFrontmatter}\n---`);
  }

  // Re-extract title after potential addition
  const updatedTitleMatch = content.match(/title:\s*["']?([^"'\n]+)["']?/);
  const title = updatedTitleMatch ? updatedTitleMatch[1].trim() : toTitleCase(path.basename(filepath, '.md'));

  // Get content after frontmatter
  const afterFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n*/, '');

  // Check if there's already an h1 heading
  const hasH1 = afterFrontmatter.trim().match(/^#\s+[^\n]+/);

  if (hasH1) {
    // Already has h1, don't add another
    return { fixed: false, title: null };
  }

  // Add the h1 heading after frontmatter
  const frontmatterEnd = content.indexOf('---', 4) + 3;
  const beforeContent = content.substring(0, frontmatterEnd);
  const afterContent = content.substring(frontmatterEnd).replace(/^\n*/, '');

  const newContent = `${beforeContent}\n\n# ${title}\n\n${afterContent}`;

  if (newContent !== originalContent) {
    fs.writeFileSync(filepath, newContent);
    return { fixed: true, title };
  }

  return { fixed: false, title: null };
}

function walkDir(dir, callback) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      walkDir(filepath, callback);
    } else if (file.endsWith('.md')) {
      callback(filepath);
    }
  }
}

function main() {
  console.log(`Adding title headings in: ${DOCS_DIR}\n`);

  let total = 0;
  let filesFixed = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    const result = fixFile(filepath);
    if (result.fixed) {
      filesFixed++;
      console.log(`Added heading: ${path.relative(DOCS_DIR, filepath)} -> "${result.title}"`);
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${total}`);
  console.log(`Files modified: ${filesFixed}`);
}

main();
