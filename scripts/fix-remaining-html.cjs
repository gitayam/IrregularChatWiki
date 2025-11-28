#!/usr/bin/env node
/**
 * Final aggressive HTML cleanup for VitePress compatibility
 * Removes ALL remaining HTML that causes Vue parsing issues
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = process.argv[2] || path.join(__dirname, '../docs');

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;

  // Preserve code blocks first (triple backticks only)
  const codeBlocks = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Preserve inline code
  const inlineCodes = [];
  content = content.replace(/`[^`]+`/g, (match) => {
    inlineCodes.push(match);
    return `__INLINE_CODE_${inlineCodes.length - 1}__`;
  });

  // Convert <pre class="...">content</pre> to code blocks
  content = content.replace(/<pre[^>]*>([\s\S]*?)<\/pre>/gi, (match, inner) => {
    return '```\n' + inner.trim() + '\n```';
  });

  // Remove orphaned </pre> tags
  content = content.replace(/<\/pre>/gi, '');

  // Remove orphaned <pre> tags
  content = content.replace(/<pre[^>]*>/gi, '```\n');

  // Remove iframe tags completely
  content = content.replace(/<iframe[\s\S]*?<\/iframe>/gi, '');
  content = content.replace(/<\/iframe>/gi, '');
  content = content.replace(/<iframe[^>]*>/gi, '');

  // Remove ref tags (MediaWiki citations)
  content = content.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
  content = content.replace(/<ref[^>]*\/>/gi, '');
  content = content.replace(/<\/ref>/gi, '');

  // Remove references tag
  content = content.replace(/<references\s*\/?>/gi, '');
  content = content.replace(/<\/references>/gi, '');

  // Remove gallery tags
  content = content.replace(/<gallery[\s\S]*?<\/gallery>/gi, '');

  // Remove toc tags
  content = content.replace(/<toc><\/toc>/gi, '');
  content = content.replace(/<pre class="toc"><\/pre>/gi, '');

  // Remove any remaining HTML tags that might cause issues
  // Match opening tags with attributes
  content = content.replace(/<(pre|div|span|iframe|gallery|ref|references|toc|small|big|center|font|u|s)[^>]*>/gi, '');
  // Match closing tags
  content = content.replace(/<\/(pre|div|span|iframe|gallery|ref|references|toc|small|big|center|font|u|s)>/gi, '');

  // Fix broken category links at end of files
  content = content.replace(/\)?\(\/category-[^)]+\)/g, '');
  content = content.replace(/\[Category:[^\]]+\]/gi, '');

  // Clean up multiple blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  // Restore inline code
  inlineCodes.forEach((code, i) => {
    content = content.replace(`__INLINE_CODE_${i}__`, code);
  });

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    content = content.replace(`__CODE_BLOCK_${i}__`, block);
  });

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content);
    return true;
  }
  return false;
}

function walkDir(dir, callback) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

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
  console.log(`Final HTML cleanup in: ${DOCS_DIR}\n`);

  let total = 0;
  let fixed = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    if (fixFile(filepath)) {
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)}`);
      fixed++;
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${total}`);
  console.log(`Files modified: ${fixed}`);
}

main();
