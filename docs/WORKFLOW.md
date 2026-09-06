# Workflow: From Clone to Live Website

This guide walks you through turning this skeleton into a fully designed, content-rich website using Claude Code as your builder.

## Prerequisites

- **Node.js 22+** — [install via mise, fnm, or nvm](https://nodejs.org)
- **Claude Code** — [install](https://docs.anthropic.com/en/docs/claude-code/overview)
- **Firebase CLI** — included as devDependency, or install globally: `npm install -g firebase-tools`
- **Chrome** — for visual QA with Chrome DevTools MCP (optional but recommended)

## Step 1: Clone and install

```bash
git clone https://github.com/YOUR_USERNAME/website-template.git my-site
cd my-site
npm install
npm run dev
```

Open `http://localhost:4321` — you should see the unstyled skeleton.

## Step 2: Configure Firebase

```bash
# Login to Firebase
npx firebase login

# Create a project (or use an existing one)
npx firebase projects:create my-site-id

# Update project ID in these files:
# - .firebaserc
# - .github/workflows/deploy.yml
# - .github/workflows/preview.yml
```

Also update:
- `astro.config.mjs` — change `site` to your domain
- `public/robots.txt` — update the sitemap URL

## Step 3: Design with Claude Code

This is the core workflow. The template has all pages and components ready — you just need to describe your brand.

### 3a. Start the dev server

```bash
npm run dev
```

### 3b. Open Claude Code and prompt for design

Start with the design tokens, then style components:

```
I'm building a website for [business name], a [what they do] based in [location].

Brand:
- Primary color: [hex code]
- Secondary color: [hex code]
- Font: [font name] or keep Inter
- Style: [clean/bold/playful/corporate/minimal]

Start by updating src/styles/global.css with these tokens.
Then style all components in src/components/ui/ — add [rounded corners,
shadows, hover states, gradients, animations] as appropriate.
Make the header sticky with a solid background.
```

Claude Code reads `CLAUDE.md`, understands the component structure, and applies your brand across every component.

### 3c. Iterate visually

After the initial design pass, review each page in your browser and refine:

```
The hero section needs more vertical padding and the CTA buttons
should be larger. The features grid cards need a subtle border
shadow on hover.
```

```
The footer feels too cramped. Add more spacing between the columns
and make the copyright text lighter.
```

Keep prompts specific — describe what you see and what you want changed.

## Step 4: Visual QA with Chrome DevTools MCP (recommended)

If you have the [Claude Code Chrome extension](https://chromewebstore.google.com/detail/claude-code-chrome-extension/) installed, Claude Code can see your site directly:

```
Take a screenshot of localhost:4321 and compare it with [competitor URL].
Fix any spacing or alignment issues you notice.
```

```
Run a Lighthouse audit on localhost:4321 and fix any performance
or accessibility issues.
```

```
Check all pages on mobile (375px width) and fix any overflow
or stacking issues.
```

This creates a tight feedback loop: you describe what's off, Claude Code screenshots the page, identifies the issue, and fixes it — without you touching the code.

### Frontend design skill

Claude Code has a `frontend-design` skill specifically for high-quality frontend design that avoids generic AI aesthetics. It generates more distinctive, polished output than default prompting. Activate it by prompting:

```
Use the frontend-design skill to style the hero section with a bold,
modern look. Brand colors: #1e40af primary, white surface.
```

This works well as a second pass after the initial design — use it to elevate specific sections that feel too generic.

### Other visual QA approaches

If you don't use the Chrome extension:
- **Screenshots**: take a screenshot manually, drag it into Claude Code, and ask it to fix what you see
- **PageSpeed Insights**: paste a deployed preview URL and ask Claude Code to analyze the results
- **Browser DevTools**: describe what you see in the inspector and Claude Code will fix it

## Step 5: Write content

All text lives in `src/content/en.json`. You can either edit it manually or prompt Claude Code:

```
Read src/content/en.json and rewrite all placeholder content for
[business name]. They specialize in [services]. Target audience:
[who]. Tone: [professional/friendly/technical].

Replace every placeholder string. Keep the exact same JSON structure.
Write real testimonials with realistic names. Write SEO-optimized
meta descriptions for every page.
```

For Dutch content:
```
Now translate the updated en.json into src/content/nl.json.
Keep the same structure. Make sure all /nl/ hrefs use the
localized slugs (over-ons, diensten, privacybeleid, voorwaarden).
```

### Blog posts

Write blog posts in `src/content/blog/en/` as MDX files:

```
Write a blog post about [topic] for our blog. Target keyword: [keyword].
Save it as src/content/blog/en/[slug].mdx with proper frontmatter
(title, description, date). Make it 800-1200 words, informative,
and include a clear CTA at the end.
```

## Step 6: Add your assets

- **Logo**: replace "Logo" text in `Header.astro` and `Footer.astro` with your SVG/image
- **Favicon**: replace `public/favicon.svg` and `public/favicon.ico`
- **OG image**: replace `public/og-default.png` (1200x630) with your branded image
- **Images**: add to `src/assets/images/` (Vite-hashed, immutable cache) — not `public/`
- **Fonts**: add `.woff2` files to `src/fonts/`, import in `global.css` with `font-display: swap`

## Step 7: Deploy

### First deploy

```bash
npm run build
npx firebase deploy
```

### Set up CI/CD

1. Go to Firebase console > Project Settings > Service Accounts
2. Generate a new private key (JSON)
3. In your GitHub repo, go to Settings > Secrets > Actions
4. Add `FIREBASE_SERVICE_ACCOUNT` with the JSON content

Now every push to `main` auto-deploys, and every PR gets a preview URL.

### Custom domain

In Firebase console > Hosting > Add custom domain. Firebase provisions the SSL certificate automatically.

## Adding a new language

1. Copy `src/content/en.json` to `src/content/[lang].json` and translate
2. Add `'[lang]'` to the `locales` array in `astro.config.mjs`
3. Add the import and entry in `src/lib/i18n.ts`:
   ```ts
   import de from '../content/de.json';
   const content = { en, nl, de } as const;
   ```
4. Copy `src/pages/nl/` to `src/pages/[lang]/`
5. Rename page files to localized slugs (e.g., `uber-uns.astro` for German "about")
6. Update all hrefs in the new JSON to use the correct prefix and slugs
7. Add blog posts in `src/content/blog/[lang]/`
8. Add a collection in `src/content.config.ts`:
   ```ts
   const blogDe = defineCollection({
     loader: glob({ pattern: '**/*.mdx', base: './src/content/blog/de' }),
     schema: blogSchema,
   });
   export const collections = { 'blog-en': blogEn, 'blog-nl': blogNl, 'blog-de': blogDe };
   ```
9. Update `blogCollection()` in `src/lib/i18n.ts`

## Tips

- **Start with design, then content.** It's easier to write content when you can see how it looks in the designed layout.
- **Prompt in batches.** Design all components first, then review all pages, then write all content. Don't jump between tasks.
- **Use the CLAUDE.md.** It tells Claude Code where files are, what patterns to follow, and what not to add. Update it if you change conventions.
- **Commit often.** After each major step (design done, content done, language added), commit so you can roll back.
- **Preview URLs are free QA.** Every PR gets a Firebase preview URL. Share it with your team for review before merging.
