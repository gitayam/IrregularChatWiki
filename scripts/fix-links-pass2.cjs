#!/usr/bin/env node
/**
 * Second pass link fixes - handles remaining patterns
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
  // FIX 1: More placeholder patterns
  // ============================================
  const morePlaceholders = [
    [/\[([^\]]*)\]\(\.\/RANK\)/g, '**[RANK]**'],
    [/\[([^\]]*)\]\(\.\/HIS\/HER%5D\)/g, '**[HIS/HER]**'],
    [/\[([^\]]*)\]\(\.\/A\/N\)/g, '**[A/N]**'],
    [/\[([^\]]*)\]\(\.\/UNIT\)/g, '**[UNIT]**'],
    [/\[([^\]]*)\]\(\.\/NAME%5D\)/g, '**[NAME]**'],
    [/\[([^\]]*)\]\(\.\/PSYOP\)/g, '**PSYOP**'],
    [/\[([^\]]*)\]\(\.\/1%5D\)/g, ''],
    [/\[([^\]]*)\]\(\.\/Briefly[^)]*\)/g, '**Briefly:**'],
    [/\[([^\]]*)\]\(\.\/Describe[^)]*\)/g, '**Describe:**'],
    [/\[([^\]]*)\]\(\.\/Explain[^)]*\)/g, '**Explain:**'],
    [/\[([^\]]*)\]\(\.\/Detail[^)]*\)/g, '**Detail:**'],
    [/\[([^\]]*)\]\(\.\/Secure[^)]*\)/g, '**Secure**'],
    [/\[([^\]]*)\]\(\.\/Device[^)]*\)/g, '**Device**'],
    [/\[([^\]]*)\]\(\.\/Thread[^)]*\)/g, '**Thread**'],
    [/\[([^\]]*)\]\(\.\/Space[^)]*\)/g, '**Space**'],
    [/\[([^\]]*)\]\(\.\/Notification[^)]*\)/g, '**Notification**'],
    [/\[([^\]]*)\]\(\.\/invalid[^)]*\)/g, '$1'],
    [/\[([^\]]*)\]\(\.\/\@%5D\)/g, '$1'],
    [/\[([^\]]*)\]\(\.\/%E2%80%A6[^)]*\)/g, '$1'],
    [/\[([^\]]*)\]\(\/behavior-here\)/gi, '**[BEHAVIOR]**'],
  ];

  for (const [pattern, replacement] of morePlaceholders) {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      fixes.push(`Fixed placeholder pattern`);
    }
  }

  // ============================================
  // FIX 2: Fix -md suffix links (MediaWiki artifact)
  // /page-md -> /category/page
  // ============================================
  const mdSuffixMappings = {
    '/server-guides-md': '/server-guides/',
    '/incident-response-guide-md': '/cybersecurity/cyber-incident-response-guide-personal',
    '/matrix-20trouble-20shooting-md': '/matrix/matrix-troubleshooting',
    '/research-md': '/research/',
    '/virtual-environment-md': '/general/virtual-environments',
    '/android-virtual-device-md': '/general/android-virtual-device',
    '/password-manager-md': '/general/guide-to-password-managers',
    '/dragonos-md': '/radio/dragonos',
    '/tracking-prevention-md': '/general/tracking-prevention',
    '/setting-20up-20maubot-md': '/general/setting-up-maubot',
  };

  for (const [from, to] of Object.entries(mdSuffixMappings)) {
    const regex = new RegExp(`\\]\\(${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `](${to})`);
      fixes.push(`Fixed: ${from} -> ${to}`);
    }
  }

  // ============================================
  // FIX 3: More specific mappings
  // ============================================
  const specificMappings = {
    '/sock-puppet-creation-outline': '/general/sock-puppet-accounts-creation',
    '/incident-response-guide': '/cybersecurity/cyber-incident-response-guide-personal',
    '/incident-response-guide-phishing': '/general/phishing',
    '/virtual-environment': '/general/virtual-environments',
    '/software-defined-radio': '/radio/software-defined-radios-sdrs',
    '/research-citation': '/research/research-citations',
    '/research-planning': '/research/research-preparation',
    '/research-platforms': '/research/research-tools',
    '/unmanned-systems-chat': '/general/unmanned-systems',
    '/email-security': '/ai-ml/email-hardening-guide',
    '/vpn': '/privacy/vpn-recommendation',
    '/network': '/general/certifications',
    '/rss': '/general/tech-rss',
    '/cog': '/general/center-of-gravity-analysis-guide',
    '/iso-flash-guide': '/general/booting-os-from-usb',
    '/developmental-counseling-form': '/general/army-evaluation-resources',
    '/evaluation-ai-prompt': '/ai-ml/evaluation-ai-prompt',
    '/workers': '/matrix/cloudflare-workers-matrix',
    '/setup-virtualbox': '/general/virtualbox-guide',
    '/create-a-virtual-machine-from-iso': '/general/virtualbox-guide',
    '/about-research-template': '/research/research-template',
  };

  for (const [from, to] of Object.entries(specificMappings)) {
    const regex = new RegExp(`\\]\\(${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `](${to})`);
      fixes.push(`Mapped: ${from} -> ${to}`);
    }
  }

  // ============================================
  // FIX 4: Convert Wikipedia-style links to external Wikipedia links
  // These are internal links to Wikipedia articles
  // ============================================
  const wikipediaPatterns = [
    'cnn', 'reuters', 'politico', 'russia', 'taliban', 'woke',
    'nancy-pelosi', 'kamala-harris', 'lloyd-austin', 'jen-psaki',
    'gina-haspel', 'fort-hood', 'united-states', 'flag-of-the-united-states',
    'united-states-armed-forces', 'united-states-secretary-of-defense',
    'joint-base-andrews', 'brookings-institution', 'max-boot',
    'john-kirby-admiral', 'dick-durbin', 'jack-reed-rhode-island-politician',
    'senate-judiciary-committee', 'u-s-senate-committee-on-armed-services',
    'alexander-vindman', 'charles-q-brown-jr', 'austin-s-miller',
    'robert-costa-journalist', 'peril-book', 'russo-ukrainian-war',
    'inauguration-of-joe-biden', 'withdrawal-of-united-states-troops-from-afghanistan-2020-2021',
    '2020-2021-united-states-racial-unrest', 'veterans-day', 'war-in-afghanistan-2001-2021',
  ];

  for (const term of wikipediaPatterns) {
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(\\/${term}\\)`, 'gi');
    if (content.match(regex)) {
      const wikiUrl = `https://en.wikipedia.org/wiki/${term.replace(/-/g, '_')}`;
      content = content.replace(regex, `[$1](${wikiUrl})`);
      fixes.push(`Wikipedia link: ${term}`);
    }
  }

  // ============================================
  // FIX 5: Remove broken file links that can't be resolved
  // ============================================
  const filePatterns = [
    /\[([^\]]*)\]\(\/file-[^)]+\)/gi,
    /\[([^\]]*)\]\(\/sec542[^)]+\)/gi,
    /\[([^\]]*)\]\(\/alphabeticalv2-pdf\)/gi,
    /\[([^\]]*)\]\(\/gpenindex[^)]+\)/gi,
    /\[([^\]]*)\]\(\/combined-awards-txt\)/gi,
    /\[([^\]]*)\]\(\/pai-[^)]+\)/gi,
  ];

  for (const pattern of filePatterns) {
    if (content.match(pattern)) {
      content = content.replace(pattern, '*[$1]*');
      fixes.push(`Removed broken file link`);
    }
  }

  // ============================================
  // FIX 6: Remove links with broken URL patterns
  // ============================================
  content = content.replace(/\[([^\]]*)\]\(\/https-[^)]+\)/gi, (match, text) => {
    fixes.push(`Removed broken https pattern`);
    return text;
  });

  // Fix onion and other special links
  content = content.replace(/\[([^\]]*)\]\(\/[a-z0-9]{50,}-onion\)/gi, (match, text) => {
    fixes.push(`Removed onion link`);
    return text;
  });

  // Fix encoded links like /xmt-...
  content = content.replace(/\[([^\]]*)\]\(\/xmt-[^)]+\)/gi, (match, text) => {
    fixes.push(`Removed encoded link`);
    return text;
  });

  // ============================================
  // FIX 7: Fix internal section links in specific files
  // ============================================
  const sectionMappings = {
    '/research-preparation-pre-browsing-checks': '/research/research-preparation#pre-browsing-checks',
    '/general-preparation': '#general-preparation',
    '/brand-specific-instructions': '#brand-specific-instructions',
    '/key-table': '#key-table',
    '/additional-resources': '#additional-resources',
    '/bootable-usb': '#bootable-usb',
    '/phase0-prepare': '#phase-0-prepare',
    '/phase1-first-action': '#phase-1-first-action',
    '/phase2-make-them-money': '#phase-2-make-them-money',
    '/phase3-go-for-broke': '#phase-3-go-for-broke',
    '/phase4-long-term-storage': '#phase-4-long-term-storage',
  };

  for (const [from, to] of Object.entries(sectionMappings)) {
    const regex = new RegExp(`\\]\\(${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `](${to})`);
      fixes.push(`Section link: ${from} -> ${to}`);
    }
  }

  // ============================================
  // FIX 8: Clean up remaining broken patterns
  // ============================================
  // Remove pipe in link text like [| text]
  content = content.replace(/\[\|\s*([^\]]+)\]/g, '[$1]');

  // Remove empty parentheses after links
  content = content.replace(/\]\(\)/g, '](#)');

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
  console.log(`Second pass link fixes in: ${DOCS_DIR}\n`);

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
