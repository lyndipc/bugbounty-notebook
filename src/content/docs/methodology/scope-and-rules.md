---
title: "Scope & Rules"
---

## Scope Documentation

Fill this in when you clone the repo for a new target.

### In-Scope Assets

| Asset | Type | Notes |
|-------|------|-------|
| | Web App | |
| | API | |
| | Mobile App | |
| | Domain / Wildcard | |

### Out-of-Scope

| Asset / Action | Reason |
|----------------|--------|
| | |

### Qualifying Vulnerabilities

- [ ] Remote Code Execution
- [ ] SQL Injection
- [ ] Authentication Bypass
- [ ] SSRF
- [ ] IDOR / Broken Access Control
- [ ] Stored XSS
- [ ] Reflected XSS (with impact)
- [ ] CSRF on critical actions
- [ ] File Upload leading to RCE
- [ ] Privilege Escalation
- [ ] Business Logic flaws with real impact
- [ ] Information Disclosure (PII, credentials, tokens)
- [ ] Subdomain Takeover

### Excluded from Bounty (Common)

- Self-XSS without chaining
- Missing security headers without demonstrated impact
- Clickjacking without sensitive action
- CSRF on logout
- Rate limiting issues (unless account lockout bypass)
- SPF/DKIM/DMARC misconfigurations
- Publicly known vulnerabilities on outdated software (unless exploitable)
- Social engineering

## Rules to Remember

- **Always re-read the policy** before testing — programs update scope
- **Don't access other users' data** beyond what's needed to prove the bug
- **Don't automate aggressively** — respect rate limits, don't DoS
- **Report first, chain later** — if you find a critical bug, report it; you can always add chain details
- **Screenshot everything** — platforms sometimes lose context
