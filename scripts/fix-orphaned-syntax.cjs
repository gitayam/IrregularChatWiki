#!/usr/bin/env node
/**
 * Fix orphaned syntax and remaining MediaWiki artifacts
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = process.argv[2] || path.join(__dirname, '../docs');

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;

  // Preserve code blocks
  const codeBlocks = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // ============================================
  // FIX 1: Lines that are just orphaned brackets
  // ============================================
  content = content.replace(/^- \[\s*$/gm, '');
  content = content.replace(/^\[\s*$/gm, '');
  content = content.replace(/^\]\s*$/gm, '');

  // ============================================
  // FIX 2: Lines starting with [| or | (table remnants)
  // ============================================
  content = content.replace(/^\[\|[^\n]*$/gm, '');
  content = content.replace(/^\|\s*\+\s*$/gm, '');
  content = content.replace(/^\|\s*$/gm, '');

  // ============================================
  // FIX 3: Lines like "| [| text" (broken table)
  // ============================================
  content = content.replace(/^\|\s*\[\|\s*(.+)$/gm, '- $1');

  // ============================================
  // FIX 4: Category links at end
  // ============================================
  content = content.replace(/\[Tools\]\s*$/g, '');
  content = content.replace(/\[Source\]\s*$/g, '');
  content = content.replace(/\[Guides\]\s*$/g, '');
  content = content.replace(/\[:Category:[^\]]*\]\s*$/g, '');

  // ============================================
  // FIX 5: Multiple consecutive empty lines
  // ============================================
  content = content.replace(/\n{4,}/g, '\n\n');

  // ============================================
  // FIX 6: Fix [text](url))] pattern (extra bracket)
  // ============================================
  content = content.replace(/\]\(([^)]+)\)\)/g, ']($1)');

  // ============================================
  // FIX 7: Fix patterns like [URL text](URL)): -> [text](URL)
  // ============================================
  content = content.replace(/\[https?:\/\/[^\s\]]+\s+([^\]]+)\]\(([^)]+)\)\)/g, '[$1]($2)');

  // ============================================
  // FIX 8: Ensure blank line before headings
  // ============================================
  content = content.replace(/([^\n])\n(#{2,}\s)/g, '$1\n\n$2');

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    content = content.replace(`__CODE_BLOCK_${i}__`, block);
  });

  // Trim trailing whitespace
  content = content.replace(/[ \t]+$/gm, '');

  // Ensure file ends with single newline
  content = content.trimEnd() + '\n';

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
  console.log(`Fixing orphaned syntax in: ${DOCS_DIR}\n`);

  let total = 0;
  let filesFixed = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    if (fixFile(filepath)) {
      filesFixed++;
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)}`);
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${total}`);
  console.log(`Files modified: ${filesFixed}`);
}

main();
