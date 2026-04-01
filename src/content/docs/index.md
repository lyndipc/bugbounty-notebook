---
title: "Bug Bounty Notes"
description: "Bug bounty target notes — clone per target"
template: splash
hero:
  tagline: "Structured recon, vulnerability, and reporting notes for bug bounty hunting"
  actions:
    - text: Methodology
      link: /methodology/
      icon: right-arrow
    - text: Cheatsheets
      link: /cheatsheets/
      icon: right-arrow
      variant: minimal
---

import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Methodology" icon="pencil">
    Bug bounty workflow, scope rules, and submission tips.
  </Card>
  <Card title="Reconnaissance" icon="magnifier">
    Subdomains, ports, content discovery, JS analysis, APIs.
  </Card>
  <Card title="Vulnerabilities" icon="warning">
    XSS, SQLi, SSRF, IDOR, auth bugs, file upload, and more.
  </Card>
  <Card title="Exploitation" icon="rocket">
    Chaining bugs, bypass techniques, and payload references.
  </Card>
  <Card title="Reporting" icon="document">
    Report templates, writing tips, and findings log.
  </Card>
  <Card title="Cheatsheets" icon="list-format">
    Copy-paste commands for recon, fuzzing, and testing.
  </Card>
</CardGrid>
