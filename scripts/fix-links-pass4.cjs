#!/usr/bin/env node
/**
 * Fourth pass link fixes - final cleanup
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
  // FIX 1: Fix /category/index -> /category/
  // ============================================
  content = content.replace(/\](\(\/[a-z-]+)\/index\)/g, (match, path) => {
    fixes.push(`Index link: ${path}/index -> ${path}/`);
    return `](${path.substring(1)}/)`;
  });

  // ============================================
  // FIX 2: ALL remaining placeholder patterns with different regex
  // ============================================
  // Pattern: [text](./SOMETHING) where SOMETHING is uppercase or placeholder
  content = content.replace(/\[([^\]]*)\]\(\.\/[A-Z][A-Z\/]*[^)]*\)/g, (match, text) => {
    fixes.push(`Removed placeholder: ${match.substring(0, 40)}`);
    return text ? `**[${text.toUpperCase()}]**` : '';
  });

  // Pattern: [text](./Something%5D...) - encoded brackets
  content = content.replace(/\[([^\]]*)\]\(\.\/.+%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed encoded placeholder`);
    return text || '';
  });

  // Pattern: [text](./%E2...) - other encoded
  content = content.replace(/\[([^\]]*)\]\(\.\/%[A-F0-9]{2}[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed encoded placeholder`);
    return text || '';
  });

  // Pattern: [text](./500px...) - image placeholders
  content = content.replace(/\[([^\]]*)\]\(\.\/\d+px[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed image placeholder`);
    return text || '';
  });

  // Pattern: [text](./here%5D...) - malformed
  content = content.replace(/\[([^\]]*)\]\(\.\/here%5D[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed malformed link`);
    return text || '';
  });

  // ============================================
  // FIX 3: More specific path mappings that DO exist
  // ============================================
  const validMappings = {
    '/server-guides/index': '/server-guides/',
    '/research/index': '/research/',
    '/cybersecurity/index': '/cybersecurity/',
    '/ai-ml/index': '/ai-ml/',
    '/general/secure-your-online-accounts': '/cybersecurity/cyber-incident-response-guide-personal',
    '/general/secure-your-local-devices': '/cybersecurity/cyber-incident-response-guide-personal',
    '/general/secure-your-devices': '/cybersecurity/cyber-incident-response-guide-personal',
    '/cybersecurity/ewpt': '/cybersecurity/cyber-red-teaming',
    '/server-guides/cryptpad-server': '/server-guides/setting-up-cryptpad-server',
    '/server-guides/cloud-instance-setup': '/server-guides/linux-server-initial-setup',
    '/infrastructure/postgres_system': '/infrastructure/postgres_system',
    '/mobile-hardening': '/cybersecurity/cyber-incident-response-guide-personal',
    '/mobile-hardening-recommended-applications-for-security-and-privacy': '/cybersecurity/cyber-incident-response-guide-personal',
    '/ai-ml/signal-prompts': '/ai-ml/ai-prompting',
    '/ai-ml/running-llms-on-edge-devices': '/ai-ml/pi-llm',
    '/ai-ml/recommended-hardware-for-llms': '/ai-ml/pi-llm',
    '/general/target-audience-analysis': '/general/pmesii-pt',
    '/general/knowledge-management': '/ai-ml/ai-resources',
    '/general/leaders-guide': '/general/admin',
    '/general/operating-conditions': '/general/admin',
    '/general/counters': '/general/admin',
    '/monero-md': '/privacy/monero',
    '/certifications-md': '/general/certifications',
    '/admin-md': '/general/admin',
    '/ai-ml-md': '/ai-ml/',
    '/ai-ml-resources': '/ai-ml/ai-resources',
    '/ceh-certification': '/general/certifications',
    '/reading-lists': '/general/learning',
    '/quick-dfp': '/general/quick-dfp-guide',
    '/psyop-branch': '/general/series-packet',
    '/community': '/community/',
    '/cloud': '/server-guides/',
    '/prevention': '#prevention',
    '/monitor': '#monitor',
    '/identify-and-lock-down': '#identify-and-lock-down',
    '/log-file-analysis': '#log-file-analysis',
    '/primary-ta-1': '#primary-ta',
    '/q-a-20section': '#qa-section',
    '/ml-section': '#ml-section',
  };

  for (const [from, to] of Object.entries(validMappings)) {
    const regex = new RegExp(`\\]\\(${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `](${to})`);
      fixes.push(`Mapped: ${from} -> ${to}`);
    }
  }

  // ============================================
  // FIX 4: Remove references to -md suffix pages
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\/[a-z0-9-]+-md\)/gi, (match, text) => {
    fixes.push(`Removed -md link`);
    return text || '';
  });

  // ============================================
  // FIX 5: Remove broken file/image links
  // ============================================
  const brokenPatterns = [
    /\[([^\]]*)\]\(\/[a-z0-9-]+-png\)/gi,
    /\[([^\]]*)\]\(\/[a-z0-9-]+-jpg\)/gi,
    /\[([^\]]*)\]\(\/[a-z0-9-]+-pdf\)/gi,
    /\[([^\]]*)\]\(https:\/\/localhost[^)]+\)/gi,
    /\[([^\]]*)\]\(\/[a-z0-9]+-irregularchat-com\)/gi,
    /\[([^\]]*)\]\(\/[a-z0-9]+-matrix-org\)/gi,
    /\[([^\]]*)\]\(\/[a-z]+-[0-9]+-[^)]+\)/gi, // Pattern like /1-20is-20...
  ];

  for (const pattern of brokenPatterns) {
    if (content.match(pattern)) {
      content = content.replace(pattern, (match, text) => {
        fixes.push(`Removed broken link`);
        return text ? `*${text}*` : '';
      });
    }
  }

  // ============================================
  // FIX 6: Fix very long encoded paths (likely broken)
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\/[a-z0-9%-]{50,}\)/gi, (match, text) => {
    fixes.push(`Removed very long broken link`);
    return text ? `*${text}*` : '';
  });

  // ============================================
  // FIX 7: Convert remaining unknown internal links to placeholders
  // These are links that don't match any known page
  // ============================================
  const knownPatterns = [
    'arlington-national-cemetery',
    'cardiac-nursing',
    'leaving-service-education-and-internships',
    'gsm-basestation-md-compatible-sdrr',
    'limesdr-products',
    'lenovo', 'dell', 'acer',
    'ccp-death-injury',
    'categorty-tech',
    'dragonos-install-20dragonos',
    'authentik-20installation',
    'connections-md',
    'cryptpad-server-upgrade-md',
    'cyber-incident-response-guide-personal-log-file-analysis',
    'cybersecurity-university-courses-md',
    'da-pam-623-3-evaluation-reporting-system-ers',
    'ar-623-3-evaluation-reporting-system-ers',
    'radio-checks-md',
  ];

  for (const term of knownPatterns) {
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(\\/${term}\\)`, 'gi');
    if (content.match(regex)) {
      content = content.replace(regex, (match, text) => {
        fixes.push(`Removed unknown link: ${term}`);
        return `*${text}*`;
      });
    }
  }

  // ============================================
  // FIX 8: Fix questions/numbered sections in paths
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\/\d+-20[^)]+\)/gi, (match, text) => {
    fixes.push(`Removed numbered section link`);
    return text ? `**${text}**` : '';
  });

  // Fix %20 encoded paths that remain
  content = content.replace(/\[([^\]]*)\]\(\/[^)]*%20[^)]*\)/gi, (match, text) => {
    fixes.push(`Removed encoded space path`);
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
  console.log(`Fourth pass link fixes in: ${DOCS_DIR}\n`);

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
