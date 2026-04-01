---
title: "API Discovery"
---

## Key Concepts

APIs are often less hardened than the main web UI. They may skip CSRF checks, have weaker auth, or expose internal data. Finding undocumented API endpoints is a high-value recon activity.

## Finding API Endpoints

```bash
# Fuzz for API paths
ffuf -w /usr/share/seclists/Discovery/Web-Content/api/api-endpoints.txt \
     -u https://<TARGET>/FUZZ -mc 200,201,204,301,302,401,403,405

# Common API base paths to check
ffuf -w - -u https://<TARGET>/FUZZ << 'EOF'
api
api/v1
api/v2
api/v3
graphql
graphql/console
swagger
swagger.json
swagger-ui
swagger-ui.html
api-docs
openapi.json
openapi.yaml
docs
redoc
_debug_toolbar
EOF

# Check for GraphQL
curl -s https://<TARGET>/graphql -d '{"query":"{__schema{types{name}}}"}' \
     -H "Content-Type: application/json"
```

## API Documentation Discovery

```bash
# Swagger / OpenAPI
curl -s https://<TARGET>/swagger.json | jq '.paths | keys[]'
curl -s https://<TARGET>/api-docs | jq '.paths | keys[]'
curl -s https://<TARGET>/openapi.json | jq '.paths | keys[]'

# Postman collections (sometimes leaked)
curl -s https://<TARGET>/api.postman_collection.json
```

## GraphQL Enumeration

```bash
# Introspection query
curl -s https://<TARGET>/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __schema { queryType { name } mutationType { name } types { name fields { name } } } }"}' | jq .

# If introspection is disabled, try field suggestions
curl -s https://<TARGET>/graphql \
  -H "Content-Type: application/json" \
  -d '{"query":"{ __typ }"}' 
# Check error for field suggestions
```

## API Testing Checklist

- [ ] Authentication — can you access endpoints without a token?
- [ ] Authorization — can user A access user B's data via API?
- [ ] Rate limiting — are API endpoints rate-limited?
- [ ] Input validation — does the API validate types, lengths, formats?
- [ ] Mass assignment — can you send extra fields that get processed?
- [ ] BOLA/IDOR — change IDs in API requests
- [ ] Verbose errors — do API errors leak internal info?
- [ ] API versioning — are old API versions still accessible?
- [ ] CORS — check `Access-Control-Allow-Origin` headers

## Findings

<!-- Record API endpoints found -->

| Endpoint | Method | Auth Required | Notes |
|----------|--------|---------------|-------|
| | | | |
