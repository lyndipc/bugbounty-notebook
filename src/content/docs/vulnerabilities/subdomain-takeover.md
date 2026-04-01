---
title: "Subdomain Takeover"
---

## What It Is

When a subdomain's DNS record (usually CNAME) points to an external service that's been deprovisioned, an attacker can claim that service and serve content on the victim's subdomain.

## Detection

```bash
# Check for dangling CNAMEs
dig CNAME sub.<TARGET>
# If CNAME → something.amazonaws.com / herokuapp.com / etc.
# AND the service returns 404 / "no such bucket" → potential takeover

# Automated — subjack
subjack -w resolved-subs.txt -t 100 -timeout 30 -ssl -v -o takeover-results.txt

# Automated — nuclei
nuclei -l resolved-subs.txt -t takeover/ -o nuclei-takeover.txt

# can-i-take-over-xyz reference
# https://github.com/EdOverflow/can-i-take-over-xyz
```

## Common Vulnerable Services

| Service | CNAME Pattern | How to Verify |
|---------|--------------|---------------|
| AWS S3 | `*.s3.amazonaws.com` | "NoSuchBucket" error |
| GitHub Pages | `*.github.io` | 404 page |
| Heroku | `*.herokuapp.com` | "No such app" |
| Shopify | `*.myshopify.com` | "Sorry, this shop is currently unavailable" |
| Azure | `*.azurewebsites.net` | Default Azure 404 |
| Fastly | `*.fastly.net` | Fastly error page |
| Ghost | `*.ghost.io` | Ghost 404 |
| Pantheon | `*.pantheonsite.io` | Pantheon 404 |

## Exploitation

```
# 1. Confirm the CNAME points to an unclaimed resource
# 2. Create/claim that resource on the service provider
# 3. Serve a proof page (e.g., "subdomain takeover by [your-handle]")
# 4. Screenshot as evidence
# 5. Report immediately

# DO NOT serve malicious content or phishing pages
```

## Findings

| Subdomain | CNAME Target | Service | Status |
|-----------|-------------|---------|--------|
| | | | |
