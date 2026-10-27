# Contributing to Resumelio

Thanks for wanting to help!

## Workflow

1. Fork the repo and create a branch from `main`.
2. Run `npm install` and `npm run dev`.
3. Make your change. Before opening a PR, run:
   ```bash
   npm run lint
   npm run ts-check
   npm run build
   ```
4. Open a pull request describing what changed and why. Include screenshots for UI changes.

## Translations

UI strings live in `public/locales/<locale>/*.json`. When you add a key, add it to every locale (English is fine as a placeholder) so nothing renders blank.

To add a new language, add the locale to `next-i18next.config.js`, create its folder under `public/locales/`, then run `npm run generate-rewrites` and `npm run generate-sitemap`.

## Blog posts

Each post is a folder in `_blogs/<slug>/` with one Markdown file per locale. Preview images go in `public/assets/blog/preview/<slug>.jpg`.

## CV templates

Templates live in `components/cv-templates/`. Use an existing template as a reference and make sure the PDF export paginates correctly.

## Reporting bugs

Open an issue with steps to reproduce, what you expected, and what happened. Mention your browser.
