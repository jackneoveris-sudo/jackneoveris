# jackneoveris.com

A static site for Jack M. N. Gladstone — author of *Creating Ethics*, originator of the Amovera system.

Plain HTML/CSS/JS. No build step. No dependencies to install. Edit any `.html` or `.css` in a text editor and the change is live as soon as you re-upload.

The book *Creating Ethics* is published in full on the site through a self-hosted PDF.js reader, with our own toolbar, parchment skin, and embedded table of contents.

---

## Files

```
index.html              landing page
creating-ethics.html    the book page (embeds reader.html)
creating-ethics.pdf     the book itself, 262 pages, metadata scrubbed, outline embedded
reader.html             custom PDF.js reader page (loaded in iframe)
reader.css              parchment/gold skin for the reader
reader.js               wires PDF.js components to our toolbar
amovera.html            system overview, links to amovera.net
writings.html           essays / manifestos index
about.html              biography (with the four-suit persona note)
contact.html            contact form + email
thank-you.html          form submission confirmation
styles.css              shared stylesheet for the main site
serve.py                local development server (Python)
pdfjs/                  Mozilla PDF.js library (~4.4 MB)
  build/                pdf.min.mjs + worker (rendering core)
  web/                  pdf_viewer.mjs + .css (viewer components)
  cmaps/                Chinese/Japanese/Korean character maps
  standard_fonts/       substitution fonts for PDFs without embedded fonts
  LICENSE               Apache 2.0 (Mozilla)
```

---

## Local testing — IMPORTANT

The book reader uses Web Workers and ES modules, which browsers **refuse to load over `file://` URLs**. Double-clicking `index.html` to preview locally will work for every page except the book reader, which will fail silently.

To test the full site locally:

```bash
cd jackneoveris
python3 serve.py
```

Then open `http://localhost:8000` in a browser. The included `serve.py` sets the correct MIME types for `.mjs` files (some Python defaults don't) and disables caching for fast iteration.

On the live host (Netlify, Cloudflare Pages, etc.) this isn't an issue — everything is served via HTTPS by default and the reader works out of the box.

---

## Deployment — Netlify (free, no premium walls)

### Step 1 — Deploy to a temporary subdomain first

1. Go to https://app.netlify.com → log in / create account.
2. From the dashboard: **Sites → Add new site → Deploy manually**.
3. Drag the entire `jackneoveris` folder onto the upload area.
4. Netlify gives you a random URL like `https://lucky-stardust-1234.netlify.app`.
5. Open it. Click every page. Verify the book reader loads on the Creating Ethics page. Test on phone. Submit the contact form once.
6. In Netlify: **Site settings → Site information → Change site name** — set it to e.g. `jackneoveris` so the temporary URL is `https://jackneoveris.netlify.app`.

### Step 2 — Point the domain

In your domain registrar (wherever jackneoveris.com is registered):

1. Find the DNS settings for jackneoveris.com.
2. Write down (or screenshot) the existing records pointing at WordPress as backup.
3. Add the records Netlify gives you. From the Netlify dashboard: **Domain settings → Add custom domain → jackneoveris.com**. Typical records:
   - **A record** for `jackneoveris.com` → `75.2.60.5` (confirm the exact IP Netlify shows you)
   - **CNAME record** for `www` → `your-site-name.netlify.app`
4. Wait. DNS usually propagates within an hour but can take up to 48.
5. Once it resolves, Netlify auto-provisions a free SSL certificate via Let's Encrypt. No action needed from you.

### Step 3 — Cancel WordPress

Only **after** the new site has been live and stable for several days.

Before cancelling, pull anything from the WordPress site you want to keep:
- Posts → use Tools → Export to download as XML
- Media → can be downloaded via the Media library or FTP
- Any contact form submissions stored on the WordPress side

---

## The book reader

The reader is built on Mozilla PDF.js v5.3.93 (Apache 2.0). It is **not** the default PDF.js viewer — we use only the rendering library and a small set of viewer components, then wrap them in a custom UI styled to match the site. This satisfies Mozilla's request that embeddings of PDF.js be customized rather than dropped in unmodified.

Features:
- Page navigation (arrows, page number input, keyboard shortcuts)
- Search within the book (toolbar button or press `/`)
- Embedded table of contents (toolbar button — built from the PDF's bookmarks)
- Zoom (auto-fit, page-fit, page-width, or fixed percentages)
- Text selection (works inside the embedded reader)
- Mobile-responsive (toolbar wraps, sidebar slides over content)

### Keyboard shortcuts in the reader

| Key | Action |
|-----|--------|
| `←` `→` `PgUp` `PgDn` | Previous / next page |
| `Home` `End` | First / last page |
| `/` or `Ctrl/Cmd+F` | Open search |
| `Esc` | Close search or sidebar |

### Replacing the PDF

If you update the book, drop the new file in as `creating-ethics.pdf`. The reader will pick it up automatically. **Run the metadata-scrub step first** — see "PDF metadata" below.

### PDF metadata

The current `creating-ethics.pdf` has been scrubbed of personal metadata. The original Word export listed a different author name in its hidden metadata fields; the published version lists Jack M. N. Gladstone. PDF readers can show this metadata in their "Document Properties" dialog, so it matters.

If you regenerate the PDF from Word, scrub it before publishing. A simple Python script:

```python
from pypdf import PdfReader, PdfWriter

r = PdfReader("input.pdf")
w = PdfWriter()
for page in r.pages: w.add_page(page)
w.add_metadata({
    "/Title": "Creating Ethics",
    "/Author": "Jack M. N. Gladstone",
    "/Subject": "Structural Absurdism, Amovera, ...",
    "/Creator": "Jack M. N. Gladstone",
})
with open("creating-ethics.pdf", "wb") as f: w.write(f)
```

The current PDF also has an embedded table of contents (47 entries across 8 chapters) — the reader's sidebar reads from this. If you regenerate, you'll need to rebuild the outline too, or the sidebar will say "no table of contents".

---

## Contact form

The contact form uses **Netlify Forms**, free for up to 100 submissions per month. Submissions arrive at the email on your Netlify account by default.

To change where notifications go: Netlify dashboard → **Forms → Settings & usage → Form notifications**.

The form also shows a `mailto:` link below it as a fallback for any host that doesn't support Netlify Forms.

---

## Editing the site

To change colors and fonts: edit `styles.css` (for the main site) or `reader.css` (for the book reader). All colors are CSS variables at the top under `:root` — change the value once and it propagates everywhere.

To add a page: copy any existing `.html`, edit the content and the `<title>` tag, and add a link to it in the nav bar of all the other pages.

To add a writing to the Writings page: edit `writings.html` directly. The "coming soon" entries are placeholders.

---

## Updating before deploy

1. **`contact@jackneoveris.com`** in `contact.html` — replace with the email you actually want public.
2. **The Writings page** — currently shows "coming soon" placeholders. Fill in as work becomes public.
3. **Copyright year** in the footers — currently 2026.
