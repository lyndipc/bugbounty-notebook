---
title: "Authentication Bugs"
---

## What It Is

Authentication bugs let attackers bypass login, take over accounts, or escalate privileges. These are consistently high-severity findings.

## Where to Look

- Login, registration, password reset flows
- 2FA / MFA implementation
- OAuth / SSO flows
- Session management (cookies, tokens)
- "Remember me" functionality
- Account recovery / security questions
- API authentication (JWT, API keys)

## Account Takeover Vectors

### Password Reset Flaws

```
# Token in URL — check if it's predictable or reusable
GET /reset-password?token=abc123

# Host header injection — does the reset link use Host header?
POST /forgot-password
Host: evil.com
→ Reset link sent to victim contains evil.com

# Token not invalidated after use
→ Use same reset link twice

# Token not tied to specific user
→ Request reset for user A, use token for user B

# Rate limiting on reset endpoint
→ Brute-force short tokens
```

### 2FA Bypass

```
# Skip the 2FA step — go directly to the post-login page
# After entering password, instead of /verify-2fa, go to /dashboard

# Brute-force OTP codes (4-6 digits)
# Check for rate limiting

# Response manipulation
# If response has {"success": false} → change to {"success": true}

# Backup codes — are they predictable?

# 2FA not required on all auth methods
# Main login has 2FA, but OAuth login skips it
```

### OAuth / SSO

```
# Open redirect in OAuth callback
?redirect_uri=https://evil.com

# State parameter missing or not validated
→ CSRF on OAuth flow

# Token leakage via Referer header

# Account linking — link attacker OAuth to victim account

# Email not verified on OAuth registration
→ Register with victim's email via OAuth provider that doesn't verify
```

## Session Management

```bash
# Session fixation — can you set a session ID before login?

# Session not invalidated on password change
→ Change password, old sessions still work

# Session not invalidated on logout
→ Capture token, logout, replay token

# Predictable session tokens
→ Collect multiple tokens, look for patterns

# JWT issues
# Check for alg:none
echo -n '{"alg":"none","typ":"JWT"}' | base64 | tr -d '=' 
# Weak secret — crack with jwt_tool or hashcat
# Missing signature verification
# Token not expired
```

## Registration Flaws

```
# Duplicate registration with different case
admin@target.com vs Admin@target.com

# Unicode normalization
admin@target.com vs ℀dmin@target.com

# Email verification bypass
→ Register, don't verify, check if account is functional

# Admin registration endpoint exposed
POST /api/admin/register
```

## Findings

| Flow | Bug Type | Impact | Status |
|------|----------|--------|--------|
| | | | |
