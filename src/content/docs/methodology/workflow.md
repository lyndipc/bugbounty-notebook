---
title: "Workflow"
---

## Target Onboarding

When you clone this repo for a new target, fill in these details first:

| Field | Value |
|-------|-------|
| **Program** | |
| **Platform** | HackerOne / Bugcrowd / Intigriti / Self-hosted |
| **In-scope domains** | |
| **Out-of-scope** | |
| **Bounty range** | |
| **Response SLA** | |
| **Program start date** | |
| **Notes** | |

## My Workflow

### Phase 1: Recon (Day 1–2)

- [ ] Read program policy thoroughly
- [ ] Subdomain enumeration (passive + active)
- [ ] Port scan on all discovered hosts
- [ ] Content discovery on web apps
- [ ] Technology fingerprinting
- [ ] JS file analysis for endpoints, secrets
- [ ] API endpoint discovery
- [ ] Screenshot all interesting pages
- [ ] Map application functionality

### Phase 2: Testing (Day 2+)

- [ ] Walk through the app as a normal user first
- [ ] Test authentication flows (signup, login, reset, 2FA)
- [ ] Test authorization (IDOR, privilege escalation, role bypass)
- [ ] Test all input fields for injection (XSS, SQLi, SSTI, command injection)
- [ ] Test file upload if present
- [ ] Test for SSRF on any URL/fetch parameters
- [ ] Check for open redirects
- [ ] Check for CSRF on state-changing actions
- [ ] Look for race conditions on sensitive operations
- [ ] Review business logic (coupons, balances, limits)
- [ ] Check for info disclosure (error messages, stack traces, headers)

### Phase 3: Report & Follow-Up

- [ ] Write report with full reproduction steps
- [ ] Include screenshots / video PoC
- [ ] Describe impact clearly
- [ ] Suggest remediation
- [ ] Submit and track status

## Time Boxing

Don't spend infinite time on a single target. A rough guide:

| Activity | Time |
|----------|------|
| Recon | 2–4 hours |
| Quick wins testing | 2–3 hours |
| Deep testing per feature | 1–2 hours each |
| Report writing | 30–60 min per finding |

If you're not finding anything after 6–8 hours of focused testing, consider moving to a different target or attack surface.
