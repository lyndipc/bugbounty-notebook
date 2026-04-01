---
title: "Nuclei"
---

## Basic Usage

```bash
# Scan single target
nuclei -u https://<TARGET> -o results.txt

# Scan list of targets
nuclei -l live-urls.txt -o results.txt

# Filter by severity
nuclei -l live-urls.txt -severity critical,high -o critical-results.txt

# Filter by tags
nuclei -l live-urls.txt -tags cve,misconfig,exposure -o results.txt
```

## Useful Scan Profiles

```bash
# Quick — exposures and misconfigs only
nuclei -l live-urls.txt -t exposures/ -t misconfiguration/ -o quick-results.txt

# Subdomain takeover
nuclei -l subs.txt -t takeover/ -o takeover-results.txt

# CVE scan
nuclei -l live-urls.txt -tags cve -severity critical,high -o cve-results.txt

# Technology-specific
nuclei -l live-urls.txt -tags wordpress -o wp-results.txt
nuclei -l live-urls.txt -tags jira -o jira-results.txt
nuclei -l live-urls.txt -tags spring -o spring-results.txt

# Default credentials
nuclei -l live-urls.txt -tags default-login -o default-creds.txt

# Info disclosure
nuclei -l live-urls.txt -tags exposure -o exposures.txt
```

## Template Management

```bash
# Update templates
nuclei -ut

# List all templates
nuclei -tl

# List templates by tag
nuclei -tl -tags cve | head -20

# Use custom template
nuclei -u https://<TARGET> -t /path/to/custom-template.yaml
```

## Writing Custom Templates

```yaml
# Basic template structure
id: custom-check

info:
  name: Custom Check Name
  author: your-name
  severity: medium
  description: What this checks for

http:
  - method: GET
    path:
      - "{{BaseURL}}/.env"
    matchers:
      - type: word
        words:
          - "DB_PASSWORD"
          - "APP_KEY"
        condition: or
      - type: status
        status:
          - 200
```

## Useful Flags

| Flag | Purpose |
|------|---------|
| `-severity critical,high` | Filter by severity |
| `-tags cve,exposure` | Filter by tag |
| `-t path/to/templates/` | Specific template directory |
| `-rl 50` | Rate limit (requests/sec) |
| `-c 25` | Concurrency |
| `-timeout 10` | Request timeout |
| `-retries 2` | Retry failed requests |
| `-silent` | Minimal output |
| `-json` | JSON output |
| `-stats` | Show scan statistics |
| `-headless` | Enable headless browser |
