#!/usr/bin/env node
/**
 * Fix links to renamed files (old-name.md -> index.md)
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
  // FIX 1: Links to old filename (now renamed to index.md)
  // /category/category -> /category/
  // ============================================
  const renamedPatterns = [
    [/\]\(\/research\/research\)/g, '](/research/)'],
    [/\]\(\/server-guides\/server-guides\)/g, '](/server-guides/)'],
    [/\]\(\/cybersecurity\/cybersecurity\)/g, '](/cybersecurity/)'],
    [/\]\(\/matrix\/matrix\)/g, '](/matrix/)'],
    [/\]\(\/ai-ml\/ai-ml\)/g, '](/ai-ml/)'],
    [/\]\(\/community\/community\)/g, '](/community/)'],
    [/\]\(\/privacy\/privacy\)/g, '](/privacy/)'],
    [/\]\(\/radio\/radio\)/g, '](/radio/)'],
    [/\]\(\/infrastructure\/infrastructure\)/g, '](/infrastructure/)'],
    [/\]\(\/general\/general\)/g, '](/general/)'],
  ];

  for (const [pattern, replacement] of renamedPatterns) {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      fixes.push(`Fixed renamed link`);
    }
  }

  // ============================================
  // FIX 2: Remaining ./ patterns
  // ============================================
  // ./Secure, ./Device, ./Thread, ./Space, ./Notification
  content = content.replace(/\[([^\]]+)\]\(\.\/(Secure|Device|Thread|Space|Notification)\)/gi, (match, text) => {
    fixes.push(`Fixed ./word pattern`);
    return `**${text}**`;
  });

  // ./@%5D
  content = content.replace(/\[([^\]]*)\]\(\.\/@%5D\)/gi, (match, text) => {
    fixes.push(`Fixed @%5D pattern`);
    return text;
  });

  // ./1%5D
  content = content.replace(/\[([^\]]*)\]\(\.\/1%5D\)/gi, (match, text) => {
    fixes.push(`Fixed 1%5D pattern`);
    return text;
  });

  // ./research-datasets%7C... and ./datasets%7C...
  content = content.replace(/\[([^\]]+)\]\(\.\/(research-)?datasets%7C[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed datasets pipe pattern`);
    return `[${text}](/research/research-datasets)`;
  });

  // ./invalid
  content = content.replace(/\[([^\]]*)\]\(\.\/invalid\)/gi, (match, text) => {
    fixes.push(`Fixed invalid pattern`);
    return text;
  });

  // ./%E2%80%A6add (encoded ellipsis)
  content = content.replace(/\[([^\]]*)\]\(\.\/%E2%80%A6[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed encoded ellipsis pattern`);
    return text;
  });

  // ./here%5D
  content = content.replace(/\[([^\]]*)\]\(\.\/here%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed here%5D pattern`);
    return text;
  });

  // ./Install%5D
  content = content.replace(/\[([^\]]*)\]\(\.\/Install%5D\)/gi, (match, text) => {
    fixes.push(`Fixed Install%5D pattern`);
    return `**${text}**`;
  });

  // ./SANS
  content = content.replace(/\[([^\]]+)\]\(\.\/SANS\)/gi, (match, text) => {
    fixes.push(`Fixed SANS pattern`);
    return `[${text}](https://www.sans.org)`;
  });

  // ./I%5Dncreasingly
  content = content.replace(/\[([^\]]*)\]\(\.\/I%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed I%5D pattern`);
    return text;
  });

  // https://localhost:9443
  content = content.replace(/\]\(https:\/\/localhost:[0-9]+\)/gi, '](#local-dashboard)');

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
  console.log(`Fix renamed links in: ${DOCS_DIR}\n`);

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
