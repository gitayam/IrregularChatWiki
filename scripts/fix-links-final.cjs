#!/usr/bin/env node
/**
 * Final pass link fixes - aggressive cleanup of all remaining issues
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
  // FIX 1: All /category/index patterns
  // ============================================
  const indexPatterns = [
    [/\]\(\/server-guides\/index\)/g, '](/server-guides/)'],
    [/\]\(\/research\/index\)/g, '](/research/)'],
    [/\]\(\/cybersecurity\/index\)/g, '](/cybersecurity/)'],
    [/\]\(\/ai-ml\/index\)/g, '](/ai-ml/)'],
    [/\]\(\/community\/index\)/g, '](/community/)'],
    [/\]\(\/matrix\/index\)/g, '](/matrix/)'],
    [/\]\(\/radio\/index\)/g, '](/radio/)'],
    [/\]\(\/privacy\/index\)/g, '](/privacy/)'],
    [/\]\(\/general\/index\)/g, '](/general/)'],
    [/\]\(\/infrastructure\/index\)/g, '](/infrastructure/)'],
  ];

  for (const [pattern, replacement] of indexPatterns) {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      fixes.push(`Fixed /index link`);
    }
  }

  // ============================================
  // FIX 2: ALL relative placeholder patterns (./SOMETHING)
  // ============================================
  // Pattern: [anything](./ANYTHING) where path starts with uppercase or has encoded chars
  content = content.replace(/\[([^\]]*)\]\(\.\/(RANK|HIS|A\/N|UNIT|NAME|PSYOP|NUMBER|ACHIEVEMENT|Briefly|Describe|Explain|Detail|Secure|Device|Thread|Space|Notification|SANS|Install)[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed placeholder pattern`);
    if (text) {
      return `**${text}**`;
    }
    return '';
  });

  // Pattern: anything with %5D (encoded ])
  content = content.replace(/\[([^\]]*)\]\(\.[^)]*%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed encoded bracket pattern`);
    return text || '';
  });

  // Pattern: ./500px (image size placeholders)
  content = content.replace(/\[([^\]]*)\]\(\.\/500px[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed image size pattern`);
    return text || '';
  });

  // Pattern: ./%E2 (ellipsis and other encoded chars)
  content = content.replace(/\[([^\]]*)\]\(\.\/%E2[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed encoded char pattern`);
    return text || '';
  });

  // Pattern: ./@ patterns
  content = content.replace(/\[([^\]]*)\]\(\.\/@[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed @ pattern`);
    return text || '';
  });

  // Pattern: ./invalid or ./here
  content = content.replace(/\[([^\]]*)\]\(\.\/(invalid|here)[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed invalid/here pattern`);
    return text || '';
  });

  // Pattern: ./research-datasets|public (pipe in path)
  content = content.replace(/\[([^\]]*)\]\(\.\/[^)]*%7C[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed pipe pattern`);
    return text ? `[${text}](/research/research-datasets)` : '';
  });

  // ============================================
  // FIX 3: Remaining absolute broken links
  // ============================================
  const brokenAbsolute = [
    [/\]\(https:\/\/localhost[^)]+\)/g, '](#)'],
    [/\]\(\/irregularknowledge-meetup-matrix-org\)/g, '](https://matrix.to/#/#irregularknowledge:meetup.matrix.org)'],
    [/\]\(\/infrastructure\/postgres_system\)/g, '](#postgres-system)'],
    [/\]\(\/more-20llm-20basics\)/g, '](#more-llm-basics)'],
    [/\]\(\/llm-knowledge-management-assistants\)/g, '](#knowledge-management)'],
    [/\]\(\/human-20oversight-20in-20ai-20applications\)/g, '](#human-oversight)'],
    [/\]\(\/getting-20started-20for-20new-20users\)/g, '](#getting-started)'],
    [/\]\(\/challenges-20in-20document-20summarization\)/g, '](#challenges)'],
    [/\]\(\/benefits-20of-20deploying-20at-20the-20edge\)/g, '](#benefits)'],
  ];

  for (const [pattern, replacement] of brokenAbsolute) {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      fixes.push(`Fixed absolute broken link`);
    }
  }

  // ============================================
  // FIX 4: Catch-all for remaining ./UPPERCASE patterns
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\.\/[A-Z][A-Z0-9\/%-]*\)/g, (match, text) => {
    fixes.push(`Removed remaining uppercase placeholder`);
    return text ? `**${text}**` : '';
  });

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
  console.log(`Final pass link fixes in: ${DOCS_DIR}\n`);

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
