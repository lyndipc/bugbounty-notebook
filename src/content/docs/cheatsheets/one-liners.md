---
title: "One-Liners"
---

## Recon One-Liners

```bash
# Subdomains → resolve → live HTTP hosts
subfinder -d <TARGET> -silent | puredns resolve -r resolvers.txt | httpx -silent

# Find all JS files from a domain
echo <TARGET> | katana -jc -d 3 -silent | grep "\.js$" | sort -u

# Extract URLs from Wayback Machine
echo <TARGET> | waybackurls | sort -u | tee wayback-urls.txt

# Find potentially interesting wayback URLs
echo <TARGET> | waybackurls | grep -iE "\.(php|asp|aspx|jsp|json|xml|config|env|sql|bak|old|log|txt)$" | sort -u

# Quick subdomain + screenshot
subfinder -d <TARGET> -silent | httpx -silent | gowitness scan file -f - --screenshot-path ./screenshots
```

## Fuzzing One-Liners

```bash
# Fuzz for hidden parameters on a URL
arjun -u https://<TARGET>/endpoint

# Fuzz for backup files
ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt \
     -u https://<TARGET>/FUZZ -e .bak,.old,.swp,.zip,.tar.gz,.sql -mc 200 -ac

# Fuzz multiple hosts from a file
cat live-urls.txt | while read url; do
  ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt \
       -u "${url}/FUZZ" -mc 200,301,403 -ac -silent
done
```

## Grep & Filter One-Liners

```bash
# Extract all URLs from a page
curl -s https://<TARGET> | grep -oP 'https?://[^"'\''<> ]+' | sort -u

# Extract emails from a page
curl -s https://<TARGET> | grep -oP '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}' | sort -u

# Find all form actions
curl -s https://<TARGET> | grep -oP 'action="[^"]+"' | sort -u

# Extract API keys from JS files
cat js-files.txt | while read url; do
  curl -s "$url" | grep -oP '(api[_-]?key|apikey|secret|token)["\s:=]+["\s]*[a-zA-Z0-9/+=-]{16,}'
done

# Find S3 buckets
curl -s https://<TARGET> | grep -oP '[a-zA-Z0-9.-]+\.s3\.amazonaws\.com' | sort -u
curl -s https://<TARGET> | grep -oP 's3://[a-zA-Z0-9.-]+' | sort -u
```

## Testing One-Liners

```bash
# Check for CORS misconfiguration
curl -s -I https://<TARGET> -H "Origin: https://evil.com" | grep -i "access-control"

# Check for open redirect
curl -s -o /dev/null -w "%{redirect_url}" "https://<TARGET>/redirect?url=https://evil.com"

# Check for CRLF injection
curl -s -I "https://<TARGET>/%0d%0aInjected-Header:true" | grep "Injected"

# Check for host header injection
curl -s https://<TARGET>/forgot-password -H "Host: evil.com" -d "email=test@test.com" -v 2>&1 | grep -i "evil.com"

# Bulk check for .git exposure
cat live-urls.txt | while read url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${url}/.git/HEAD")
  [ "$code" = "200" ] && echo "GIT EXPOSED: $url"
done

# Bulk check for .env exposure
cat live-urls.txt | while read url; do
  code=$(curl -s -o /dev/null -w "%{http_code}" "${url}/.env")
  [ "$code" = "200" ] && echo "ENV EXPOSED: $url"
done
```

## Encoding / Decoding

```bash
# URL encode
echo -n 'payload' | python3 -c "import sys,urllib.parse;print(urllib.parse.quote(sys.stdin.read()))"

# URL decode
echo -n '%3Cscript%3E' | python3 -c "import sys,urllib.parse;print(urllib.parse.unquote(sys.stdin.read()))"

# Base64 encode
echo -n 'payload' | base64

# Base64 decode
echo 'cGF5bG9hZA==' | base64 -d

# Hex encode
echo -n 'payload' | xxd -p

# Hex decode
echo '7061796c6f6164' | xxd -r -p
```
