#!/usr/bin/env node
/**
 * Comprehensive fix script for all VitePress/Vue markdown compatibility issues
 * Run this after converting from MediaWiki to fix common problems
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = process.argv[2] || path.join(__dirname, '../docs');

let totalFixed = 0;
let filesFixed = 0;

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;
  let fixes = [];

  // ============================================
  // STEP 1: Preserve code blocks and inline code
  // ============================================
  const codeBlocks = [];
  content = content.replace(/```[\s\S]*?```/g, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  const inlineCodes = [];
  content = content.replace(/`[^`]+`/g, (match) => {
    inlineCodes.push(match);
    return `__INLINE_CODE_${inlineCodes.length - 1}__`;
  });

  // ============================================
  // STEP 2: Fix MediaWiki templates {{ }}
  // Vue interprets these as JavaScript expressions
  // ============================================
  const templateCount = (content.match(/\{\{[^}]+\}\}/g) || []).length;
  if (templateCount > 0) {
    // Remove infobox templates entirely (they're complex and break Vue)
    content = content.replace(/\{\{Infobox[^}]*\}\}/gi, '');
    content = content.replace(/\{\{[Ss]-[^}]*\}\}/g, ''); // Navigation templates

    // Convert simple templates to text or remove
    content = content.replace(/\{\{([^}|]+)\}\}/g, ''); // Simple templates
    content = content.replace(/\{\{[^}]*\}\}/g, ''); // Complex templates
    fixes.push(`Removed ${templateCount} MediaWiki templates`);
  }

  // ============================================
  // STEP 3: Fix HTML tags that Vue tries to parse
  // ============================================

  // Remove <youtube> tags - convert to links
  content = content.replace(/<youtube>([^<]+)<\/youtube>/gi, (match, id) => {
    fixes.push('Converted youtube embed to link');
    return `[YouTube Video](https://www.youtube.com/watch?v=${id})`;
  });

  // Remove <pdf> tags
  content = content.replace(/<pdf>[^<]*<\/pdf>/gi, '');
  content = content.replace(/<\/pdf>/gi, '');

  // Remove <gallery> tags
  content = content.replace(/<gallery[^>]*>[\s\S]*?<\/gallery>/gi, '');

  // Remove <ref> tags (citations)
  content = content.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
  content = content.replace(/<ref[^>]*\/>/gi, '');
  content = content.replace(/<references\s*\/>/gi, '');

  // Remove <nowiki> tags but keep content
  content = content.replace(/<nowiki>([^<]*)<\/nowiki>/gi, '`$1`');

  // Fix <s> strikethrough tags - convert to ~~
  content = content.replace(/<s>([^<]*)<\/s>/gi, '~~$1~~');

  // Remove <small> tags but keep content
  content = content.replace(/<small>([^<]*)<\/small>/gi, '$1');

  // Remove <big> tags but keep content
  content = content.replace(/<big>([^<]*)<\/big>/gi, '$1');

  // Remove span tags with IDs (MediaWiki anchors)
  content = content.replace(/<span\s+id="[^"]*"\s*>\s*<\/span>/gi, '');
  content = content.replace(/<span\s+id="[^"]*">/gi, '');

  // Remove span tags with styles but keep content
  content = content.replace(/<span[^>]*>([^<]*)<\/span>/gi, '$1');
  // Handle multiline spans
  content = content.replace(/<span[^>]*>([\s\S]*?)<\/span>/gi, '$1');

  // Remove remaining unclosed span tags
  content = content.replace(/<span[^>]*>/gi, '');
  content = content.replace(/<\/span>/gi, '');

  // Fix HTML lists - convert to markdown
  content = content.replace(/<ol[^>]*>/gi, '\n');
  content = content.replace(/<\/ol>/gi, '\n');
  content = content.replace(/<ul[^>]*>/gi, '\n');
  content = content.replace(/<\/ul>/gi, '\n');
  content = content.replace(/<li[^>]*><p>/gi, '- ');
  content = content.replace(/<li[^>]*>/gi, '- ');
  content = content.replace(/<\/li>/gi, '');
  content = content.replace(/<\/p>/gi, '\n');
  content = content.replace(/<p>/gi, '\n');

  // Remove div tags
  content = content.replace(/<div[^>]*>/gi, '');
  content = content.replace(/<\/div>/gi, '');

  // Fix blockquotes
  content = content.replace(/<blockquote[^>]*>/gi, '> ');
  content = content.replace(/<\/blockquote>/gi, '');

  // Remove br tags
  content = content.replace(/<br\s*\/?>/gi, '\n');

  // Remove HTML comments (but preserve code block placeholders)
  content = content.replace(/<!--[\s\S]*?-->/g, '');

  // ============================================
  // STEP 4: Fix angle bracket placeholders
  // These look like <variable> and Vue interprets them as components
  // ============================================

  // Common placeholder patterns - escape with backticks
  const placeholderPatterns = [
    'Objective', 'Decision', 'Question', 'Problem', 'Variable',
    'container', 'service', 'user', 'host', 'port', 'ip', 'domain',
    'username', 'password', 'token', 'key', 'value', 'name', 'path',
    'VMID', 'PORT', 'ATTACK', 'YourUserName', 'your_', 'YOUR_'
  ];

  for (const pattern of placeholderPatterns) {
    const regex = new RegExp(`<(${pattern}[^>]*)>`, 'gi');
    content = content.replace(regex, '`<$1>`');
  }

  // Escape any remaining angle brackets that look like placeholders
  // (single word or hyphenated, not valid HTML)
  content = content.replace(/<([A-Z][a-zA-Z0-9_-]*)>/g, '`<$1>`');
  content = content.replace(/<([a-z][a-z0-9_-]*[A-Z][a-zA-Z0-9_-]*)>/g, '`<$1>`');

  // ============================================
  // STEP 5: Fix MediaWiki category links
  // ============================================
  content = content.replace(/\[\[Category:[^\]]+\]\]/gi, '');
  // Also fix broken category link format from conversion
  content = content.replace(/\[Category:[^\]]+\]\([^)]+\)/gi, '');

  // ============================================
  // STEP 6: Fix MediaWiki magic words
  // ============================================
  content = content.replace(/__[A-Z]+__/g, '');

  // ============================================
  // STEP 7: Fix broken MediaWiki link conversions
  // Pattern: [text](linkname](/actual-link) should be [text](/actual-link)
  // ============================================
  content = content.replace(/\[([^\]]+)\]\([^)]+\)\(([^)]+)\)/g, '[$1]($2)');

  // Fix File: links
  content = content.replace(/File:([^\s\]]+)/gi, '[File: $1](/file-$1)');

  // ============================================
  // STEP 8: Fix numbered list formatting from MediaWiki
  // Pattern: "1. Header" at start of line that should be "## Header"
  // ============================================
  content = content.replace(/^1\.\s+([A-Z][^\n]+)$/gm, '## $1');
  content = content.replace(/^\s+1\.\s+([A-Z][^\n]+)$/gm, '### $1');

  // ============================================
  // STEP 9: Fix table formatting
  // ============================================
  // Fix MediaWiki table cell separators
  content = content.replace(/\|\|/g, ' | ');
  content = content.replace(/!!/g, ' | ');

  // Fix colspan/rowspan in tables (remove, they break in markdown)
  content = content.replace(/\*\*colspan="[^"]*"\s*\|/g, '|');
  content = content.replace(/colspan="[^"]*"\s*\|/g, '|');
  content = content.replace(/rowspan="[^"]*"\s*\|/g, '|');

  // ============================================
  // STEP 10: Fix escaped angle brackets from previous fixes
  // ============================================
  content = content.replace(/\\\\</g, '`<');
  content = content.replace(/\\\\>/g, '>`');
  content = content.replace(/\\</g, '`<');
  content = content.replace(/\\>/g, '>`');

  // ============================================
  // STEP 11: Clean up
  // ============================================

  // Remove multiple consecutive blank lines
  content = content.replace(/\n{4,}/g, '\n\n\n');

  // Remove trailing whitespace
  content = content.replace(/[ \t]+$/gm, '');

  // ============================================
  // STEP 12: Restore code blocks and inline code
  // ============================================
  inlineCodes.forEach((code, i) => {
    content = content.replace(`__INLINE_CODE_${i}__`, code);
  });

  codeBlocks.forEach((block, i) => {
    content = content.replace(`__CODE_BLOCK_${i}__`, block);
  });

  // Write if changed
  if (content !== originalContent) {
    fs.writeFileSync(filepath, content);
    filesFixed++;
    totalFixed += fixes.length || 1;
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
  console.log(`Fixing VitePress compatibility issues in: ${DOCS_DIR}\n`);

  let total = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    if (fixFile(filepath)) {
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)}`);
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${total}`);
  console.log(`Files modified: ${filesFixed}`);
  console.log(`Total fixes applied: ${totalFixed}`);
}

main();
