---
title: "Recon Automation"
---

## Full Recon Pipeline

Run this end-to-end when starting a new target. Each step feeds into the next.

```bash
# Set target
export TARGET="example.com"
mkdir -p ~/targets/$TARGET/{subs,scans,content,js,screenshots}
cd ~/targets/$TARGET
```

## Step 1: Subdomain Enumeration

```bash
# Passive sources
subfinder -d $TARGET -all -o subs/passive.txt
amass enum -passive -d $TARGET -o subs/amass.txt

# Certificate transparency
curl -s "https://crt.sh/?q=%25.$TARGET&output=json" | jq -r '.[].name_value' | sort -u > subs/crt.txt

# Combine
cat subs/*.txt | sort -u > subs/all.txt
echo "[*] Total unique subdomains: $(wc -l < subs/all.txt)"
```

## Step 2: DNS Resolution

```bash
# Resolve to live hosts
puredns resolve subs/all.txt -r ~/wordlists/resolvers.txt -w subs/resolved.txt
echo "[*] Resolved: $(wc -l < subs/resolved.txt)"
```

## Step 3: HTTP Probing

```bash
# Find live HTTP hosts with tech detection
cat subs/resolved.txt | httpx -silent -status-code -title -tech-detect \
  -follow-redirects -o subs/live-http.txt

# Extract just URLs
cat subs/live-http.txt | awk '{print $1}' > subs/live-urls.txt
echo "[*] Live HTTP hosts: $(wc -l < subs/live-urls.txt)"
```

## Step 4: Port Scanning

```bash
# Fast port scan
cat subs/resolved.txt | naabu -top-ports 1000 -silent -o scans/open-ports.txt
echo "[*] Open ports found: $(wc -l < scans/open-ports.txt)"
```

## Step 5: Screenshots

```bash
gowitness scan file -f subs/live-urls.txt --screenshot-path ./screenshots
```

## Step 6: Content Discovery

```bash
# Fuzz all live hosts
cat subs/live-urls.txt | while read url; do
  domain=$(echo "$url" | awk -F/ '{print $3}')
  ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt \
       -u "${url}/FUZZ" -mc 200,301,302,403 -t 50 -silent \
       -o "content/ffuf-${domain}.json" 2>/dev/null
done
```

## Step 7: JS File Collection

```bash
cat subs/live-urls.txt | katana -jc -d 3 -ef css,png,jpg,gif,svg,woff,ico \
  -f qurl 2>/dev/null | grep "\.js$" | sort -u > js/js-files.txt
echo "[*] JS files found: $(wc -l < js/js-files.txt)"
```

## Step 8: Nuclei Scan

```bash
nuclei -l subs/live-urls.txt -severity medium,high,critical \
  -o scans/nuclei-results.txt -silent
echo "[*] Nuclei findings: $(wc -l < scans/nuclei-results.txt)"
```

## Quick One-Liner (Minimal Recon)

```bash
# Subdomains → resolve → probe → screenshot — all in one
subfinder -d $TARGET -silent | puredns resolve -r ~/wordlists/resolvers.txt | \
  httpx -silent | tee live.txt | gowitness scan file -f - --screenshot-path ./screenshots
```
