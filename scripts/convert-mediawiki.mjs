#!/usr/bin/env node
/**
 * Convert MediaWiki XML export to VitePress-compatible markdown
 */

import fs from 'fs';
import path from 'path';
import { parseString } from 'xml2js';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const IMPORT_DIR = path.join(__dirname, '../import');
const OUTPUT_DIR = path.join(__dirname, '../docs-fresh');

// MediaWiki namespaces to skip
const SKIP_NAMESPACES = ['User', 'User talk', 'Talk', 'File', 'File talk', 'MediaWiki', 'MediaWiki talk', 'Template', 'Template talk', 'Help', 'Help talk', 'Category', 'Category talk', 'Module', 'Module talk'];

function slugify(title) {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .substring(0, 100);
}

function convertWikitextToMarkdown(wikitext, title) {
  if (!wikitext) return '';

  let md = wikitext;

  // Convert headers: == Header == -> ## Header
  md = md.replace(/^======\s*(.+?)\s*======\s*$/gm, '###### $1');
  md = md.replace(/^=====\s*(.+?)\s*=====\s*$/gm, '##### $1');
  md = md.replace(/^====\s*(.+?)\s*====\s*$/gm, '#### $1');
  md = md.replace(/^===\s*(.+?)\s*===\s*$/gm, '### $1');
  md = md.replace(/^==\s*(.+?)\s*==\s*$/gm, '## $1');
  md = md.replace(/^=\s*(.+?)\s*=\s*$/gm, '# $1');

  // Convert bold: '''text''' -> **text**
  md = md.replace(/'''(.+?)'''/g, '**$1**');

  // Convert italic: ''text'' -> *text*
  md = md.replace(/''(.+?)''/g, '*$1*');

  // Convert internal links: [[Page|Text]] -> [Text](page)
  md = md.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (match, page, text) => {
    const slug = slugify(page);
    return `[${text}](/${slug})`;
  });

  // Convert internal links without text: [[Page]] -> [Page](page)
  md = md.replace(/\[\[([^\]]+)\]\]/g, (match, page) => {
    const slug = slugify(page);
    return `[${page}](/${slug})`;
  });

  // Convert external links: [url text] -> [text](url)
  md = md.replace(/\[(\S+)\s+([^\]]+)\]/g, '[$2]($1)');

  // Convert external links without text: [url] -> <url>
  md = md.replace(/\[(https?:\/\/[^\s\]]+)\]/g, '<$1>');

  // Convert bullet lists: * item -> - item
  md = md.replace(/^\*\s+/gm, '- ');
  md = md.replace(/^\*\*\s+/gm, '  - ');
  md = md.replace(/^\*\*\*\s+/gm, '    - ');

  // Convert numbered lists: # item -> 1. item
  md = md.replace(/^#\s+/gm, '1. ');
  md = md.replace(/^##\s+/gm, '   1. ');

  // Convert code blocks: <pre> or <code> or <syntaxhighlight>
  md = md.replace(/<syntaxhighlight lang="?(\w+)"?>([\s\S]*?)<\/syntaxhighlight>/gi, '```$1\n$2\n```');
  md = md.replace(/<source lang="?(\w+)"?>([\s\S]*?)<\/source>/gi, '```$1\n$2\n```');
  md = md.replace(/<pre>([\s\S]*?)<\/pre>/gi, '```\n$1\n```');
  md = md.replace(/<code>([\s\S]*?)<\/code>/gi, '`$1`');

  // Convert nowiki to code blocks
  md = md.replace(/<nowiki>([\s\S]*?)<\/nowiki>/gi, '`$1`');

  // Convert horizontal rules
  md = md.replace(/^----+$/gm, '---');

  // Convert tables (basic conversion)
  md = md.replace(/\{\|[^\n]*\n/g, '');
  md = md.replace(/\|\}/g, '');
  md = md.replace(/^\|-.*$/gm, '');
  md = md.replace(/^!\s*/gm, '| **');
  md = md.replace(/^\|\s*/gm, '| ');

  // Convert blockquotes
  md = md.replace(/<blockquote>([\s\S]*?)<\/blockquote>/gi, '> $1');

  // Remove categories
  md = md.replace(/\[\[Category:[^\]]+\]\]/gi, '');

  // Remove __TOC__, __NOTOC__, etc.
  md = md.replace(/__[A-Z]+__/g, '');

  // Remove templates (basic - just remove simple ones)
  md = md.replace(/\{\{[^{}]*\}\}/g, '');

  // Clean up multiple blank lines
  md = md.replace(/\n{3,}/g, '\n\n');

  // Remove MediaWiki-specific HTML
  md = md.replace(/<ref[^>]*>[\s\S]*?<\/ref>/gi, '');
  md = md.replace(/<ref[^>]*\/>/gi, '');
  md = md.replace(/<references\s*\/>/gi, '');

  return md.trim();
}

