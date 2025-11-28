#!/usr/bin/env node
/**
 * Fix VitePress compatibility issues - convert JSX styles back to HTML
 */

const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, '../docs');

function fixFile(filepath) {
  let content = fs.readFileSync(filepath, 'utf-8');
  const originalContent = content;

  // Convert JSX style={{...}} back to HTML style="..."
  content = content.replace(/style=\{\{([^}]+)\}\}/g, (match, styleObj) => {
    // Parse the JSX style object and convert to CSS string
    const cssProps = styleObj.split(',').map(prop => {
      const [key, value] = prop.split(':').map(s => s.trim());
      if (!key || !value) return null;

      // Convert camelCase to kebab-case
      const cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      // Remove quotes from value
      const cssValue = value.replace(/"/g, '');

      return `${cssKey}: ${cssValue}`;
    }).filter(Boolean);

    return `style="${cssProps.join('; ')}"`;
  });

  // Remove any remaining broken image comments that might cause issues
  content = content.replace(/<!-- Image: [^>]* -->/g, '');

  // Fix malformed HTML comments
  content = content.replace(/<!-- Image: [^-]*-- \/>/g, '');

  // Remove markdown images with local paths (they don't exist)
  content = content.replace(/!\[([^\]]*)\]\((?!https?:\/\/)([^)]+)\)/g, (match, alt, imagePath) => {
    // Keep only if it's an external URL
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
      return match;
    }
    // Replace with placeholder text
    return alt ? `*[Image: ${alt}]*` : '';
  });

  // Remove HTML img tags with local paths
  content = content.replace(/<img[^>]*src=["'](?!https?:\/\/)([^"']+)["'][^>]*\/?>/gi, (match) => {
    return '<!-- local image removed -->';
  });

  // Escape angle bracket placeholders like <container>, <user>, <service_name>
  // But not inside code blocks or inline code
  const codeBlockRegex = /```[\s\S]*?```/g;
  const inlineCodeRegex = /`[^`]+`/g;
  const codeBlocks = [];
  const inlineCodes = [];

  // Preserve code blocks first
  content = content.replace(codeBlockRegex, (match) => {
    codeBlocks.push(match);
    return `__CODE_BLOCK_${codeBlocks.length - 1}__`;
  });

  // Preserve inline code
  content = content.replace(inlineCodeRegex, (match) => {
    inlineCodes.push(match);
    return `__INLINE_CODE_${inlineCodes.length - 1}__`;
  });

  // Now escape ALL angle bracket patterns that aren't valid HTML
  // Match <anything> patterns
  content = content.replace(/<([^>]+)>/g, (match, inner) => {
    // Skip if it looks like a valid HTML tag (with or without attributes)
    const tagMatch = inner.match(/^\/?(div|span|p|a|img|br|hr|ul|ol|li|table|tr|td|th|thead|tbody|iframe|script|style|pre|code|blockquote|h[1-6]|strong|em|b|i|u|details|summary|sup|sub|del|ins)(\s|>|\/|$)/i);
    if (tagMatch) {
      return match;
    }
    // Escape by converting to HTML entities or wrapping in code
    return `&lt;${inner}&gt;`;
  });

  // Restore inline code
  inlineCodes.forEach((code, i) => {
    content = content.replace(`__INLINE_CODE_${i}__`, code);
  });

  // Restore code blocks
  codeBlocks.forEach((block, i) => {
    content = content.replace(`__CODE_BLOCK_${i}__`, block);
  });

  // Remove dangerous script tags from markdown (XSS examples, etc)
  content = content.replace(/<script[\s\S]*?<\/script>/gi, '```html\n<!-- script tag removed for safety -->\n```');

  if (content !== originalContent) {
    fs.writeFileSync(filepath, content);
    return true;
  }
  return false;
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
  console.log('Fixing VitePress compatibility issues...\n');

  let fixed = 0;
  let total = 0;

  walkDir(DOCS_DIR, (filepath) => {
    total++;
    if (fixFile(filepath)) {
      console.log(`Fixed: ${filepath}`);
      fixed++;
    }
  });

  console.log(`\nProcessed ${total} files, fixed ${fixed} files.`);
}

main();
