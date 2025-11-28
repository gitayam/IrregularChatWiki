#!/usr/bin/env node
/**
 * Fix markdown formatting issues from MediaWiki conversion:
 * - Indented numbered lists (   1. -> 1.)
 * - MediaWiki list syntax ('' -> -, *'' -> *)
 * - Broken table syntax
 * - Orphaned brackets
 * - Missing newlines before/after lists
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = process.argv[2] || path.join(__dirname, '../docs');

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;
  let fixes = [];

  // Preserve code blocks
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

  // ============================================
  // FIX 1: Indented numbered lists
  // "   1." at start of line -> "1."
  // ============================================
  if (content.match(/^\s{2,}\d+\./m)) {
    content = content.replace(/^(\s{2,})(\d+\.)/gm, '$2');
    fixes.push('Fixed indented numbered lists');
  }

  // ============================================
  // FIX 2: MediaWiki list syntax '' -> bullet
  // Lines starting with '' should be bullets
  // ============================================
  // Pattern: '' text -> - text
  if (content.match(/^''\s/m)) {
    content = content.replace(/^''\s*/gm, '- ');
    fixes.push('Fixed MediaWiki list syntax (\'\')');
  }

  // Pattern: *'' text -> * text
  if (content.match(/^\*''\s/m)) {
    content = content.replace(/^\*''\s*/gm, '* ');
    fixes.push('Fixed MediaWiki list syntax (*\'\')');
  }

  // Pattern: - '' text -> - text
  content = content.replace(/^-\s*''\s*/gm, '- ');

  // ============================================
  // FIX 3: Orphaned brackets and broken syntax
  // ============================================
  // Remove lines that are just brackets
  content = content.replace(/^\[\s*$/gm, '');
  content = content.replace(/^\]\s*$/gm, '');

  // Remove [Team] placeholders
  content = content.replace(/\[Team\]\s*/g, '');

  // Remove [| and |] table artifacts
  content = content.replace(/^\[\|\s*$/gm, '');
  content = content.replace(/^\|\]\s*$/gm, '');
  content = content.replace(/^\|\s*\+\s*$/gm, '');

  // ============================================
  // FIX 4: Fix broken table rows
  // | ** -> | **
  // ============================================
  content = content.replace(/^\|\s*\*\*([^|]+)\*\*\s*$/gm, '**$1**');

  // ============================================
  // FIX 5: MediaWiki bold/italic cleanup
  // '''text''' should be **text**
  // ''text'' should be *text*
  // ============================================
  content = content.replace(/'''([^']+)'''/g, '**$1**');
  content = content.replace(/''([^']+)''/g, '*$1*');

  // ============================================
  // FIX 6: Fix line starting with | (table remnants)
  // ============================================
  // Lines that are just | Category or | Context
  content = content.replace(/^\|\s*\*\*Category\s*$/gm, '**Category**');
  content = content.replace(/^\|\s*\*\*Context\s*$/gm, '**Context**');

  // ============================================
  // FIX 7: Ensure blank line before lists
  // ============================================
  // Text followed immediately by list item needs blank line
  content = content.replace(/([^\n])\n([-*]\s)/g, '$1\n\n$2');
  content = content.replace(/([^\n])\n(\d+\.\s)/g, '$1\n\n$2');

  // ============================================
  // FIX 8: Remove Category tags at end of files
  // ============================================
  content = content.replace(/\[:Category:[^\]]+\]\s*$/g, '');
  content = content.replace(/\[Category:[^\]]+\]\s*$/g, '');

  // ============================================
  // FIX 9: Clean up multiple consecutive blank lines
  // ============================================
  content = content.replace(/\n{4,}/g, '\n\n\n');

  // ============================================
  // FIX 10: Fix lines starting with pipe remnants
  // ============================================
  content = content.replace(/^\|\s*$/gm, '');

  // Restore inline code
  inlineCodes.forEach((code, i) => {
    content = content.replace(`__INLINE_CODE_${i}__`, code);
  });

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    content = content.replace(`__CODE_BLOCK_${i}__`, block);
  });

  // Final cleanup - remove trailing whitespace on lines
  content = content.replace(/[ \t]+$/gm, '');

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content);
    return { fixed: true, count: fixes.length, fixes };
  }
  return { fixed: false, count: 0, fixes: [] };
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
  console.log(`Fixing markdown formatting in: ${DOCS_DIR}\n`);

  let total = 0;
  let filesFixed = 0;
  let totalFixes = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    const result = fixFile(filepath);
    if (result.fixed) {
      filesFixed++;
      totalFixes += result.count;
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)} (${result.fixes.join(', ') || 'formatting'})`);
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${total}`);
  console.log(`Files modified: ${filesFixed}`);
}

main();
