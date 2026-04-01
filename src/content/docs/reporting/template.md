---
title: "Report Template"
---

## Copy-Paste Template

Use this for every submission. Fill in the sections, delete what doesn't apply.

---

### Title

`[Vuln Type] — [Where] — [Impact summary]`

Examples:
- `Stored XSS in comment field leads to session hijacking`
- `IDOR on /api/users/{id} exposes PII of all users`
- `SSRF via PDF export reaches AWS metadata endpoint`

### Summary

One paragraph. What the vulnerability is, where it exists, and what an attacker can do with it. Write this for someone who won't read the rest.

### Severity

**Severity:** Critical / High / Medium / Low

**Justification:** (Why this severity — what's the realistic worst case?)

### Affected Asset

- **URL / Endpoint:** 
- **Parameter:** 
- **Affected component:** 

### Steps to Reproduce

```
1. Log in as a standard user at https://target.com/login
2. Navigate to https://target.com/settings/profile
3. In the "Display Name" field, enter: [payload]
4. Click "Save"
5. Open a new incognito window and log in as a different user
6. Navigate to https://target.com/users/[attacker-profile]
7. Observe [what happens]
```

### Proof of Concept

<!-- Screenshots, video, or HTTP requests/responses -->
<!-- For Burp requests, include the full request and relevant response -->

**Request:**
```http
POST /api/profile HTTP/2
Host: target.com
Cookie: session=abc123
Content-Type: application/json

{"name": "<img src=x onerror=alert(document.domain)>"}
```

**Response:**
```http
HTTP/2 200 OK
Content-Type: application/json

{"status": "success", "name": "<img src=x onerror=alert(document.domain)>"}
```

### Impact

Explain in business terms what an attacker can achieve:
- What data can be accessed or modified?
- Which users are affected (all users, admins, specific roles)?
- What's the blast radius?

### Remediation

Suggest a fix:
- Input validation / output encoding
- Access control checks
- Token validation
- Specific library or function to use

---

## Quick Templates by Bug Type

### IDOR

```
Title: IDOR on [endpoint] allows [action] on other users' [resource]

Steps:
1. As User A, perform [action] and capture the request
2. Note the [resource ID] in the request: [value]
3. Change [resource ID] to a value belonging to User B
4. Observe that User A can [read/modify/delete] User B's [resource]

Impact: Any authenticated user can [action] on any other user's [resource],
affecting [scope — all users / users in same org / etc.]
```

### XSS

```
Title: [Stored/Reflected] XSS in [location] via [parameter]

Steps:
1. Navigate to [URL]
2. Enter the following payload in [field/parameter]: [payload]
3. [Submit / observe reflection]
4. The JavaScript executes in the context of [domain]

Impact: An attacker can execute arbitrary JavaScript in the victim's browser,
enabling [cookie theft / session hijacking / account takeover / phishing].

PoC payload: [payload]
```

### SSRF

```
Title: SSRF via [feature] allows access to [what]

Steps:
1. Navigate to [feature]
2. In the [URL/parameter field], enter: [internal URL]
3. [Submit / trigger the request]
4. Observe the server makes a request to [internal resource]
5. The response contains [what was returned]

Impact: An attacker can make the server request internal resources,
including [metadata endpoint / internal APIs / admin panels].
```
