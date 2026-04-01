---
title: "Subdomain Enumeration"
---

## Key Concepts

Subdomain enumeration is the most important recon phase. Every subdomain is a potential new attack surface — forgotten dev environments, staging servers, internal tools exposed to the internet.

## Passive Enumeration

```bash
# Subfinder — fast, uses many passive sources
subfinder -d <TARGET> -all -o subs-passive.txt

# Amass passive mode
amass enum -passive -d <TARGET> -o subs-amass.txt

# crt.sh via curl (certificate transparency)
curl -s "https://crt.sh/?q=%25.<TARGET>&output=json" | jq -r '.[].name_value' | sort -u > subs-crt.txt

# Combine and deduplicate
cat subs-*.txt | sort -u > all-subs.txt
```

## Active Enumeration

```bash
# DNS brute-force with puredns
puredns bruteforce /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt <TARGET> -r resolvers.txt -w subs-brute.txt

# Resolve all discovered subdomains
puredns resolve all-subs.txt -r resolvers.txt -w resolved-subs.txt

# Get live HTTP hosts
cat resolved-subs.txt | httpx -silent -status-code -title -tech-detect -o live-hosts.txt
```

## Permutation / Mutation

```bash
# gotator — generate permutations from known subs
gotator -sub resolved-subs.txt -perm /path/to/permutations.txt -depth 1 -numbers 3 -md | \
  puredns resolve -r resolvers.txt -w permuted-subs.txt

# alterx — pattern-based
cat resolved-subs.txt | alterx -enrich | puredns resolve -r resolvers.txt
```

## Screenshot All Hosts

```bash
# gowitness
gowitness scan file -f live-hosts.txt --screenshot-path ./screenshots

# aquatone (alternative)
cat live-hosts.txt | aquatone -out aquatone-results
```

## Findings

<!-- Record what you found for this target -->

| Subdomain | Status | Tech | Notes |
|-----------|--------|------|-------|
| | | | |
