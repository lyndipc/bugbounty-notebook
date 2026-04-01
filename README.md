# Bug Bounty Notebook

Clone-per-target note-taking framework for bug bounty hunting, built with [Astro Starlight](https://starlight.astro.build/).

## How to Use

**Clone this repo for each target you hunt.** Each clone becomes a self-contained notebook for one program/target.

```bash
# Clone for a new target
git clone https://github.com/yourusername/bugbounty-notebook.git acme-corp-notes
cd acme-corp-notes

# Install and start
npm install
npm run dev
# Open http://localhost:4321
```

Then:

1. Fill in the target info on the **Scope & Rules** page
2. Work through **Recon** pages, recording findings as you go
3. Test each **Vulnerability** class against the target
4. Log findings in the **Findings Log**
5. Use **Report Template** when submitting

## Structure

```
src/content/docs/
├── index.md                  ← Landing page
├── methodology/              ← Workflow, scope, submission tips
├── recon/                    ← Subdomain enum, ports, content, JS, APIs
├── vulnerabilities/          ← XSS, SQLi, SSRF, IDOR, auth, file upload, etc.
├── exploitation/             ← Bug chaining, bypasses, payloads
├── reporting/                ← Report template, writing tips, findings log
└── cheatsheets/              ← Recon automation, Burp, ffuf, nuclei, one-liners
```

## Quick Start

```bash
npm install
npm run dev       # Dev server at http://localhost:4321
npm run build     # Build for production
npm run preview   # Preview production build
npm run notes     # Create a new note from template
```

## Adding Notes

```bash
# Interactive — picks section, template, and filename
npm run notes
```

The script walks you through picking a section, template, title, and filename — then tells you exactly what to add to the sidebar config.

See **[USAGE.md](USAGE.md)** for the full guide: script walkthrough, template reference, page structure conventions, and how to add new sections.

## Per-Target Customization

When you clone for a new target:

1. **Update the title** in `astro.config.mjs` — change `"Bug Bounty Notebook"` to `"<TARGET NAME> Notes"`
2. **Fill in scope** on the Scope & Rules page
3. **Record findings** in the Findings tables on each vulnerability page
4. **Track submissions** in the Findings Log

## Deployment

Deploy anywhere that serves static sites:

```bash
npm run build
# Upload dist/ to Vercel, Netlify, GitHub Pages, etc.
```

Or keep it local — `npm run dev` is fine for personal use.

## Features

- **Full-text search** — Pagefind indexes all content at build time
- **Dark + light mode** — Amber-accented dark theme
- **Copy-paste commands** — Every command has placeholders ready to swap
- **Findings tables** — Built into every vulnerability page
- **Report templates** — Copy and submit
- **New note generator** — `npm run notes` creates from templates

## Important

- **Keep repos private** — these contain target-specific findings
- **Don't commit real credentials or PII** — use placeholders
- **Follow responsible disclosure** — don't publish findings without permission

## License

Personal use. Not for redistribution.
