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
