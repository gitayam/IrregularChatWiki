#!/usr/bin/env node
/**
 * Comprehensive fix for MediaWiki -> VitePress markdown conversion issues
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;

  // Preserve code blocks first
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

  // Fix numbered list formatting: "   1. Header" at start of line -> "## Header"
  content = content.replace(/^1\.\s+(.+)$/gm, '## $1');
  content = content.replace(/^\s+1\.\s+(.+)$/gm, '### $1');

  // Remove span tags with IDs (MediaWiki anchors)
  content = content.replace(/<span\s+id="[^"]*"\s*>\s*<\/span>/gi, '');
  content = content.replace(/<span\s+id="[^"]*">/gi, '');

  // Convert span tags with styles to text (remove span but keep content)
  content = content.replace(/<span[^>]*>([^<]*(?:<(?!\/span>)[^<]*)*)<\/span>/gi, '$1');

  // Remove any remaining unclosed span tags
  content = content.replace(/<span[^>]*>/gi, '');
  content = content.replace(/<\/span>/gi, '');

  // Fix MediaWiki table syntax: || -> | and !! -> |
  content = content.replace(/\|\|/g, '|');
  content = content.replace(/!!/g, '|');

  // Remove HTML ordered/unordered lists - convert to markdown
  content = content.replace(/<ol[^>]*>/gi, '');
  content = content.replace(/<\/ol>/gi, '');
  content = content.replace(/<ul[^>]*>/gi, '');
  content = content.replace(/<\/ul>/gi, '');
  content = content.replace(/<li[^>]*><p>/gi, '- ');
  content = content.replace(/<li[^>]*>/gi, '- ');
  content = content.replace(/<\/li>/gi, '');
  content = content.replace(/<\/p>/gi, '\n');
  content = content.replace(/<p>/gi, '\n');

  // Remove <pre> tags (content should already be in code blocks)
  content = content.replace(/<pre[^>]*>/gi, '```\n');
  content = content.replace(/<\/pre>/gi, '\n```');

  // Remove div tags
  content = content.replace(/<div[^>]*>/gi, '');
  content = content.replace(/<\/div>/gi, '');

  // Remove br tags
  content = content.replace(/<br\s*\/?>/gi, '\n');

  // Remove comments
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  // Fix double asterisks that became single (bold formatting)
  content = content.replace(/^''\s*/gm, '- ');

  // Remove any remaining problematic HTML tags (but keep their content)
  content = content.replace(/<blockquote[^>]*>/gi, '> ');
  content = content.replace(/<\/blockquote>/gi, '');

  // Clean up multiple blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  // Escape any remaining angle brackets that look like placeholders (but not HTML)
  // This needs to be done carefully to not break valid markdown
  content = content.replace(/<([a-z_][a-z0-9_-]*)>/gi, (match, inner) => {
    // Skip if it looks like a valid HTML tag
    const validTags = ['div', 'span', 'p', 'a', 'img', 'br', 'hr', 'ul', 'ol', 'li',
                       'table', 'tr', 'td', 'th', 'thead', 'tbody', 'iframe', 'script',
                       'style', 'pre', 'code', 'blockquote', 'h1', 'h2', 'h3', 'h4',
                       'h5', 'h6', 'strong', 'em', 'b', 'i', 'u', 'details', 'summary',
                       'sup', 'sub', 'del', 'ins', 'source', 'video', 'audio'];
    if (validTags.includes(inner.toLowerCase())) {
      return match;
    }
    // Escape placeholder-style tags
    return `\`<${inner}>\``;
  });

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
  console.log('Fixing all markdown files for VitePress compatibility...\n');

  let fixed = 0;
  let total = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    if (fixFile(filepath)) {
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)}`);
      fixed++;
    }
  });

  console.log(`\nProcessed ${total} files, fixed ${fixed} files.`);
}

main();
