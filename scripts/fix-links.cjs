#!/usr/bin/env node
/**
 * Fix broken links in VitePress markdown files
 * - Fixes broken link syntax from MediaWiki conversion
 * - Maps root-level links to correct category paths
 * - Removes broken placeholder links
 * - Fixes URL-encoded characters in links
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = process.argv[2] || path.join(__dirname, '../docs');

// Map of pages to their actual locations
// Generated from the actual file structure
const PAGE_MAP = {};

// Build the page map from actual files
function buildPageMap(dir, category = '') {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);
    if (stat.isDirectory()) {
      buildPageMap(filepath, file);
    } else if (file.endsWith('.md') && file !== 'index.md') {
      const slug = file.replace('.md', '');
      const fullPath = category ? `/${category}/${slug}` : `/${slug}`;
      PAGE_MAP[slug] = fullPath;
      // Also map with dashes normalized
      PAGE_MAP[slug.replace(/-/g, '')] = fullPath;
    }
  }
}

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
  // FIX 1: Remove broken placeholder links
  // Patterns like ./RANK, ./HIS/HER, ./A/N, ./UNIT, ./NUMBER
  // ============================================
  const placeholderPatterns = [
    /\[([^\]]*)\]\(\.\/RANK[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/HIS\/HER[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/A\/N[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/UNIT[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/NUMBER[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/ACHIEVEMENT\/SERVICE[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/BEHAVIOR_HERE[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/Primary_TA[^)]*\)/g,
    /\[([^\]]*)\]\(\.\/Secondary_TA[^)]*\)/g,
  ];

  for (const pattern of placeholderPatterns) {
    content = content.replace(pattern, (match, text) => {
      fixes.push(`Removed placeholder link: ${match.substring(0, 50)}`);
      return `**${text || 'VALUE'}**`;
    });
  }

  // ============================================
  // FIX 2: Fix double-bracket broken link patterns
  // Pattern: [text%5D(/path) -> should be [text](/path)
  // %5D is URL-encoded ]
  // ============================================
  content = content.replace(/\[([^\]]*?)%5D\]\(([^)]+)\)/gi, (match, text, url) => {
    fixes.push(`Fixed encoded bracket in: ${text}`);
    return `[${text}](${url})`;
  });

  // ============================================
  // FIX 3: Fix broken nested link patterns from MediaWiki
  // Pattern: [text](url1](/url2) -> [text](url2)
  // ============================================
  content = content.replace(/\[([^\]]+)\]\([^)]+\]\(([^)]+)\)/g, (match, text, url) => {
    fixes.push(`Fixed nested link: ${text}`);
    return `[${text}](${url})`;
  });

  // ============================================
  // FIX 4: Fix URL-encoded spaces in links
  // %20 -> should be - in slugs
  // ============================================
  content = content.replace(/\]\(\/([^)]*%20[^)]*)\)/g, (match, url) => {
    const fixed = url.replace(/%20/g, '-').toLowerCase();
    fixes.push(`Fixed URL-encoded space: ${url} -> ${fixed}`);
    return `](/${fixed})`;
  });

  // ============================================
  // FIX 5: Map root-level links to correct category paths
  // Pattern: [text](/page-slug) where page-slug exists in a category
  // ============================================
  content = content.replace(/\]\(\/([a-z0-9-]+)\)/gi, (match, slug) => {
    // Check if this slug exists in our page map
    const normalizedSlug = slug.toLowerCase().replace(/%20/g, '-');

    if (PAGE_MAP[normalizedSlug]) {
      fixes.push(`Mapped link: /${slug} -> ${PAGE_MAP[normalizedSlug]}`);
      return `](${PAGE_MAP[normalizedSlug]})`;
    }

    // Check without dashes
    const noDashSlug = normalizedSlug.replace(/-/g, '');
    if (PAGE_MAP[noDashSlug]) {
      fixes.push(`Mapped link: /${slug} -> ${PAGE_MAP[noDashSlug]}`);
      return `](${PAGE_MAP[noDashSlug]})`;
    }

    // If it starts with file-, it's likely a file link - remove or mark
    if (slug.startsWith('file-')) {
      fixes.push(`Removed file link: ${slug}`);
      return `](#)`;
    }

    return match;
  });

  // ============================================
  // FIX 6: Fix common specific link patterns
  // ============================================
  const linkMappings = {
    '/dfp-guide': '/general/dfp-guide',
    '/certifications': '/general/certifications',
    '/research': '/research/',
    '/server-guides': '/server-guides/',
    '/links': '/general/links',
    '/business': '/general/business',
    '/rstudio': '/general/rstudio',
    '/cybersecurity': '/cybersecurity/',
    '/learning': '/general/learning',
    '/join': '/community/join',
    '/welcome': '/community/welcome',
    '/admin': '/general/admin',
    '/unmanned-systems': '/general/unmanned-systems',
    '/ssh-keys': '/general/ssh-keys',
    '/mfa-guide': '/general/mfa-guide',
    '/password-manager': '/general/guide-to-password-managers',
    '/router-hardening': '/general/router-hardening',
    '/phishing': '/general/phishing',
    '/matrix-server-guide': '/server-guides/mantrix-with-ansible',
    '/oscp': '/cybersecurity/oscp',
    '/gpen': '/cybersecurity/gpen',
    '/oswe': '/general/advanced-web-attacks-and-exploitation-oswe',
    '/casp': '/general/casp',
    '/gwapt': '/general/gwapt',
    '/pmesii-pt': '/general/pmesii-pt',
    '/structured-analytic-techniques': '/general/structured-analytic-techniques-sats',
    '/datasets': '/research/research-datasets',
    '/ai-resources': '/ai-ml/ai-resources',
    '/ai-ml': '/ai-ml/',
    '/darkweb-links': '/general/darkweb-links',
    '/red-teaming': '/cybersecurity/cyber-red-teaming',
    '/mentorship-lobby-irregularchat-com': 'https://mentorship.lobby.irregularchat.com',
    '/element-matrix-messenger': '/matrix/element-matrix-messenger',
  };

  for (const [from, to] of Object.entries(linkMappings)) {
    const regex = new RegExp(`\\]\\(${from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\)`, 'g');
    if (content.match(regex)) {
      content = content.replace(regex, `](${to})`);
      fixes.push(`Mapped: ${from} -> ${to}`);
    }
  }

  // ============================================
  // FIX 7: Remove broken image links (![...](/file-...))
  // These reference MediaWiki files that don't exist
  // ============================================
  content = content.replace(/!\[([^\]]*)\]\(\/file-[^)]+\)/gi, (match, alt) => {
    fixes.push(`Removed broken image: ${alt}`);
    return alt ? `*[Image: ${alt}]*` : '';
  });

  // ============================================
  // FIX 8: Fix category links at end of files
  // ============================================
  content = content.replace(/\[Category:[^\]]+\]\([^)]+\)/gi, '');
  content = content.replace(/\[\[Category:[^\]]+\]\]/gi, '');

  // ============================================
  // FIX 9: Clean up empty links
  // ============================================
  content = content.replace(/\[([^\]]+)\]\(\s*\)/g, '$1');
  content = content.replace(/\[\]\([^)]+\)/g, '');

  // Clean up multiple blank lines
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
    return { fixed: true, fixes };
  }
  return { fixed: false, fixes: [] };
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
  console.log(`Building page map from: ${DOCS_DIR}\n`);
  buildPageMap(DOCS_DIR);
  console.log(`Found ${Object.keys(PAGE_MAP).length} pages\n`);

  console.log(`Fixing links in markdown files...\n`);

  let total = 0;
  let filesFixed = 0;
  let totalFixes = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    const result = fixFile(filepath);
    if (result.fixed) {
      filesFixed++;
      totalFixes += result.fixes.length;
      console.log(`Fixed: ${path.relative(DOCS_DIR, filepath)} (${result.fixes.length} fixes)`);
    }
  });

  console.log(`\n=== Summary ===`);
  console.log(`Total files processed: ${total}`);
  console.log(`Files modified: ${filesFixed}`);
  console.log(`Total fixes applied: ${totalFixes}`);
}

main();