function categorizeByTitle(title) {
  const titleLower = title.toLowerCase();

  if (titleLower.includes('matrix') || titleLower.includes('element') || titleLower.includes('synapse')) {
    return 'matrix';
  }
  if (titleLower.includes('server') || titleLower.includes('ansible') || titleLower.includes('docker') || titleLower.includes('proxmox')) {
    return 'server-guides';
  }
  if (titleLower.includes('cyber') || titleLower.includes('security') || titleLower.includes('pentest') || titleLower.includes('oscp') || titleLower.includes('gpen') || titleLower.includes('cisa')) {
    return 'cybersecurity';
  }
  if (titleLower.includes('research') || titleLower.includes('osint') || titleLower.includes('intelligence')) {
    return 'research';
  }
  if (titleLower.includes('ai') || titleLower.includes('llm') || titleLower.includes('machine learning') || titleLower.includes('gpt')) {
    return 'ai-ml';
  }
  if (titleLower.includes('radio') || titleLower.includes('sdr') || titleLower.includes('dragonos') || titleLower.includes('flipper')) {
    return 'radio';
  }
  if (titleLower.includes('privacy') || titleLower.includes('vpn') || titleLower.includes('tor') || titleLower.includes('monero')) {
    return 'privacy';
  }
  if (titleLower.includes('community') || titleLower.includes('join') || titleLower.includes('welcome')) {
    return 'community';
  }
  if (titleLower.includes('authentik') || titleLower.includes('cloudflare') || titleLower.includes('tailscale')) {
    return 'infrastructure';
  }

  return 'general';
}

async function main() {
  const xmlFile = path.join(IMPORT_DIR, 'fresh-export-20251127.xml');

  if (!fs.existsSync(xmlFile)) {
    console.error('XML export file not found:', xmlFile);
    process.exit(1);
  }

  console.log('Reading XML export...');
  const xmlContent = fs.readFileSync(xmlFile, 'utf-8');

  console.log('Parsing XML...');

  parseString(xmlContent, { explicitArray: false }, (err, result) => {
    if (err) {
      console.error('Error parsing XML:', err);
      process.exit(1);
    }

    const pages = result.mediawiki.page;
    const pageArray = Array.isArray(pages) ? pages : [pages];

    console.log(`Found ${pageArray.length} pages`);

    // Clean output directory
    if (fs.existsSync(OUTPUT_DIR)) {
      fs.rmSync(OUTPUT_DIR, { recursive: true });
    }
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });

    const stats = {
      converted: 0,
      skipped: 0,
      errors: 0,
      categories: {}
    };

    for (const page of pageArray) {
      try {
        const title = page.title;
        const ns = page.ns;

        // Skip non-content namespaces
        if (ns !== '0' && ns !== 0) {
          stats.skipped++;
          continue;
        }

        // Get the latest revision
        const revision = Array.isArray(page.revision)
          ? page.revision[page.revision.length - 1]
          : page.revision;

        if (!revision || !revision.text) {
          stats.skipped++;
          continue;
        }

        const wikitext = typeof revision.text === 'string'
          ? revision.text
          : revision.text._ || revision.text;

        if (!wikitext || wikitext.length < 10) {
          stats.skipped++;
          continue;
        }

        // Skip redirects
        if (wikitext.toLowerCase().startsWith('#redirect')) {
          stats.skipped++;
          continue;
        }

        // Convert to markdown
        const markdown = convertWikitextToMarkdown(wikitext, title);

        if (markdown.length < 20) {
          stats.skipped++;
          continue;
        }

        // Determine category
        const category = categorizeByTitle(title);
        const categoryDir = path.join(OUTPUT_DIR, category);

        if (!fs.existsSync(categoryDir)) {
          fs.mkdirSync(categoryDir, { recursive: true });
        }

        // Create frontmatter
        const slug = slugify(title);
        const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
---

`;

        // Write file
        const filename = `${slug}.md`;
        const filepath = path.join(categoryDir, filename);
        fs.writeFileSync(filepath, frontmatter + markdown);

        stats.converted++;
        stats.categories[category] = (stats.categories[category] || 0) + 1;

      } catch (err) {
        console.error(`Error processing page:`, err.message);
        stats.errors++;
      }
    }

    console.log('\n=== Conversion Summary ===');
    console.log(`Converted: ${stats.converted}`);
    console.log(`Skipped: ${stats.skipped}`);
    console.log(`Errors: ${stats.errors}`);
    console.log('\nCategories:');
    for (const [cat, count] of Object.entries(stats.categories).sort((a, b) => b[1] - a[1])) {
      console.log(`  ${cat}: ${count}`);
    }
    console.log(`\nOutput directory: ${OUTPUT_DIR}`);
  });
}

main();
