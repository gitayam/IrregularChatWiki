#!/usr/bin/env node
/**
 * Fix broken nested link patterns from MediaWiki conversion
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
  // FIX 1: Broken nested link patterns
  // [text [innertext](/path1))(/path2)
  // Should become: [text innertext](/path1)
  // ============================================
  content = content.replace(/\[([^\[\]]*)\[([^\]]+)\]\(([^)]+)\)\)\(([^)]+)\)/g, (match, outer, inner, path1, path2) => {
    fixes.push(`Fixed nested link: ${match.substring(0, 50)}`);
    return `[${outer}${inner}](${path1})`;
  });

  // ============================================
  // FIX 2: Pattern like: [text](/path/))(text2
  // Extra closing paren after link
  // ============================================
  content = content.replace(/\]\(([^)]+)\)\)\(/g, (match, path) => {
    fixes.push(`Fixed extra paren after link`);
    return `](${path}) (`;
  });

  // ============================================
  // FIX 3: Pattern [text](./UPPERCASE) - relative placeholder
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.\/(RANK|HIS|HER|A\/N|UNIT|NAME|PSYOP|NUMBER|ACHIEVEMENT|SERVICE|Briefly|Describe|Explain|Detail|Secure|Device|Thread|Space|Notification|SANS|Install|NUMBER)[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed relative placeholder`);
    return text ? `**${text}**` : '**[VALUE]**';
  });

  // ============================================
  // FIX 4: Pattern ./anything%5D (encoded bracket)
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.[^)]*%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed encoded bracket link`);
    return text || '';
  });

  // ============================================
  // FIX 5: Pattern ./500px (image size)
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.\/500px[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed image size link`);
    return text || '';
  });

  // ============================================
  // FIX 6: Pattern ./%E2 (encoded ellipsis etc)
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.\/%E2[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed encoded special char link`);
    return text || '';
  });

  // ============================================
  // FIX 7: Pattern ./@%5D (encoded @])
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.\/@[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed @ pattern link`);
    return text || '';
  });

  // ============================================
  // FIX 8: Pattern ./invalid or ./here
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.\/(invalid|here)[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed invalid/here link`);
    return text || '';
  });

  // ============================================
  // FIX 9: Pattern ./datasets|something (pipe in path)
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.\/[^)]*%7C[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed pipe pattern link`);
    return text ? `[${text}](/research/research-datasets)` : '';
  });

  // ============================================
  // FIX 10: Specific absolute link mappings
  // ============================================
  const absoluteMappings = [
    [/\]\(\/server-guides\/index\)/g, '](/server-guides/)'],
    [/\]\(\/research\/index\)/g, '](/research/)'],
    [/\]\(\/cybersecurity\/index\)/g, '](/cybersecurity/)'],
    [/\]\(\/ai-ml\/index\)/g, '](/ai-ml/)'],
    [/\]\(\/community\/index\)/g, '](/community/)'],
    [/\]\(\/infrastructure\/postgres_system\)/g, '](#postgres-system)'],
    [/\]\(https:\/\/localhost[^)]*\)/g, '](#)'],
  ];

  for (const [pattern, replacement] of absoluteMappings) {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      fixes.push(`Fixed absolute link`);
    }
  }

  // Clean multiple blank lines
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
    return { fixed: true, count: fixes.length };
  }
  return { fixed: false, count: 0 };
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
  console.log(`Fix nested links in: ${DOCS_DIR}\n`);

  let total = 0;
  let filesFixed = 0;
  let totalFixes = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    const result = fixFile(filepath);
    if (result.fixed) {
      filesFixed++;
      totalFixes += result.count;
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)} (${result.count} fixes)`);
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${total}`);
  console.log(`Files modified: ${filesFixed}`);
  console.log(`Total fixes applied: ${totalFixes}`);
}

main();
