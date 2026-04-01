---
title: "Tech Fingerprinting"
---

## Key Concepts

Knowing the tech stack tells you which bugs to look for. A Rails app has different common vulns than a Spring Boot app. Fingerprinting saves testing time.

## Automated Fingerprinting

```bash
# Wappalyzer via httpx
cat live-hosts.txt | httpx -tech-detect -silent -o tech-results.txt

# whatweb
whatweb https://<TARGET> -v

# webanalyze (Wappalyzer CLI)
webanalyze -host https://<TARGET> -crawl 2
```

## Manual Checks

```bash
# Response headers
curl -sI https://<TARGET> | grep -iE '(server|x-powered|x-aspnet|x-generator|x-drupal|x-framework)'

# Cookies can reveal framework
curl -sI https://<TARGET> | grep -i 'set-cookie'
# PHPSESSID → PHP
# JSESSIONID → Java
# connect.sid → Express/Node
# _rails_session → Ruby on Rails
# ASP.NET_SessionId → .NET
# laravel_session → Laravel

# Error pages — force a 404
curl -s https://<TARGET>/thispagedoesnotexist12345 | head -50

# robots.txt often reveals CMS
curl -s https://<TARGET>/robots.txt
```

## CMS-Specific Checks

```bash
# WordPress
curl -s https://<TARGET>/wp-login.php -o /dev/null -w "%{http_code}"
curl -s https://<TARGET>/wp-json/wp/v2/users

# Drupal
curl -s https://<TARGET>/CHANGELOG.txt | head -5

# Joomla
curl -s https://<TARGET>/administrator/ -o /dev/null -w "%{http_code}"

# Spring Boot actuator
curl -s https://<TARGET>/actuator -o /dev/null -w "%{http_code}"
curl -s https://<TARGET>/actuator/env
curl -s https://<TARGET>/actuator/health
```

## What Tech Stack Tells You

| Technology | Common Bugs to Test |
|-----------|-------------------|
| PHP | LFI, RFI, type juggling, deserialization |
| Java / Spring | SSTI, SSRF, Spring4Shell, actuator exposure |
| Node.js / Express | Prototype pollution, SSRF, NoSQL injection |
| Ruby on Rails | Mass assignment, SSTI (ERB), IDOR via predictable IDs |
| .NET | ViewState deserialization, path traversal, CSRF |
| Python / Django | SSTI (Jinja2), debug mode info leak, IDOR |
| WordPress | Plugin vulns, xmlrpc abuse, user enum |
| GraphQL | Introspection queries, auth bypass, injection |

## Findings

<!-- Record tech stack for this target -->

| Host | Tech Stack | Version (if known) | Notes |
|------|-----------|-------------------|-------|
| | | | |
