# Contributing

Thanks for your interest in contributing to website-template!

## Getting started

```bash
git clone https://github.com/GielNijkamp/website-template.git
cd website-template
npm install
npm run dev
```

## Making changes

1. Fork the repo and create a branch from `main`
2. Make your changes
3. Run `npm run build` to verify nothing is broken
4. Open a pull request

## Guidelines

- Keep changes focused — one PR per concern
- All visible text belongs in `src/content/en.json` / `nl.json`, not hardcoded in components
- Prefer Astro components over React islands unless interactivity is required
- Follow the existing code style and project structure documented in `CLAUDE.md`

## Reporting issues

Open a GitHub issue with:
- What you expected
- What happened instead
- Steps to reproduce
