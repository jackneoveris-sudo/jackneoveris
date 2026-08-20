// Eleventy build for jackneoveris.com.
//
// The original static pages (index.html, about.html, …) are still copied into
// the output folder (_site) byte-for-byte — ".html" is deliberately NOT a
// template format, so Eleventy never rewrites them or their flat URLs. Page
// generation (Nunjucks + Markdown) is enabled only for the CMS-driven content:
// the Writings and Watch pages, built from files under content/.

module.exports = function (eleventyConfig) {
  // The pages, copied through unchanged.
  eleventyConfig.addPassthroughCopy("*.html");

  // Styles, and the page scripts by name (never this config file, and never
  // anything Eleventy pulls in) — the reader and the Compass of Agape plate.
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("reader.js");
  eleventyConfig.addPassthroughCopy("compass.js");

  // The book and the entire vendored PDF.js library.
  eleventyConfig.addPassthroughCopy("*.pdf");
  eleventyConfig.addPassthroughCopy("pdfjs");

  // Images, including CMS uploads under images/writings/.
  eleventyConfig.addPassthroughCopy("images");

  // The Decap CMS admin (admin/index.html + admin/config.yml), copied as-is.
  eleventyConfig.addPassthroughCopy("admin");

  // Host config that must live inside the published folder.
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy(".htaccess");

  // A human-readable date for content pages, e.g. "January 15, 2026".
  eleventyConfig.addFilter("readableDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric", timeZone: "UTC",
    });
  });

  // ISO 8601 form of a date, e.g. "2026-01-15T00:00:00.000Z" — used for
  // article:published_time and the JSON-LD datePublished/dateModified, which
  // require a machine-readable timestamp rather than the human "readableDate".
  eleventyConfig.addFilter("isoDate", (value) => {
    const d = value instanceof Date ? value : new Date(value);
    return d.toISOString();
  });

  // Pull the 11-character video id out of any common YouTube URL form
  // (watch?v=, youtu.be/, embed/, shorts/, v/). Returns "" if none found.
  eleventyConfig.addFilter("youtubeId", (url) => {
    if (!url) return "";
    const m = String(url).match(
      /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/|v\/))([A-Za-z0-9_-]{11})/
    );
    return m ? m[1] : "";
  });

  return {
    dir: {
      input: ".",
      output: "_site",
    },
    // The static .html pages are copied verbatim (see note above); only .njk
    // and .md files are generated into pages.
    templateFormats: ["njk", "md"],
    // Author Markdown is rendered as-is (no template preprocessing), so prose
    // containing characters like {{ or {% can never break the build.
    markdownTemplateEngine: false,
  };
};
