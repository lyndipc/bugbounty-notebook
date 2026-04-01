---
title: "IDOR / Broken Access Control"
---

## What It Is

Insecure Direct Object Reference (IDOR) and Broken Access Control (BAC) let you access or modify other users' data by changing object identifiers (IDs, UUIDs, filenames) in requests.

## Where to Look

- Any request with a user ID, document ID, order ID, etc.
- API endpoints: `/api/users/123`, `/api/orders/456`
- File download endpoints: `/download?file=report_123.pdf`
- Profile/settings pages: `/user/profile/123`
- Invitation/sharing links
- Password reset tokens
- Any action that references a specific resource

## Testing

```bash
# 1. Create two accounts (user A and user B)
# 2. Perform actions as user A, capture the requests
# 3. Swap user A's resource IDs with user B's IDs
# 4. Check if user A can access/modify user B's data

# Things to swap in requests:
# - Numeric IDs: 123 → 124
# - UUIDs: try other users' UUIDs
# - Usernames/emails in parameters
# - File paths/names
```

## Common IDOR Patterns

```
# Direct ID reference
GET /api/users/123/profile        → change 123 to 124
GET /api/invoices/456             → change 456 to 457
DELETE /api/comments/789          → delete someone else's comment

# ID in body
POST /api/transfer
{"from_account": "A", "to_account": "B", "amount": 100}
→ Change from_account to someone else's

# ID in headers or cookies
X-User-ID: 123                   → change to 124

# Predictable file paths
/uploads/user_123/avatar.jpg     → /uploads/user_124/avatar.jpg
/reports/2024/report-00123.pdf   → /reports/2024/report-00124.pdf
```

## Privilege Escalation via BAC

```bash
# Horizontal: access another user's resources at the same privilege level
# Vertical: access admin-level resources as a regular user

# Test admin endpoints as regular user
GET /admin/users                 → with regular user session
POST /api/admin/delete-user      → with regular user session
PUT /api/users/123/role          → try setting role to "admin"

# Test by removing/modifying role parameters
# If the app sends {"role": "user"} — try {"role": "admin"}

# Check if frontend-only restrictions exist
# Sometimes the UI hides admin features but the API accepts them
```

## UUID/GUID Enumeration

When IDs are UUIDs, they're harder to guess. Look for:

- UUIDs leaked in other responses (user lists, search results, public profiles)
- UUIDs in URLs (shared links, email notifications)
- Sequential UUID v1 (time-based — can be predicted)
- UUID generation patterns

## Proving Impact

Show you can access or modify another user's data. Always use your own test accounts — never access real user data.

## Findings

| Endpoint | Parameter | Access Type | Impact | Status |
|----------|-----------|-------------|--------|--------|
| | | Horizontal / Vertical | | |
