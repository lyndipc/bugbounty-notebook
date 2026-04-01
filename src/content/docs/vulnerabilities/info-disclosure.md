---
title: "Information Disclosure"
---

## What It Is

Information disclosure exposes sensitive data that helps attackers — internal IPs, stack traces, credentials, PII, or API keys. Severity depends entirely on what's leaked.

## Where to Look

- Error pages (trigger 500 errors with malformed input)
- Debug endpoints (`/debug`, `/trace`, `/actuator/env`)
- Source code comments in HTML
- API responses with excessive data
- `.env` files, `.git` directories
- Backup files (`.bak`, `.old`, `.swp`)
- HTTP response headers
- Robots.txt / sitemap.xml

## Quick Checks

```bash
# Git exposure
curl -s https://<TARGET>/.git/HEAD
curl -s https://<TARGET>/.git/config
# If accessible — use git-dumper to download full repo
git-dumper https://<TARGET>/.git/ ./git-dump

# Environment files
curl -s https://<TARGET>/.env
curl -s https://<TARGET>/.env.bak
curl -s https://<TARGET>/.env.production

# Debug / status endpoints
curl -s https://<TARGET>/debug
curl -s https://<TARGET>/server-status
curl -s https://<TARGET>/server-info
curl -s https://<TARGET>/phpinfo.php
curl -s https://<TARGET>/elmah.axd
curl -s https://<TARGET>/trace.axd

# Verbose error — send malformed input
curl -s "https://<TARGET>/api/user/abc"   # string where int expected
curl -s "https://<TARGET>/api/user/-1"
curl -s "https://<TARGET>/api/user/{{7*7}}"

# Response headers
curl -sI https://<TARGET> | grep -iE '(server|x-powered|x-debug|x-aspnet|via|x-request-id)'
```

## What's Worth Reporting

| Finding | Severity | Notes |
|---------|----------|-------|
| Leaked API keys / credentials | High–Critical | Especially if they work |
| .git exposure with source code | High | Full source = many more bugs |
| Stack traces with internal paths | Low–Medium | Useful info but limited direct impact |
| .env with database credentials | Critical | If database is accessible |
| PII in API responses | Medium–High | Depends on data type |
| Internal IP addresses | Low | Only useful for chaining |
| Software versions in headers | Informational | Usually not accepted alone |

## Findings

| Endpoint | Data Exposed | Severity | Status |
|----------|-------------|----------|--------|
| | | | |
