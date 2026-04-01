import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  integrations: [
    starlight({
      title: "Bug Bounty Notebook",
      description: "Bug bounty target notes",
      logo: {
        light: "./src/assets/logo-light.svg",
        dark: "./src/assets/logo-dark.svg",
        replacesTitle: false,
      },
      customCss: ["./src/styles/custom.css"],
      sidebar: [
        {
          label: "Home",
          link: "/",
        },
        {
          label: "Methodology",
          items: [
            { label: "Overview", slug: "methodology" },
            { label: "Workflow", slug: "methodology/workflow" },
            { label: "Scope & Rules", slug: "methodology/scope-and-rules" },
            { label: "Submission Tips", slug: "methodology/submission-tips" },
          ],
        },
        {
          label: "Reconnaissance",
          items: [
            { label: "Overview", slug: "recon" },
            { label: "Subdomain Enum", slug: "recon/subdomain-enum" },
            { label: "Port & Service Scan", slug: "recon/port-scan" },
            { label: "Content Discovery", slug: "recon/content-discovery" },
            { label: "JS Analysis", slug: "recon/js-analysis" },
            { label: "Tech Fingerprinting", slug: "recon/tech-fingerprinting" },
            { label: "API Discovery", slug: "recon/api-discovery" },
          ],
        },
        {
          label: "Vulnerabilities",
          items: [
            { label: "Overview", slug: "vulnerabilities" },
            { label: "XSS", slug: "vulnerabilities/xss" },
            { label: "SQL Injection", slug: "vulnerabilities/sqli" },
            { label: "SSRF", slug: "vulnerabilities/ssrf" },
            { label: "IDOR / BAC", slug: "vulnerabilities/idor" },
            { label: "Authentication Bugs", slug: "vulnerabilities/auth" },
            { label: "File Upload", slug: "vulnerabilities/file-upload" },
            { label: "CSRF", slug: "vulnerabilities/csrf" },
            { label: "Open Redirect", slug: "vulnerabilities/open-redirect" },
            {
              label: "Race Conditions",
              slug: "vulnerabilities/race-conditions",
            },
            { label: "Business Logic", slug: "vulnerabilities/business-logic" },
            {
              label: "Info Disclosure",
              slug: "vulnerabilities/info-disclosure",
            },
            {
              label: "Subdomain Takeover",
              slug: "vulnerabilities/subdomain-takeover",
            },
          ],
        },
        {
          label: "Exploitation",
          items: [
            { label: "Overview", slug: "exploitation" },
            { label: "Chaining Bugs", slug: "exploitation/chaining" },
            { label: "Bypass Techniques", slug: "exploitation/bypasses" },
            { label: "Payloads", slug: "exploitation/payloads" },
          ],
        },
        {
          label: "Reporting",
          items: [
            { label: "Overview", slug: "reporting" },
            { label: "Report Template", slug: "reporting/template" },
            { label: "Writing Tips", slug: "reporting/writing-tips" },
            { label: "Findings Log", slug: "reporting/findings-log" },
          ],
        },
        {
          label: "Cheatsheets",
          items: [
            { label: "Overview", slug: "cheatsheets" },
            { label: "Recon Automation", slug: "cheatsheets/recon-automation" },
            { label: "Burp Suite", slug: "cheatsheets/burp" },
            { label: "Ffuf", slug: "cheatsheets/ffuf" },
            { label: "Nuclei", slug: "cheatsheets/nuclei" },
            { label: "One-Liners", slug: "cheatsheets/one-liners" },
            { label: "Headers & Bypasses", slug: "cheatsheets/headers" },
          ],
        },
      ],
    }),
  ],
});
