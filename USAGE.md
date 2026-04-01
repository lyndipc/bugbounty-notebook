# Usage Guide

How to add notes, use the templates, and keep your notebook organized.

## Creating Notes with the Script

The fastest way to add a new page is the built-in note generator:

```bash
npm run notes
```

This walks you through four prompts:

```
📝 New Bug Bounty Note

Sections:
  1. methodology
  2. recon
  3. vulnerabilities
  4. exploitation
  5. reporting
  6. cheatsheets

Section number (or 0 for new): 3

Templates:
  1. vulnerability
  2. recon
  3. cheatsheet
  4. general

Template number: 1

Page title: Server-Side Template Injection

Filename [server-side-template-injection.md]:

✅ Created: src/content/docs/vulnerabilities/server-side-template-injection.md

📌 Add to sidebar in astro.config.mjs:
   { label: 'Server-Side Template Injection', slug: 'vulnerabilities/server-side-template-injection' }
```

**Step 1 — Section:** Pick which folder the page goes in. Enter `0` to create an entirely new section (it will create the directory for you).

**Step 2 — Template:** Pick the page structure. Each template scaffolds different sections:

| Template        | Sections Included                                                            | Best For                             |
| --------------- | ---------------------------------------------------------------------------- | ------------------------------------ |
| `vulnerability` | What It Is, Where to Look, Testing, Bypasses, Proving Impact, Findings table | New bug class pages                  |
| `recon`         | Key Concepts, Commands, Automation, Findings table                           | New recon technique pages            |
| `cheatsheet`    | Quick Reference, Useful Flags, Examples, Notes                               | Tool-specific command references     |
| `general`       | Key Concepts, Notes                                                          | Anything that doesn't fit the others |

**Step 3 — Title:** The page title shown in the sidebar and at the top of the page.

**Step 4 — Filename:** Auto-generated from the title as kebab-case. Press Enter to accept the default, or type a custom name.

After the script runs, you still need to **add the page to the sidebar** in `astro.config.mjs`. The script prints the exact line to paste.

## Adding to the Sidebar

Open `astro.config.mjs` and find the section where your new page belongs. Add a new entry to the `items` array:

```js
{
  label: 'Vulnerabilities',
  items: [
    { label: 'Overview', slug: 'vulnerabilities' },
    { label: 'XSS', slug: 'vulnerabilities/xss' },
    // Add your new page here:
    { label: 'Server-Side Template Injection', slug: 'vulnerabilities/ssti' },
  ],
},
```

The `slug` is the path relative to `src/content/docs/`, without the `.md` extension.

## Creating Notes Manually

If you prefer not to use the script:

1. Create a `.md` file in the appropriate folder under `src/content/docs/`
2. Add frontmatter with at least a `title`
3. Add the page to the sidebar in `astro.config.mjs`

```markdown
---
title: "Your Page Title"
---

Your content here...
```

## File Naming Conventions

- Use lowercase kebab-case: `subdomain-enum.md`, `race-conditions.md`
- Section overviews are always `index.md`
- Keep names short but descriptive
- Match the slug to the filename (the script does this automatically)

## Page Structure by Type

### Vulnerability Pages

Every vulnerability page should follow this structure so you can quickly find what you need during testing:

```markdown
## What It Is ← one-paragraph refresher

## Where to Look ← which features / endpoints to test

## Testing ← commands, payloads, manual steps

## Bypasses ← what to try when basic payloads are blocked

## Proving Impact ← how to demonstrate severity for the report

## Findings ← table to log what you found on this target
```

### Recon Pages

```markdown
## Key Concepts ← what this technique covers

## Commands ← primary tool commands with placeholders

## Automation ← one-liners or pipeline scripts

## Findings ← table to record results
```

### Cheatsheet Pages

```markdown
## Quick Reference ← most common usage

## Useful Flags ← flag/purpose table

## Examples ← real-world command examples

## Notes ← anything worth remembering
```

## Placeholders

All commands use angle-bracket placeholders. Replace them before running:

| Placeholder   | Meaning                                              |
| ------------- | ---------------------------------------------------- |
| `<TARGET>`    | Root domain (e.g. `example.com`)                     |
| `<SUBDOMAIN>` | Specific subdomain                                   |
| `<URL>`       | Full URL including scheme                            |
| `<IP>`        | Target IP address                                    |
| `<CALLBACK>`  | Your callback server (Burp Collaborator, interactsh) |
| `<COOKIE>`    | Session cookie value                                 |
| `<TOKEN>`     | Auth token (JWT, API key)                            |
| `<WORDLIST>`  | Path to wordlist file                                |

## Using Admonitions

Starlight supports callout boxes in markdown. Use them to flag important context:

```markdown
:::tip
This technique works well against Spring Boot apps.
:::

:::caution
This can trigger WAF alerts — test carefully.
:::

:::danger
Never run this against production without explicit scope authorization.
:::
```

These render as colored callout boxes with icons in the built site.

## Adding a New Section

If you need an entirely new top-level section (beyond methodology, recon, vulnerabilities, etc.):

1. Run `npm run notes` and enter `0` at the section prompt, or manually create a folder under `src/content/docs/`
2. Create an `index.md` in the new folder with a section overview
3. Add a new sidebar group in `astro.config.mjs`:

```js
{
  label: 'New Section',
  items: [
    { label: 'Overview', slug: 'new-section' },
    { label: 'First Page', slug: 'new-section/first-page' },
  ],
},
```
