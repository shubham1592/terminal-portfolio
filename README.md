# terminal-portfolio

My personal site, styled as a vintage CRT terminal: kernel boot log, curved phosphor-green screen with amber status accents, scanlines, and an optional interactive shell.

**Live:** https://shubham1592.github.io/terminal-portfolio/

Built with React, TypeScript, Vite and Tailwind. The contact form sends through EmailJS, so there's no backend.

## Run locally

```bash
npm install
npm run dev      # http://localhost:5176/terminal-portfolio/
```

## Update content

All text (bio, experience, projects, skills, links) lives in [`src/data/profile.ts`](src/data/profile.ts). The page and the shell both read from it. To link a project, add `code` and/or `demo` URLs to its entry.

The resume is served from `public/Shubham_Kumar_Resume.pdf`. To update it, replace that file.

## Deploy

```bash
npm run deploy   # builds and pushes dist/ to the gh-pages branch
```

© Shubham Kumar. All rights reserved.
