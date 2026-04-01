---
title: "JS Analysis"
---

## Key Concepts

JavaScript files are goldmines. They contain API endpoints, hidden parameters, hardcoded secrets, and internal logic that reveals how the app works under the hood.

## Collecting JS Files

```bash
# Extract JS URLs from a live host
echo "https://<TARGET>" | katana -jc -d 3 -ef css,png,jpg,gif,svg,woff,ico \
  -f qurl | grep "\.js$" | sort -u > js-files.txt

# From Wayback Machine
echo "<TARGET>" | waybackurls | grep "\.js$" | sort -u >> js-files.txt

# Download all JS files
cat js-files.txt | xargs -I{} wget -q -P ./js-downloads/ "{}"
```

## Extracting Endpoints

```bash
# LinkFinder — extract endpoints from JS
python3 linkfinder.py -i https://<TARGET>/app.js -o cli

# Bulk extraction
cat js-files.txt | while read url; do
  python3 linkfinder.py -i "$url" -o cli
done | sort -u > js-endpoints.txt

# Manual grep for paths
grep -rhoP '["'\'']/[a-zA-Z0-9_/\-\.]+' ./js-downloads/ | sort -u
```

## Finding Secrets

```bash
# trufflehog on downloaded JS
trufflehog filesystem ./js-downloads/

# Manual regex patterns
grep -rhoP '(api[_-]?key|apikey|secret|token|password|auth)["\s:=]+["\s]*[a-zA-Z0-9/+=-]{16,}' ./js-downloads/

# Common patterns to grep for
grep -riE '(AWS_ACCESS_KEY|AKIA|sk_live|pk_live|ghp_|glpat-|xox[bsp]-|Bearer )' ./js-downloads/
```

## Source Map Analysis

```bash
# Check if source maps are exposed
curl -s https://<TARGET>/app.js.map -o /dev/null -w "%{http_code}"

# If 200 — download and extract original source
# Look for .map suffix on any JS file found
cat js-files.txt | while read url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${url}.map")
  [ "$code" = "200" ] && echo "SOURCE MAP: ${url}.map"
done
```

## What to Look For

- API endpoints not visible in the UI
- Admin/internal routes
- Hardcoded API keys, tokens, credentials
- Debug flags or feature toggles
- Comments with developer notes
- Hidden parameters in request builders
- WebSocket endpoints
- Third-party service integrations

## Findings

<!-- Record interesting findings from JS analysis -->

| File | Finding | Details |
|------|---------|---------|
| | | |
