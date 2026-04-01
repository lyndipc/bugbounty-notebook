---
title: "Ffuf"
---

## Directory Fuzzing

```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/directory-list-2.3-medium.txt \
     -u https://<TARGET>/FUZZ -mc 200,301,302,403
```

## File Fuzzing

```bash
ffuf -w /usr/share/seclists/Discovery/Web-Content/raft-large-files.txt \
     -u https://<TARGET>/FUZZ -mc 200,301,302,403

# With extensions
ffuf -w /usr/share/seclists/Discovery/Web-Content/common.txt \
     -u https://<TARGET>/FUZZ -e .php,.asp,.aspx,.jsp,.json,.xml,.txt,.bak,.env,.config,.old
```

## Vhost / Subdomain Fuzzing

```bash
ffuf -w /usr/share/seclists/Discovery/DNS/subdomains-top1million-5000.txt \
     -u https://<TARGET> -H "Host: FUZZ.<TARGET>" \
     -fs <DEFAULT_SIZE>
```

## Parameter Discovery

```bash
# GET parameters
ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt \
     -u "https://<TARGET>/endpoint?FUZZ=test" -fs <DEFAULT_SIZE>

# POST parameters
ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt \
     -u https://<TARGET>/endpoint -X POST -d "FUZZ=test" \
     -H "Content-Type: application/x-www-form-urlencoded" -fs <DEFAULT_SIZE>

# JSON parameters
ffuf -w /usr/share/seclists/Discovery/Web-Content/burp-parameter-names.txt \
     -u https://<TARGET>/api/endpoint -X POST \
     -d '{"FUZZ":"test"}' -H "Content-Type: application/json" -fs <DEFAULT_SIZE>
```

## API Endpoint Fuzzing

```bash
# REST API paths
ffuf -w /usr/share/seclists/Discovery/Web-Content/api/api-endpoints.txt \
     -u https://<TARGET>/api/FUZZ -mc 200,201,204,301,302,401,403,405

# API versioning
ffuf -w - -u https://<TARGET>/api/FUZZ/users << 'EOF'
v1
v2
v3
v4
EOF
```

## Authenticated Fuzzing

```bash
ffuf -w <WORDLIST> -u https://<TARGET>/FUZZ \
     -H "Cookie: session=<COOKIE>" \
     -H "Authorization: Bearer <TOKEN>" \
     -mc 200,301,302,403
```

## Useful Flags

| Flag | Purpose |
|------|---------|
| `-fs <size>` | Filter by response size |
| `-fc <code>` | Filter by status code |
| `-fw <words>` | Filter by word count |
| `-fl <lines>` | Filter by line count |
| `-mc <code>` | Match status code |
| `-ms <size>` | Match response size |
| `-e .php,.txt` | Extensions to append |
| `-r` | Follow redirects |
| `-recursion -recursion-depth 2` | Recursive fuzzing |
| `-t 50` | Thread count |
| `-rate 100` | Requests per second limit |
| `-timeout 10` | Request timeout |
| `-o results.json -of json` | Output to file |
| `-ic` | Ignore wordlist comments |
| `-ac` | Auto-calibrate filtering |
