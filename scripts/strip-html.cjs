#!/usr/bin/env node
/**
 * Aggressively strip all HTML from markdown files for VitePress compatibility
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');

function stripHtml(filepath) {
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

  // Remove ALL HTML tags (opening and closing) - keep content between
  // This regex matches any HTML tag including attributes
  content = content.replace(/<\/?[a-zA-Z][^>]*>/g, '');

  // Remove HTML entities
  content = content.replace(/&lt;/g, '<');
  content = content.replace(/&gt;/g, '>');
  content = content.replace(/&amp;/g, '&');
  content = content.replace(/&nbsp;/g, ' ');
  content = content.replace(/&quot;/g, '"');

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
  console.log('Stripping HTML from markdown files...\n');

  let fixed = 0;
  let total = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    if (stripHtml(filepath)) {
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)}`);
      fixed++;
    }
  });

  console.log(`\nProcessed ${total} files, fixed ${fixed} files.`);
}

main();
