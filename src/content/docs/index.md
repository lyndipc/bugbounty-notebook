---
title: "Bug Bounty Notes"
description: "Bug bounty target notes — clone per target"
template: splash
hero:
  tagline: "Structured notes for bug bounty hunting"
  actions:
    - text: Cheatsheets
      link: /cheatsheets/
      icon: right-arrow
---

import { Card, CardGrid } from '@astrojs/starlight/components';

<CardGrid>
  <Card title="Methodology" icon="pencil">
    Scope, workflow, and submission process.
  </Card>
  <Card title="Reconnaissance" icon="magnifier">
    Attack surface mapping and enumeration notes.
  </Card>
  <Card title="Vulnerabilities" icon="warning">
    Findings and notes per vulnerability class.
  </Card>
  <Card title="Reporting" icon="document">
    Report drafts and findings log.
  </Card>
  <Card title="Cheatsheets" icon="list-format">
    Copy-paste commands for recon, fuzzing, and testing.
  </Card>
</CardGrid>
