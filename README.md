# Resumelio

A free, open-source CV / resume builder. Fill in your details, pick a template, and export a clean PDF, all in the browser.

Live site: [resumelio.com](https://resumelio.com)

## Features

- Six CV templates with live preview
- PDF export done fully client-side, with automatic pagination
- Interface available in 9 languages: English, Romanian, German, French, Spanish, Portuguese, Polish, Italian and Russian
- Blog with career and CV-writing guides, translated per locale
- SEO tooling: generated sitemap, URL rewrites and IndexNow submission

## Tech stack

- [Next.js](https://nextjs.org/) (pages router) and React
- TypeScript
- Tailwind CSS and Radix UI
- Zustand for state
- next-i18next for translations
- jsPDF and html-to-image for PDF export

## Getting started

Requirements: Node.js 20 or newer.

```bash
git clone https://github.com/TraianC299/cv-builder.git
cd cv-builder
npm install
cp .env.example .env.local   # optional, only needed for the contact form
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm run ts-check` | Type-check without emitting |
| `npm run generate-rewrites` | Regenerate localized URL rewrites |
| `npm run generate-sitemap` | Regenerate `public/sitemap.xml` |
| `npm run indexnow` | Submit URLs to IndexNow (maintainers only) |

## Project structure

```
pages/            Routes (home, create-cv, blog, static pages, api/contact)
components/       UI, CV templates (components/cv-templates), builder sections
store/            Zustand CV store
lib/              PDF export, pagination, blog loading
_blogs/<slug>/    Blog posts, one Markdown file per locale (en.md, ro.md, ...)
public/locales/   Translation JSON files per locale
```

## Contributing

Contributions are welcome. Good places to start: new CV templates, translation fixes, new languages, and bug reports. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

The code is released under the [MIT License](LICENSE). The Resumelio name and logo are not covered by the license; please don't use them for your own deployments.
