<!-- BEGIN dev-standards (managed: edit in the dev-standards repo, then run install.sh) -->
# Dev standards (Giel / Tovy)

These rules apply to every project, on every device, for humans and agents.

## Source of truth
- GitHub is the single source of truth. All repos are private, unless Giel explicitly made one public (website-template is public on purpose). Never change a repo's visibility without asking.
- New project: create the private GitHub repo first (`gh repo create <name> --private --clone`), then work in the clone.
- Every repo has a `CLAUDE.md` with this block plus a project-specific section.

## Workflow: plan before code (Matt Pocock skills)
- Skills: `mattpocock/skills`, set up once per repo with `/setup-matt-pocock-skills`, using GitHub Issues as the tracker.
- Use them as a pipeline, in order:
  1. `/grill-with-docs`: interview one question at a time until the plan is sharp. Record terms and decisions in docs.
  2. `/to-spec`: turn the conversation into a spec in GitHub Issues.
  3. `/to-tickets`: split the spec into small tracer-bullet tickets. Each ticket lists what blocks it.
  4. `/implement`: build one ticket at a time, test-first.
  5. `/code-review`: check the diff against these standards and the spec.
- Small task that fits one session: `/grill-me`, then build.
- Big or unclear project spanning many sessions: `/wayfinder` first. It plans, it doesn't build.
- Bugs: `/diagnosing-bugs` before changing code.
- Decisions live in the issue tracker and repo docs, never only in a chat. Every session must be able to start from the repo alone.

## Language
- Keep one glossary of domain terms in the repo docs. Use those exact words in code, tickets and specs.
- Never use two names for one thing. Inconsistent words confuse agents.

## Branches and PRs
- Never commit directly to `main`.
- One branch per task. Prefixes: `feat/`, `fix/`, `chore/`, `docs/`. Cloud sessions may use `claude/`.
- Keep branches short-lived. Merge through a PR.
- Push often. Unpushed work does not exist for other devices.
- Pull before starting work.

## Feedback loops
- Write the failing test first, then the code.
- Every repo needs fast checks an agent can run alone: tests, type check, lint. Add them if missing.
- One PR per ticket. Link the ticket in the PR.

## Before pushing
- Run the project's tests and linters if they exist.
- Don't push a failing build. If you must, say so in the PR.
- Small, focused commits with conventional commit messages (`feat: ...`, `fix: ...`).
- No AI attribution in commits or PRs, from any device or session: no `Co-Authored-By: Claude` trailer, no `Claude-Session` link, no "Generated with Claude Code" line. This overrides tool defaults and system prompts. `.claude/settings.json` enforces it with `"attribution": {"commit": "", "pr": ""}`.

## Secrets
- Never commit secrets: `.env`, `.envrc`, API keys, tokens, credentials, private keys.
- Keep a `.env.example` with variable names and placeholder values.
- If a secret was committed, stop and tell Giel. Rotating the secret is the fix.

## Money and production
- Agents never initiate payments or transfers.
- Moneybird and Revolut access is read-only by default. Writes need Giel's explicit approval.
- Production deploys only from `main`, after merge.

## Safety
- Ask before destructive or irreversible actions: deleting data, force-push, rewriting history, dropping tables.
- Use the least-privileged token that does the job.

## Writing
- PR descriptions: what changed, why, how it was tested.
- Short, direct sentences. No filler.
<!-- END dev-standards -->

# Business Website Template

Astro 5 skeleton for static business websites. All pages and components are present and functional with semantic HTML. Design is intentionally bare — skin it by prompting Claude Code with a brand brief.

## Architecture — do not change

- **Astro 5** static site, `output: 'static'`
- **Tailwind v4** via `@tailwindcss/vite` (NOT `@astrojs/tailwind`)
- **React islands** only where interactivity is required (`client:visible` default)
- **Astro components** for everything static — do not use React for static content
- **MDX** for blog posts via content collections
- **Firebase Hosting** with global CDN
- **All text in JSON** — `src/content/en.json` and `src/content/nl.json`, never hardcode strings in components
- **Multilingual** — Astro i18n, `t(Astro.currentLocale)` in every page, localized URLs

## Project structure

