---
title: "Writing Tips"
---

## The Golden Rule

Write your report for a triager who has 5 minutes and 50 other reports to review. Make it impossible to misunderstand.

## Do

- **Lead with impact** — the first sentence should make the triager care
- **Be specific** — "any authenticated user can read any other user's medical records" not "data leak"
- **Number your steps** — every repro step gets a number
- **Include evidence** — screenshots, request/response pairs, video if complex
- **Test your own repro** — follow your steps from scratch before submitting
- **Suggest a fix** — shows you understand the root cause
- **Be concise** — every sentence should add information

## Don't

- **Don't pad your report** — triagers hate filler text
- **Don't use jargon without explanation** — not everyone knows what "BOLA" means
- **Don't submit without a PoC** — "I think this might be vulnerable" gets closed
- **Don't be adversarial** — triagers are people, be professional
- **Don't submit known/wontfix issues** — check disclosed reports first
- **Don't over-claim severity** — a reflected XSS on a static marketing page isn't Critical

## Writing the Impact Section

Bad:
> This is a critical vulnerability that could allow an attacker to compromise the application.

Good:
> An attacker can change any user's email address without authentication by modifying the `user_id` parameter in the PUT /api/users/{id}/email endpoint. Combined with a password reset, this leads to full account takeover of any user, including administrators. Approximately 50,000 users are affected based on publicly visible user IDs.

## Severity Calibration

Ask yourself these questions:

1. **Who can exploit this?** (unauthenticated? any user? only admin?)
2. **What's the worst realistic outcome?** (not theoretical maximum)
3. **How many users are affected?**
4. **Does it require user interaction?** (clicking a link? visiting a page?)
5. **Is there a compensating control?** (WAF? rate limit? 2FA?)

## Handling Triage Responses

| Response | Action |
|----------|--------|
| "Not reproducible" | Re-test, provide more detail, offer to screen share |
| "Informational" | Explain the attack chain and real-world impact |
| "Duplicate" | Accept it, move on, learn what others test |
| "Out of scope" | Verify scope, if correct then accept |
| "Won't fix" | Respectfully explain the risk, then accept their decision |
| "Need more info" | Respond quickly with exactly what they asked for |

## Response Time Matters

Respond to triager questions within 24 hours. Stale reports get deprioritized or closed.
