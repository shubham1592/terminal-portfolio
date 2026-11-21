# Graph Report - terminal-portfolio  (2026-11-20)

## Corpus Check
- Corpus is ~11,765 words - fits in a single context window. You may not need a graph.

## Summary
- 278 nodes · 507 edges · 21 communities (14 shown, 7 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 6 edges (avg confidence: 0.8)
- Token cost: 91,422 input · 0 output

## Community Hubs (Navigation)
- Page Sections and UI Kit
- Interactive Shell
- Docs, SEO and Resume
- CRT Effects and Beyond Code
- ASCII Portrait and Eyes
- Brand Logos and Skills
- TypeScript Config
- Build Tooling Deps
- Runtime Dependencies
- shadcn Config
- Package Manifest
- Node TS Config
- Vite Setup
- NPM Scripts
- Radix Label
- Radix Select
- Tailwind Animate
- Favicon

## God Nodes (most connected - your core abstractions)
1. `cn()` - 32 edges
2. `react` - 23 edges
3. `Home()` - 15 edges
4. `compilerOptions` - 15 edges
5. `ContactSection()` - 11 edges
6. `Shell()` - 9 edges
7. `Shubham Kumar Resume (PDF)` - 9 edges
8. `compilerOptions` - 8 edges
9. `ExperienceSection()` - 7 edges
10. `HeroSection()` - 7 edges

## Surprising Connections (you probably didn't know these)
- `src/data/profile.ts as Single Content Source` --semantically_similar_to--> `Shubham Kumar Resume (PDF)`  [AMBIGUOUS] [semantically similar]
  README.md → public/Shubham_Kumar_Resume.pdf
- `SEO / Open Graph / Twitter Meta Tags` --references--> `MS CS, Northeastern University (exp. May 2027)`  [INFERRED]
  index.html → public/Shubham_Kumar_Resume.pdf
- `terminal-portfolio README` --references--> `Shubham Kumar Resume (PDF)`  [EXTRACTED]
  README.md → public/Shubham_Kumar_Resume.pdf
- `ContactSection()` --calls--> `BrandIcon()`  [EXTRACTED]
  src/components/ContactSection.tsx → src/components/BrandIcon.tsx
- `Home()` --calls--> `ContactSection()`  [EXTRACTED]
  src/components/home.tsx → src/components/ContactSection.tsx

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **LG Energy Solution Vertech internship contributions** — public_shubham_kumar_resume_lg_energy_solution_vertech, public_shubham_kumar_resume_fastapi_hierarchical_apis, public_shubham_kumar_resume_telemetry_sql_aggregation, public_shubham_kumar_resume_thread_safe_connection_pool, public_shubham_kumar_resume_data_quality_framework [EXTRACTED 1.00]
- **Bajaj Finance data engineering contributions** — public_shubham_kumar_resume_bajaj_finance, public_shubham_kumar_resume_500tb_data_lake_migration, public_shubham_kumar_resume_spark_pipelines_cicd, public_shubham_kumar_resume_rag_application [EXTRACTED 1.00]

## Communities (21 total, 7 thin omitted)

### Community 0 - "Page Sections and UI Kit"
Cohesion: 0.09
Nodes (35): class-variance-authority@^0.7.0, @radix-ui/react-icons@^1.3.0, class-variance-authority, @radix-ui/react-icons, ContactSection(), ExperienceSection(), AccordionContent, AccordionItem (+27 more)

### Community 1 - "Interactive Shell"
Cohesion: 0.14
Nodes (23): MatrixRain(), STATIC_RAIN, A(), Line, SECTIONS, Shell(), ShellProps, cowsay() (+15 more)

### Community 2 - "Docs, SEO and Resume"
Cohesion: 0.10
Nodes (22): index.html Entry Page, #root Mount + /src/main.tsx Module, SEO / Open Graph / Twitter Meta Tags, Shubham Kumar Resume (PDF), 500TB Legacy DB to Cloud Data Lake Migration, Data Engineer, Bajaj Finance Ltd., Campus Cravings Backend Delivery Platform (Flask, Postgres), Python Telemetry Data Quality Framework (+14 more)

### Community 3 - "CRT Effects and Beyond Code"
Cohesion: 0.15
Nodes (18): react, Beam(), BeyondCodeSection(), buildBarrelMap(), buildTubeMask(), CrtWarp(), toBlobUrl(), Home() (+10 more)

### Community 4 - "ASCII Portrait and Eyes"
Cohesion: 0.14
Nodes (18): ART, CENTRE, colour(), Gaze, gazeToward(), HeroArt(), lens(), renderLine() (+10 more)

### Community 5 - "Brand Logos and Skills"
Cohesion: 0.16
Nodes (10): BrandIcon(), TechStackSection(), TooltipContent, Brand, brands, dev(), hexToRgb(), luminance() (+2 more)

### Community 6 - "TypeScript Config"
Cohesion: 0.11
Nodes (17): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleResolution, noEmit (+9 more)

### Community 7 - "Build Tooling Deps"
Cohesion: 0.12
Nodes (17): devDependencies, autoprefixer@^10.4.19, gh-pages@^6.3.0, postcss@^8.4.38, tailwindcss@3.4.1, @types/node@^20.14.2, @types/react@^18.2.66, @types/react-dom@^18.2.22 (+9 more)

### Community 8 - "Runtime Dependencies"
Cohesion: 0.12
Nodes (16): dependencies, devicon@^2.16.0, @emailjs/browser@^4.4.1, lucide-react@^0.394.0, @radix-ui/react-accordion@^1.1.2, @radix-ui/react-slot@^1.0.2, react@^18.2.0, simple-icons@^16.38.0 (+8 more)

### Community 9 - "shadcn Config"
Cohesion: 0.14
Nodes (13): aliases, components, utils, rsc, $schema, style, tailwind, baseColor (+5 more)

### Community 10 - "Package Manifest"
Cohesion: 0.18
Nodes (10): clsx@^2.1.1, @radix-ui/react-tooltip@^1.0.7, react-dom@^18.2.0, name, private, type, version, clsx (+2 more)

### Community 11 - "Node TS Config"
Cohesion: 0.20
Nodes (9): compilerOptions, allowSyntheticDefaultImports, composite, module, moduleResolution, noEmitOnError, skipLibCheck, strict (+1 more)

### Community 12 - "Vite Setup"
Cohesion: 0.33
Nodes (4): vite@^6.2.3, @vitejs/plugin-react-swc@^3.8.1, vite, @vitejs/plugin-react-swc

### Community 13 - "NPM Scripts"
Cohesion: 0.33
Nodes (6): scripts, build, deploy, dev, predeploy, preview

## Ambiguous Edges - Review These
- `src/data/profile.ts as Single Content Source` → `Shubham Kumar Resume (PDF)`  [AMBIGUOUS]
  README.md · relation: semantically_similar_to

## Knowledge Gaps
- **10 isolated node(s):** `#root Mount + /src/main.tsx Module`, `B.Tech CS, Vellore Institute of Technology (2022)`, `Technical Skills`, `Thread-safe Connection Pool with Health Monitoring`, `500TB Legacy DB to Cloud Data Lake Migration` (+5 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 88 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **7 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `CRT Effects and Beyond Code` to `Page Sections and UI Kit`, `Interactive Shell`, `ASCII Portrait and Eyes`, `Brand Logos and Skills`, `Runtime Dependencies`, `Package Manifest`?**
  _High betweenness centrality (0.220) - this node is a cross-community bridge._
- **What connects `#root Mount + /src/main.tsx Module`, `B.Tech CS, Vellore Institute of Technology (2022)`, `Technical Skills` to the rest of the system?**
  _10 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Page Sections and UI Kit` be split into smaller, more focused modules?**
  _Cohesion score 0.09268707482993198 - nodes in this community are weakly interconnected._
- **Why does `cn()` connect `Page Sections and UI Kit` to `Brand Logos and Skills`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `Interactive Shell` be split into smaller, more focused modules?**
  _Cohesion score 0.14245014245014245 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `Runtime Dependencies` to `Page Sections and UI Kit`, `Package Manifest`, `Radix Label`, `Radix Select`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._

### Low-confidence Hints
_AMBIGUOUS edges — the extractor was unsure. Verify before acting on these._

- **What is the exact relationship between `src/data/profile.ts as Single Content Source` and `Shubham Kumar Resume (PDF)`?**
  _Edge tagged AMBIGUOUS (relation: semantically_similar_to) - confidence is low._