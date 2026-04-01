---
title: "Burp Suite"
---

## Setup

1. Set browser proxy to `127.0.0.1:8080`
2. Install Burp CA cert for HTTPS interception
3. Add target scope — right-click target in site map → "Add to scope"
4. Filter proxy history to show only in-scope items

## Essential Workflow

```
1. Browse the app manually with Burp proxying
2. Review site map for interesting endpoints
3. Send interesting requests to Repeater (Ctrl+R)
4. Test parameters in Repeater
5. Use Intruder for fuzzing / brute-forcing
6. Check Scanner results (Pro only)
```

## Repeater Tips

- Test one parameter at a time
- Compare responses side-by-side (right-click → "Send to Comparer")
- Use "Follow redirections" to see final response
- Check response time for timing-based bugs

## Intruder Payloads

```
# Attack types:
# Sniper — one payload, one position at a time
# Battering Ram — same payload in all positions
# Pitchfork — different payload list per position (parallel)
# Cluster Bomb — all combinations (careful with large lists)

# Useful for:
# - Parameter fuzzing
# - Credential stuffing (Pitchfork: users + passwords)
# - IDOR (sequential IDs)
# - Content discovery
```

## Match & Replace Rules

```
# Auto-add headers for testing
# Proxy → Options → Match and Replace

# Add auth header to all requests
Match: (leave empty)
Replace: X-Forwarded-For: 127.0.0.1
Type: Request header

# Upgrade HTTP to HTTPS
Match: http://
Replace: https://
Type: Request header
```

## Extensions Worth Installing

| Extension | Purpose |
|-----------|---------|
| **Turbo Intruder** | Fast, scriptable fuzzing (race conditions) |
| **Autorize** | Automated IDOR/BAC testing between two sessions |
| **Logger++** | Advanced logging and filtering |
| **Param Miner** | Hidden parameter discovery |
| **JWT Editor** | JWT manipulation and attacks |
| **Collaborator Everywhere** | Inject callback payloads in headers |
| **Hackvertor** | Encoding/decoding within requests |
| **Active Scan++** | Enhanced scanning |

## Autorize Setup (IDOR Testing)

```
1. Install Autorize extension
2. Log in as User A (low-privilege) in browser through Burp
3. Copy User A's session cookie
4. In Autorize: paste User A's cookie
5. Browse the app as User B (higher-privilege)
6. Autorize replays every request with User A's session
7. Green = both get same response (potential IDOR)
8. Red = properly blocked
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+R` | Send to Repeater |
| `Ctrl+I` | Send to Intruder |
| `Ctrl+Space` | Send request (in Repeater) |
| `Ctrl+Shift+D` | Switch to Dashboard |
| `Ctrl+Shift+P` | Switch to Proxy |
| `Ctrl+Shift+R` | Switch to Repeater |