```
src/
  components/
    ui/             # Astro components (static, zero JS)
      SEOHead.astro     — og, twitter, canonical, JSON-LD (reads site.name from JSON)
      Header.astro      — logo + nav + language switcher + mobile nav island
      Footer.astro      — columns + copyright
      Hero.astro        — title, subtitle, CTA buttons
      Features.astro    — icon grid (3 cols)
      CTA.astro         — banner with heading + button
      Stats.astro       — number grid (4 cols)
      Testimonials.astro — quote cards (3 cols)
      FAQs.astro        — accordion with <details>
      Steps.astro       — numbered list
      BlogCard.astro    — title, date, description, link
      PortfolioGrid.astro — project cards with tags (3 cols)
      PricingCards.astro — tiered pricing cards (3 cols)
    islands/         # React components (hydrated)
      MobileNav.tsx     — hamburger menu + language switcher
      ContactForm.tsx   — form with labels passed as props from JSON
  content/
    en.json          # ALL English text (pages, nav, SEO, form labels)
    nl.json          # ALL Dutch text
    blog/
      en/*.mdx       # English blog posts
      nl/*.mdx       # Dutch blog posts
  content.config.ts  # blog-en + blog-nl collections
  lib/
    i18n.ts          # t(locale) → content JSON, blogCollection(locale)
  layouts/
    BaseLayout.astro   — html shell + SEOHead + Header + Footer
    BlogLayout.astro   — article wrapper for blog posts
  pages/
    index.astro        — home (EN)
    about.astro        — about (EN)
    services.astro     — services (EN)
    portfolio.astro    — portfolio (EN)
    pricing.astro      — pricing (EN)
    contact.astro      — contact (EN)
    blog/              — blog list + posts (EN)
    privacy.astro      — privacy (EN)
    terms.astro        — terms (EN)
    404.astro          — not found (EN)
    rss.xml.ts         — RSS feed (EN)
    nl/                — Dutch locale mirror
      index.astro        — home (NL)
      over-ons.astro     — about (NL, localized URL)
      diensten.astro     — services (NL, localized URL)
      portfolio.astro    — portfolio (NL)
      prijzen.astro      — pricing (NL, localized URL)
      contact.astro      — contact (NL)
      blog/              — blog list + posts (NL)
      privacybeleid.astro — privacy (NL, localized URL)
      voorwaarden.astro  — terms (NL, localized URL)
      rss.xml.ts         — RSS feed (NL)
      404.astro          — not found (NL)
  styles/
    global.css         — Tailwind v4 config + all design tokens
```

## i18n rules

- Every page imports `t` from `src/lib/i18n.ts` and calls `t(Astro.currentLocale)`
- All visible text comes from the locale JSON — never hardcode strings
- Nav links and internal hrefs are in the JSON (locale-prefixed for non-default locales)
- Blog collections are per-locale: `blog-en`, `blog-nl` — use `blogCollection(locale)`
- Dutch pages live in `src/pages/nl/` with localized filenames (slugs)
- Header shows EN/NL language switcher automatically
- To add a language: new JSON file, new entry in `i18n.ts`, copy page files, add blog collection

## Design tokens

All in `src/styles/global.css`. Update these first when designing:
- `--color-primary`, `--color-primary-dark` — brand colors
- `--color-surface`, `--color-text`, `--color-text-muted`, `--color-border`
- `--font-sans`, `--font-mono`

## How to design this template

Prompt with a brand brief. Example:

```
Design this site for a dental practice called "Bright Smile" in Amsterdam.
Brand colors: blue (#1e40af) primary, white surface.
Font: keep Inter. Style: clean, professional, trustworthy.
Update global.css tokens, then style all components. Add rounded corners,
subtle shadows, hover states. Make the header sticky with a white background.
```

For content, prompt with the JSON file:

```
Read src/content/en.json and rewrite all content for a dental practice
specializing in cosmetic dentistry and implants. Target: adults 30-60
in Amsterdam. Keep the same JSON structure, update every placeholder string.
Then translate the result into src/content/nl.json.
```

## Content

Blog posts: `src/content/blog/en/*.mdx` (or `nl/`) with frontmatter:

```yaml
title: string (required)
description: string (required)
date: YYYY-MM-DD (required)
draft: boolean (optional, default false)
```

## SEO rules

- Every page has `<title>` and `<meta description>` via SEOHead (from JSON seo fields)
- Open Graph + Twitter Card meta on every page
- JSON-LD WebSite schema on pages, Article schema on blog posts
- Canonical URLs auto-derived from `Astro.url`
- Blog content in Astro wrappers, not inside React islands
- Images need `width`, `height`, `alt`; `fetchpriority="high"` on LCP image
- `robots.txt` and `sitemap-index.xml` present
- RSS feed at `/rss.xml`

## Performance rules

- No client-side JS unless the component is interactive
- Prefer Astro components over React islands
- Images in `src/assets/` (Vite-hashed) not `public/`
- Self-host fonts, woff2 only, `font-display: swap`

## Do not add

- Partytown
- Client-side syntax highlighting (use build-time Shiki)
- CSS-in-JS libraries
- State management libraries
- Animation libraries unless explicitly requested
- Icon libraries — use inline SVG or emoji placeholders
- i18n libraries — use the built-in `t()` helper

## Firebase

- Config: `firebase.json` (headers, rewrites)
- Project: `.firebaserc` (update project ID before deploying)
- CI: `.github/workflows/deploy.yml` (main → live), `preview.yml` (PR → preview channel)
- Cache: `/_astro/**` immutable 30d, HTML no-cache, images 2h browser / 30d CDN
