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
          link: "/methodology/",
        },
        {
          label: "Reconnaissance",
          link: "/recon/",
        },
        {
          label: "Vulnerabilities",
          link: "/vulnerabilities/",
        },
        {
          label: "Exploitation",
          link: "/exploitation/",
        },
        {
          label: "Reporting",
          link: "/reporting/",
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
