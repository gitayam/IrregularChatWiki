#!/usr/bin/env node
/**
 * Fix template placeholder patterns that VitePress interprets as links
 * Patterns like [TEXT](RANK), [TEXT](A/N), [TEXT](UNIT), etc.
 * Should become **[TEXT]** or similar
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
  // FIX 1: Template placeholder patterns without ./
  // [text](RANK) -> **[text]**
  // [text](A/N) -> **[text]**
  // etc.
  // ============================================
  const placeholderPatterns = [
    // Simple uppercase placeholders
    'RANK', 'UNIT', 'NAME', 'NUMBER', 'COUNTRY', 'GROUP', 'TASK',
    'CROSS', 'EXERCISE', 'LABEL', 'USSOF',
    // Patterns with special chars
    'A\\/N',
    'HIS\\/HER',
    'HIM\\/HER',
    'ACHIEVEMENT\\/SERVICE',
    // Encoded patterns
    'HIS\\/HER%5D',
    'HIM\\/HER%5D',
    'ACHIEVEMENT\\/SERVICE%5D',
    'NAME%5D',
    'NUMBER%5D',
    'INSTALL%5D',
    // Other patterns
    'PSYOP',
    'SANS',
    'Briefly',
    'Describe',
    'Explain',
    'Detail',
    'Secure',
    'Device',
    'Thread',
    'Space',
    'Notification',
  ];

  for (const placeholder of placeholderPatterns) {
    // Pattern: [text](PLACEHOLDER) or [text](PLACEHOLDER])
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(${placeholder}\\]?\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, (match, text) => {
        fixes.push(`Fixed placeholder: ${placeholder}`);
        // Keep the text, remove the broken link
        return `**[${text}]**`;
      });
    }
  }

  // ============================================
  // FIX 2: Fix patterns like [text](./PLACEHOLDER)
  // ============================================
  content = content.replace(/\[([^\]]+)\]\(\.\/(RANK|UNIT|NAME|NUMBER|A\/N|HIS\/HER|HIM\/HER|ACHIEVEMENT\/SERVICE|PSYOP|SANS|Briefly|Describe|Explain|Detail|Secure|Device|Thread|Space|Notification)[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed ./placeholder pattern`);
    return `**[${text}]**`;
  });

  // ============================================
  // FIX 3: Fix encoded patterns like [text](./%E2...)
  // ============================================
  content = content.replace(/\[([^\]]+)\]\(\.\/%E2[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed encoded pattern`);
    return text;
  });

  // ============================================
  // FIX 4: Fix patterns with %5D (encoded ])
  // ============================================
  content = content.replace(/\[([^\]]+)\]\([^)]*%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed %5D pattern`);
    return `**[${text}]**`;
  });

  // ============================================
  // FIX 5: Fix patterns like [text](./500px...)
  // ============================================
  content = content.replace(/\[([^\]]+)\]\(\.\/\d+px[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed image size pattern`);
    return text;
  });

  // ============================================
  // FIX 6: Fix ./@ patterns
  // ============================================
  content = content.replace(/\[([^\]]+)\]\(\.\/@[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed @ pattern`);
    return text;
  });

  // ============================================
  // FIX 7: Fix ./invalid and ./here patterns
  // ============================================
  content = content.replace(/\[([^\]]+)\]\(\.\/(invalid|here)[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed invalid/here pattern`);
    return text;
  });

  // ============================================
  // FIX 8: Fix /category/index patterns
  // ============================================
  content = content.replace(/\]\(\/server-guides\/index\)/g, '](/server-guides/)');
  content = content.replace(/\]\(\/research\/index\)/g, '](/research/)');
  content = content.replace(/\]\(\/cybersecurity\/index\)/g, '](/cybersecurity/)');
  content = content.replace(/\]\(\/ai-ml\/index\)/g, '](/ai-ml/)');
  content = content.replace(/\]\(\/community\/index\)/g, '](/community/)');
  content = content.replace(/\]\(\/infrastructure\/postgres_system\)/g, '](#postgres-system)');
  content = content.replace(/\]\(https:\/\/localhost[^)]*\)/g, '](#)');

  // ============================================
  // FIX 9: Fix pipe patterns in links
  // ============================================
  content = content.replace(/\[([^\]]+)\]\([^)]*%7C[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed pipe pattern`);
    return `[${text}](/research/research-datasets)`;
  });

  // ============================================
  // FIX 10: Fix patterns like [text](I%5D...) - starts with encoded
  // ============================================
  content = content.replace(/\[([^\]]+)\]\(\.\/I%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Fixed encoded I pattern`);
    return text;
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
  console.log(`Fix template placeholders in: ${DOCS_DIR}\n`);

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
