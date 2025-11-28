#!/usr/bin/env node
/**
 * Final cleanup - fix all remaining dead links by direct replacement
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = process.argv[2] || path.join(__dirname, '../docs');

// Direct file replacements
const fileReplacements = {
  'server-guides/rstudio-server-guide.md': [
    [/\]\(\/server-guides\/index\)/g, '](/server-guides/)'],
    [/\]\(\/research\/index\)/g, '](/research/)'],
  ],
  'server-guides/ansible-setup.md': [
    [/\]\(\/server-guides\/index\)/g, '](/server-guides/)'],
  ],
  'radio/dragonos.md': [
    [/\[([^\]]*)\]\(\.\/@%5D\)/g, '$1'],
  ],
  'matrix/matrix-migrating-servers.md': [
    [/\]\(\/infrastructure\/postgres_system[^)]*\)/g, '](#postgres-backup)'],
  ],
  'matrix/element-matrix-messenger.md': [
    [/\[([^\]]*)\]\(\.\/Secure\)/g, '**$1**'],
    [/\[([^\]]*)\]\(\.\/Device\)/g, '**$1**'],
    [/\[([^\]]*)\]\(\.\/Thread\)/g, '**$1**'],
    [/\[([^\]]*)\]\(\.\/Space\)/g, '**$1**'],
    [/\[([^\]]*)\]\(\.\/Notification\)/g, '**$1**'],
  ],
  'matrix/cloudflare-workers-matrix.md': [
    [/\]\(\/server-guides\/index\)/g, '](/server-guides/)'],
  ],
  'general/virtualbox-guide.md': [
    [/\[([^\]]*)\]\(\.\/1%5D\)/g, '$1'],
  ],
  'general/tak.md': [
    [/\]\(\/server-guides\/index\)/g, '](/server-guides/)'],
  ],
  'general/rstudio.md': [
    [/\[([^\]]*)\]\(\.\/research-datasets%7C[^)]*\)/g, '[$1](/research/research-datasets)'],
    [/\[([^\]]*)\]\(\.\/datasets%7C[^)]*\)/g, '[$1](/research/research-datasets)'],
  ],
  'general/reports.md': [
    [/\]\(\/research\/index\)/g, '](/research/)'],
  ],
  'general/nextcloud-terminal-commands.md': [
    [/\]\(\/server-guides\/index\)/g, '](/server-guides/)'],
  ],
  'general/mme.md': [
    [/\[([^\]]*)\]\(\.\/invalid\)/g, '$1'],
  ],
  'general/k54.md': [
    [/\[([^\]]*)\]\(\.\/1%5D\)/g, '$1'],
  ],
  'general/help.md': [
    [/\[([^\]]*)\]\(\.\/%E2%80%A6add\)/g, '$1'],
  ],
  'general/guides.md': [
    [/\]\(\/community\/index\)/g, '](/community/)'],
  ],
  'general/fabrication.md': [
    [/\[([^\]]*)\]\(\.\/here%5D[^)]*\)/g, '$1'],
  ],
  'general/etherpad.md': [
    [/\[([^\]]*)\]\(\.\/Install%5D\)/g, '**$1**'],
  ],
  'general/darkweb-links.md': [
    [/\]\(\/research\/index\)/g, '](/research/)'],
  ],
  'general/credentialing-assistance.md': [
    [/\[([^\]]*)\]\(\.\/SANS\)/g, '[$1](https://www.sans.org)'],
  ],
  'general/casp.md': [
    [/\]\(\/cybersecurity\/index\)/g, '](/cybersecurity/)'],
  ],
  'cybersecurity/cyber-incident-response-guide-personal.md': [
    [/\]\(\/cybersecurity\/index\)/g, '](/cybersecurity/)'],
  ],
  'ai-ml/main-page.md': [
    [/\]\(\/ai-ml\/index\)/g, '](/ai-ml/)'],
  ],
  'ai-ml/container-dashboard-portainer.md': [
    [/\]\(https:\/\/localhost:9443\)/g, '](#portainer-dashboard)'],
  ],
  'ai-ml/ai-ethics.md': [
    [/\]\(\/ai-ml\/index\)/g, '](/ai-ml/)'],
  ],
  'ai-ml/ai-ml-community-content.md': [
    [/\[([^\]]*)\]\(\.\/I%5Dncreasingly\)/g, '$1'],
  ],
};

function fixFile(filepath) {
  const relPath = path.relative(DOCS_DIR, filepath);

  if (!fileReplacements[relPath]) {
    return { fixed: false, count: 0 };
  }

  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;
  let fixes = 0;

  for (const [pattern, replacement] of fileReplacements[relPath]) {
    if (content.match(pattern)) {
      content = content.replace(pattern, replacement);
      fixes++;
    }
  }

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content);
    return { fixed: true, count: fixes };
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
  console.log(`Final cleanup in: ${DOCS_DIR}\n`);

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
