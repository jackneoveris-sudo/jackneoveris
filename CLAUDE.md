# CLAUDE.md

Guidance for Claude Code when working in this repository.

## What this is

`jackneoveris.com` — a static website for author Jack M. N. Gladstone, publishing
the book *Creating Ethics* in full through a self-hosted PDF.js reader.

**Plain HTML / CSS / vanilla JS. There is no build step, no package manager, and
no dependencies to install.** You edit files and the change is live. Do not
introduce a bundler, framework, or `node_modules` unless explicitly asked.

## Running locally

The PDF reader uses Web Workers + ES modules, which browsers refuse to load over
`file://`. You must serve over HTTP:

```bash
python3 serve.py     # then open http://localhost:8000
```

`serve.py` sets the correct `.mjs` MIME type and disables caching. Opening the
HTML files directly will work for every page *except* the book reader, which
fails silently over `file://`.

## Layout

| Path | Purpose |
|------|---------|
| `index.html` | Landing page |
| `creating-ethics.html` | Book page — embeds `reader.html` in an iframe |
| `reader.html` / `reader.js` / `reader.css` | Custom PDF.js reader (parchment skin, custom toolbar) |
| `creating-ethics.pdf` | The book — 262 pages, scrubbed metadata, embedded outline |
| `amovera.html`, `writings.html`, `about.html`, `contact.html`, `thank-you.html` | Content pages |
| `styles.css` | Shared stylesheet for the main site |
| `pdfjs/` | Mozilla PDF.js v5.3.93 (Apache 2.0) — vendored library, ~4.4 MB |
| `serve.py` | Local dev server |
| `netlify.toml`, `_headers`, `.htaccess` | Host MIME-type config for `.mjs` |

## Conventions

- **Colors and fonts** live as CSS variables under `:root` — `styles.css` for the
  main site, `reader.css` for the reader. Change the variable, not each usage.
- **Navigation** is hand-maintained in every page's `<nav class="site-nav">`.
  Adding or renaming a page means editing the nav block in *all* HTML files.
- **Don't touch `pdfjs/`** — it's a vendored upstream library. The custom UI lives
  entirely in `reader.js` / `reader.css` / `reader.html`, which wrap PDF.js's
  viewer components (`EventBus`, `PDFLinkService`, `PDFFindController`, `PDFViewer`).
- The three host-config files (`netlify.toml`, `_headers`, `.htaccess`) must stay
  in sync — they all exist to force `.mjs` to serve as JavaScript. If you change
  one, change the others.

## The PDF

`creating-ethics.pdf` has been scrubbed of personal metadata (author listed as
"Jack M. N. Gladstone") and carries an embedded table of contents the reader's
sidebar reads from. **If the PDF is ever regenerated, re-scrub the metadata and
rebuild the outline** — see the "PDF metadata" section in `README.md` for the
pypdf snippet. Do not commit a replacement PDF with raw Word-export metadata.

## Deployment

Static deploy to Netlify (manual drag-and-drop or git-connected). Contact form
uses Netlify Forms. No server-side code. See `README.md` for the full deploy and
DNS walkthrough.

## Before changing user-facing copy

- The contact email and footer copyright year are flagged as "update before
  deploy" items in `README.md`.
- `writings.html` intentionally contains "coming soon" placeholders.
