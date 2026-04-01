#!/usr/bin/env node

import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { resolve, dirname } from 'path';
import { createInterface } from 'readline';

const rl = createInterface({ input: process.stdin, output: process.stdout });
const ask = (q) => new Promise((res) => rl.question(q, res));

const SECTIONS = [
  'methodology',
  'recon',
  'vulnerabilities',
  'exploitation',
  'reporting',
  'cheatsheets',
];

const TEMPLATES = {
  vulnerability: `---
title: "TITLE"
---

## What It Is

<!-- Quick description of this vulnerability -->

## Where to Look

<!-- Which features / endpoints are typically vulnerable -->

## Testing

\`\`\`bash
# Add commands and payloads here
\`\`\`

## Bypasses

<!-- Techniques when basic payloads are filtered -->

## Proving Impact

<!-- How to demonstrate real-world impact for a convincing report -->

## Findings

| Endpoint | Parameter | Payload | Impact | Status |
|----------|-----------|---------|--------|--------|
| | | | | |
`,

  recon: `---
title: "TITLE"
---

## Key Concepts

<!-- What this recon technique covers -->

## Commands

\`\`\`bash
# Primary commands
\`\`\`

## Automation

\`\`\`bash
# One-liners or scripts for this technique
\`\`\`

## Findings

<!-- Record results for this target -->

| Finding | Details | Notes |
|---------|---------|-------|
| | | |
`,

  cheatsheet: `---
title: "TITLE"
---

## Quick Reference

\`\`\`bash
# Most common usage
\`\`\`

## Useful Flags

| Flag | Purpose |
|------|---------|
| \`\` | |

## Examples

\`\`\`bash
# Example 1
\`\`\`

## Notes

<!-- Anything worth remembering -->
`,

  general: `---
title: "TITLE"
---

## Key Concepts

<!-- What is this and when would you use it? -->

## Notes

<!-- Your notes here -->
`,
};

async function main() {
  console.log('\n📝 New Bug Bounty Note\n');

  console.log('Sections:');
  SECTIONS.forEach((s, i) => console.log(`  ${i + 1}. ${s}`));
  const sectionIdx = parseInt(await ask('\nSection number (or 0 for new): ')) - 1;

  let section;
  if (sectionIdx === -1) {
    section = (await ask('New section name (kebab-case): ')).trim().toLowerCase();
  } else if (sectionIdx >= 0 && sectionIdx < SECTIONS.length) {
    section = SECTIONS[sectionIdx];
  } else {
    console.log('Invalid selection.');
    rl.close();
    process.exit(1);
  }

  const templateKeys = Object.keys(TEMPLATES);
  console.log('\nTemplates:');
  templateKeys.forEach((t, i) => console.log(`  ${i + 1}. ${t}`));
  const templateIdx = parseInt(await ask('\nTemplate number: ')) - 1;

  if (templateIdx < 0 || templateIdx >= templateKeys.length) {
    console.log('Invalid selection.');
    rl.close();
    process.exit(1);
  }
  const template = templateKeys[templateIdx];

  const title = (await ask('\nPage title: ')).trim();
  if (!title) {
    console.log('Title is required.');
    rl.close();
    process.exit(1);
  }

  const defaultSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');

  const slug = (await ask(`Filename [${defaultSlug}.md]: `)).trim() || defaultSlug;
  const filename = slug.endsWith('.md') ? slug : `${slug}.md`;

  const docsDir = resolve(dirname(new URL(import.meta.url).pathname), '..', 'src', 'content', 'docs');
  const filePath = resolve(docsDir, section, filename);

  if (existsSync(filePath)) {
    console.log(`\n⚠️  ${filePath} already exists. Aborting.`);
    rl.close();
    process.exit(1);
  }

  mkdirSync(dirname(filePath), { recursive: true });
  const content = TEMPLATES[template].replace('TITLE', title);
  writeFileSync(filePath, content);

  console.log(`\n✅ Created: src/content/docs/${section}/${filename}`);

  const sidebarSlug = `${section}/${slug.replace('.md', '')}`;
  console.log(`\n📌 Add to sidebar in astro.config.mjs:`);
  console.log(`   { label: '${title}', slug: '${sidebarSlug}' }\n`);

  rl.close();
}

main();
