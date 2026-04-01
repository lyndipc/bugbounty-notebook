---
title: "Port & Service Scan"
---

## Key Concepts

After finding live hosts, scan for open ports. Non-standard ports often host forgotten services, admin panels, or debug interfaces.

## Scanning Live Hosts

```bash
# Nmap — quick scan on key hosts
nmap -sC -sV -oN scans/initial <IP>

# Full port scan
nmap -p- --min-rate 5000 -oN scans/allports <IP>

# Targeted scan on new ports
nmap -sC -sV -p <PORTS> -oN scans/targeted <IP>
```

## Mass Scanning (Multiple Hosts)

```bash
# naabu — fast port scan across many hosts
cat resolved-subs.txt | naabu -top-ports 1000 -silent -o open-ports.txt

# With service detection via nmap
cat resolved-subs.txt | naabu -top-ports 1000 -nmap-cli "nmap -sV" -o naabu-results.txt
```

## Interesting Ports to Look For

| Port | Service | Bug Bounty Relevance |
|------|---------|---------------------|
| 80/443 | HTTP/HTTPS | Primary web app testing |
| 8080/8443 | HTTP alt | Dev/staging servers, proxies |
| 3000 | Node.js / Grafana | Often dev instances |
| 8000 | Python dev servers | Debug mode, no auth |
| 9200 | Elasticsearch | Unauthenticated data access |
| 5601 | Kibana | Dashboard access |
| 6379 | Redis | Unauthenticated if exposed |
| 27017 | MongoDB | No auth by default |
| 2379 | etcd | Kubernetes secrets |
| 10250 | Kubelet | K8s node compromise |
| 4443/6443 | K8s API | Cluster access |
| 9090 | Prometheus | Metrics, internal info |
| 5000 | Docker Registry | Image pulls |
| 11211 | Memcached | Data leak |

## Findings

<!-- Record interesting ports found -->

| Host | Port | Service | Version | Notes |
|------|------|---------|---------|-------|
| | | | | |
