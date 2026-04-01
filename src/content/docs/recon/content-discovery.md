---
title: "Content Discovery"
---

## Key Concepts

Content discovery finds hidden endpoints, admin panels, backup files, and forgotten functionality. This is where you find bugs other hunters miss.

## Directory / File Fuzzing

```bash
# ffuf — fast, flexible
ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt \
     -u https://<TARGET>/FUZZ -mc 200,301,302,403 -o ffuf-dirs.json

# With extensions
ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt \
     -u https://<TARGET>/FUZZ -e .php,.asp,.aspx,.jsp,.json,.xml,.txt,.bak,.old,.config -mc 200,301,302,403

# Recursive
ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt \
     -u https://<TARGET>/FUZZ -recursion -recursion-depth 2 -mc 200,301,302,403
```

## Interesting Files to Look For

```bash
# Backup / config files
ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt \
     -u https://<TARGET>/FUZZ -e .bak,.old,.swp,.zip,.tar.gz,.sql,.conf,.env,.git

# Common sensitive files
ffuf -w - -u https://<TARGET>/FUZZ << 'EOF'
.env
.git/HEAD
.git/config
wp-config.php.bak
config.php.old
database.sql
backup.zip
debug.log
phpinfo.php
server-status
server-info
.htaccess
web.config
crossdomain.xml
sitemap.xml
robots.txt
EOF
```

## Wordlists Worth Using

| Wordlist | Use Case |
|----------|----------|
| `directory-list-2.3-medium.txt` | General directory fuzzing |
| `common.txt` | Quick first pass |
| `raft-large-files.txt` | File discovery |
| `api/api-endpoints.txt` | API endpoint discovery |
| `quickhits.txt` | Common misconfigs and leaks |
| `spring-boot.txt` | Spring Boot actuator endpoints |

## 403 Bypass Attempts

If you hit a 403 on an interesting path, try bypasses before moving on:

```bash
# Path traversal variants
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>/admin
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>/admin/
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>/admin/.
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>//admin
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>/./admin
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>/admin%20
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>/admin%09
curl -s -o /dev/null -w "%{http_code}" https://<TARGET>/admin..;/
```

## Findings

<!-- Record interesting paths/files found -->

| Path | Status | Notes |
|------|--------|-------|
| | | |
