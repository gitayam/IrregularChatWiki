#!/usr/bin/env node
/**
 * Escape all angle brackets outside code blocks to prevent Vue parsing issues
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');

function escapeAngles(filepath) {
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

  // Escape all angle brackets that look like placeholders (not in URLs)
  // Match <something> where something is not a URL protocol
  content = content.replace(/<([^>\/][^>]*)>/g, (match, inner) => {
    // Skip if it's a URL (http://, https://, mailto:, etc.)
    if (/^(https?|mailto|ftp):\/\//.test(inner)) {
      return match;
    }
    // Skip if it's an HTML comment
    if (inner.startsWith('!--')) {
      return match;
    }
    // Escape everything else
    return `\\<${inner}\\>`;
  });

  // Also escape unclosed angle brackets
  content = content.replace(/<([a-zA-Z_][a-zA-Z0-9_-]*)(?![>])/g, '\\<$1');

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
  console.log('Escaping angle brackets in markdown files...\n');

  let fixed = 0;
  let total = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    if (escapeAngles(filepath)) {
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)}`);
      fixed++;
    }
  });

  console.log(`\nProcessed ${total} files, fixed ${fixed} files.`);
}

main();
