#!/usr/bin/env node
/**
 * Third pass link fixes - handles remaining patterns
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
  // FIX 1: Fix /server-guides/index -> /server-guides/
  // ============================================
  const indexMappings = {
    '/server-guides/index': '/server-guides/',
    '/research/index': '/research/',
    '/ai-ml/index': '/ai-ml/',
    '/cybersecurity/index': '/cybersecurity/',
    '/matrix/index': '/matrix/',
    '/radio/index': '/radio/',
    '/privacy/index': '/privacy/',
    '/community/index': '/community/',
    '/general/index': '/general/',
  };

  for (const [from, to] of Object.entries(indexMappings)) {
    const regex = new RegExp(`\\]\\(${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `](${to})`);
      fixes.push(`Index link: ${from} -> ${to}`);
    }
  }

  // ============================================
  // FIX 2: Remaining placeholder patterns
  // ============================================
  const placeholderPatterns = [
    [/\[([^\]]*)\]\(\.\/RANK[^)]*\)/g, '**[RANK]**'],
    [/\[([^\]]*)\]\(\.\/HIS\/HER%5D[^)]*\)/g, '**[HIS/HER]**'],
    [/\[([^\]]*)\]\(\.\/A\/N[^)]*\)/g, '**[A/N]**'],
    [/\[([^\]]*)\]\(\.\/UNIT[^)]*\)/g, '**[UNIT]**'],
    [/\[([^\]]*)\]\(\.\/NAME%5D[^)]*\)/g, '**[NAME]**'],
    [/\[([^\]]*)\]\(\.\/PSYOP[^)]*\)/g, '**PSYOP**'],
    [/\[([^\]]*)\]\(\.\/1%5D[^)]*\)/g, ''],
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
    [/\[([^\]]*)\]\(\.\/@%5D[^)]*\)/g, '$1'],
    [/\[([^\]]*)\]\(\.\/\@%5D[^)]*\)/g, '$1'],
    [/\[([^\]]*)\]\(\.\/%E2%80%A6[^)]*\)/g, '$1'],
    [/\[([^\]]*)\]\(\.\/500px[^)]*\)/g, '$1'],
    [/\[([^\]]*)\]\(\/behavior-here\)/gi, '**[BEHAVIOR]**'],
    [/\[([^\]]*)\]\(\.\/research-datasets%7C[^)]*\)/g, '[$1](/research/research-datasets)'],
    [/\[([^\]]*)\]\(\.\/datasets%7C[^)]*\)/g, '[$1](/research/research-datasets)'],
  ];

  for (const [pattern, replacement] of placeholderPatterns) {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      fixes.push(`Fixed placeholder pattern`);
    }
  }

  // ============================================
  // FIX 3: More specific mappings
  // ============================================
  const specificMappings = {
    '/quick-20admin-20links': '/general/admin',
    '/secure-your-online-accounts': '/general/secure-your-online-accounts',
    '/secure-your-local-devices': '/general/secure-your-local-devices',
    '/secure-your-devices-and-network': '/general/secure-your-devices',
    '/software-defined-radio-sdr-comparison': '/radio/software-defined-radios-sdrs',
    '/rfid': '/general/rfid-spoofing',
    '/meetup-irregularchat-com': 'https://meetup.irregularchat.com',
    '/mentors-irregularchat-com': 'https://mentors.irregularchat.com',
    '/coaches-and-guides-irregularchat-com': 'https://coaches.irregularchat.com',
    '/privacyguides-matrix-org': 'https://matrix.to/#/#privacyguides:matrix.org',
    '/ewpt': '/cybersecurity/ewpt',
    '/sockpuppet': '/general/sock-puppet-accounts',
    '/setting-20up-20cryptpad-20server': '/server-guides/cryptpad-server',
    '/service-20-20storage-20-20nextcloud': '/privacy/service-storage-nextcloud',
    '/running-20llms-20on-20edge-20devices': '/ai-ml/running-llms-on-edge-devices',
    '/recommended-20hardware-20for-20starting-20with-20llms': '/ai-ml/recommended-hardware-for-llms',
    '/linux-server-initial-setup-with-docker': '/server-guides/linux-server-initial-setup',
    '/cloud-instance-setup-azure': '/server-guides/cloud-instance-setup',
    '/maintenance-postgres-md-backing-up-postgresql': '/infrastructure/postgres_system#backing-up',
    '/research-datasets-md': '/research/research-datasets',
    '/structured-analytic-techniques-technique-1-red-hat-analysis-and-structured-brainstorming': '/general/structured-analytic-techniques-sats',
    '/tm-3-53-11-influence-process-activity-target-audience-analysis': '/general/target-audience-analysis',
    '/the-20role-20of-20knowledge-20management-20assistants': '/general/knowledge-management',
    '/signal-prompts': '/ai-ml/signal-prompts',
    '/irregularchat-surfer': 'https://surfer.irregularchat.com',
    '/leaders-guide': '/general/leaders-guide',
    '/operating-conditions': '/general/operating-conditions',
    '/counters': '/general/counters',
    '/security': '/cybersecurity/',
    '/secure': '/cybersecurity/',
    '/restore': '#restore',
    '/report': '#report',
    '/references': '#references',
    '/secondary-ta-1': '#secondary-ta',
  };

  for (const [from, to] of Object.entries(specificMappings)) {
    const regex = new RegExp(`\\]\\(${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `](${to})`);
      fixes.push(`Mapped: ${from} -> ${to}`);
    }
  }

  // ============================================
  // FIX 4: Convert ALL remaining Wikipedia-style links to external
  // These are military/political terms that should link to Wikipedia
  // ============================================
  const wikiTerms = [
    'doha-agreement-2020', 'september-11-attacks', 'afghan-armed-forces',
    'fall-of-kabul-2021', 'kabul-international-airport', '2021-kabul-airport-attack',
    'united-states-senate-committee-on-armed-services', 'multinational-force-and-observers',
    'sinai-peninsula', 'panama', 'haiti', 'bosnia-herzegovina',
    '10th-mountain-division', 'iii-corps-united-states',
    'international-security-assistance-force',
    'commanding-general-united-states-army-forces-command',
    'fort-bragg', 'chief-of-staff-of-the-united-states-army',
    'chairman-of-the-joint-chiefs-of-staff', 'distinctive-unit-insignia',
    'combat-infantryman-badge', 'parachutist-badge-france',
    'defense-distinguished-service-medal', 'oak-leaf-cluster',
    'joint-meritorious-unit-award', 'army-meritorious-unit-commendation',
    'army-distinguished-service-medal', 'navy-distinguished-service-medal',
    'air-force-distinguished-service-medal', '101st-airborne-division',
    'combat-service-identification-badge', 'defense-superior-service-medal',
    'legion-of-merit', 'bronze-star-medal',
    'meritorious-service-medal-united-states', 'army-commendation-medal',
    'army-achievement-medal', 'national-defense-service-medal',
    'service-star', 'armed-forces-expeditionary-medal',
    'afghanistan-campaign-medal', 'iraq-campaign-medal',
    'global-war-on-terrorism-expeditionary-medal',
    'global-war-on-terrorism-service-medal', 'korea-defense-service-medal',
    'humanitarian-service-medal', 'army-service-ribbon',
    'army-overseas-service-ribbon', 'award-numeral', 'nato-medal',
    'multinational-force-and-observers-medal',
    'national-order-of-merit-france', 'order-of-the-british-empire',
    'special-forces-tab', 'ranger-tab', 'master-parachutist-badge',
    'uniform-service-diver-insignia-united-states-united-states-army',
    'joint-chiefs-of-staff-identification-badge',
    'army-staff-identification-badge', 'georgetown-university',
    'princeton-university', 'axios-website', 'wikipedia-manufacturing',
  ];

  for (const term of wikiTerms) {
    const regex = new RegExp(`\\[([^\\]]+)\\]\\(\\/${term}\\)`, 'gi');
    if (content.match(regex)) {
      const wikiUrl = `https://en.wikipedia.org/wiki/${term.replace(/-/g, '_')}`;
      content = content.replace(regex, `[$1](${wikiUrl})`);
      fixes.push(`Wikipedia link: ${term}`);
    }
  }

  // ============================================
  // FIX 5: Remove broken file/pdf links
  // ============================================
  const brokenFilePatterns = [
    /\[([^\]]*)\]\(\/[a-z0-9-]+-pdf\)/gi,
    /\[([^\]]*)\]\(\/server-guides\/server-pdf\)/gi,
    /\[([^\]]*)\]\(\/compare-element-jpg\)/gi,
    /\[([^\]]*)\]\(\/pdw-c100-jpeg\)/gi,
    /\[([^\]]*)\]\(\/nc-vegetable-planting-guide-pdf[^)]*\)/gi,
    /\[([^\]]*)\]\(\/sec599[^)]+\)/gi,
    /\[([^\]]*)\]\(\/sans-[^)]+\)/gi,
    /\[([^\]]*)\]\(\/tab-a-[^)]+\)/gi,
    /\[([^\]]*)\]\(\/zyn89aznme[^)]+\)/gi,
    /\[([^\]]*)\]\(https:\/\/localhost[^)]+\)/gi,
  ];

  for (const pattern of brokenFilePatterns) {
    if (content.match(pattern)) {
      content = content.replace(pattern, '*[$1]*');
      fixes.push(`Removed broken file/pdf link`);
    }
  }

  // ============================================
  // FIX 6: Fix remaining URL-encoded patterns
  // ============================================
  // %20 -> - in slugs
  content = content.replace(/\]\(\/([^)]*%20[^)]*)\)/g, (match, url) => {
    const fixed = url.replace(/%20/g, '-').toLowerCase();
    fixes.push(`Fixed URL-encoded space`);
    return `](/${fixed})`;
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
  console.log(`Third pass link fixes in: ${DOCS_DIR}\n`);

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
