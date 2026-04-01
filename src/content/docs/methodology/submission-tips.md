---
title: "Submission Tips"
---

## What Makes a Good Report

The difference between a bounty and a "not applicable" often comes down to report quality, not technical skill.

## Report Checklist

- [ ] Title is clear and specific (not "XSS found")
- [ ] Vulnerability type is identified
- [ ] Affected endpoint/URL is listed
- [ ] Step-by-step reproduction is included
- [ ] Each step has a screenshot or request/response
- [ ] Impact is clearly explained in business terms
- [ ] Severity is justified (CVSS if required)
- [ ] Remediation suggestion is included
- [ ] Report is proofread

## Common Rejection Reasons

| Reason | How to Avoid |
|--------|--------------|
| Duplicate | Search program disclosures, test less common endpoints |
| Informational / No impact | Always demonstrate real impact, chain if needed |
| Out of scope | Read scope carefully before testing |
| Not reproducible | Test your own repro steps before submitting |
| Self-XSS / low impact | Show how it can be triggered on another user |
| Known issue | Check changelogs, recent commits, version numbers |

## Severity Guidelines

| Severity | Examples |
|----------|----------|
| **Critical** | RCE, auth bypass to admin, SQLi with data exfil, full account takeover |
| **High** | Stored XSS on main app, SSRF to internal services, IDOR on sensitive data |
| **Medium** | Reflected XSS, CSRF on important actions, info disclosure of tokens |
| **Low** | Open redirect, missing headers with edge-case impact, verbose errors |

## Platform-Specific Tips

### HackerOne

- Use markdown formatting in reports
- Attach video PoC for complex bugs
- Respond promptly to triager questions
- Don't disclose publicly without permission

### Bugcrowd

- Follow their VRT (Vulnerability Rating Taxonomy) for severity
- Be specific about the priority you're claiming
- Include remediation advice

### Intigriti

- Check the specific program rules — they vary a lot
- Their triage team is generally technical, so be precise
