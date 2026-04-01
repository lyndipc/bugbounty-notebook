---
title: "Business Logic"
---

## What It Is

Business logic bugs are flaws in the application's intended workflow. They can't be found by scanners — you need to understand how the app is supposed to work and then break those assumptions.

## Where to Look

- E-commerce: pricing, discounts, quantities, shipping
- Financial: transfers, balances, currency conversion
- User management: roles, permissions, invitations
- Subscription / billing: trial abuse, plan changes
- Content: access controls, sharing, export

## Testing Approach

### Price Manipulation

```
# Negative quantities
{"item": "widget", "quantity": -1, "price": 10.00}
→ Does it credit your account?

# Zero-price items
{"item": "premium", "quantity": 1, "price": 0}

# Price override in request body
# If price is sent client-side, modify it
{"item": "laptop", "price": 0.01}

# Currency rounding
# Transfer $0.001 × 1000 — do rounding errors accumulate?

# Coupon stacking
# Apply multiple discount codes to the same order
```

### Workflow Bypass

```
# Skip steps in a multi-step process
# Step 1: Add to cart → Step 2: Checkout → Step 3: Pay
# Go directly from Step 1 to Step 3

# Modify state between steps
# Add cheap item → start checkout → swap item in cart → complete payment

# Access control on steps
# Can you access /checkout/confirm without completing /checkout/payment?
```

### Limit Bypass

```
# Exceeding limits
# "Maximum 3 free trials" — can you create trial #4?
# "One coupon per account" — does it check by account, email, or IP?

# Negative values to bypass minimums
# Minimum transfer: $10 — try transferring $-5

# Boundary testing
# Max file size: 10MB — what happens at exactly 10MB? 10.001MB?
```

## Checklist

- [ ] Can I get items for free or below cost?
- [ ] Can I manipulate quantities, prices, or discounts?
- [ ] Can I skip required steps in a workflow?
- [ ] Can I access features above my subscription tier?
- [ ] Can I exceed intended usage limits?
- [ ] Can I abuse referral / reward systems?
- [ ] Can I perform actions out of intended order?
- [ ] Can I manipulate time-based restrictions?

## Findings

| Feature | Logic Flaw | Impact | Status |
|---------|-----------|--------|--------|
| | | | |
