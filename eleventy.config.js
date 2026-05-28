// Step 1 of adding a build step: a deliberately minimal Eleventy wrapper.
//
// Eleventy does NOT transform the site's pages yet. The pages link to each other
// with flat URLs (e.g. href="about.html"), but Eleventy's default behaviour
// would rewrite about.html to /about/ and break every such link. So for now
// every file is copied into the output folder (_site) byte-for-byte. Real
// templating will be introduced later, alongside the Decap CMS.

module.exports = function (eleventyConfig) {
  // The pages, copied through unchanged.
  eleventyConfig.addPassthroughCopy("*.html");

  // Styles and the reader's script (reader.js only — not this config file).
  eleventyConfig.addPassthroughCopy("*.css");
  eleventyConfig.addPassthroughCopy("reader.js");

  // The book and the entire vendored PDF.js library.
  eleventyConfig.addPassthroughCopy("*.pdf");
  eleventyConfig.addPassthroughCopy("pdfjs");

  // Host config that must live inside the published folder.
  eleventyConfig.addPassthroughCopy("_headers");
  eleventyConfig.addPassthroughCopy(".htaccess");

  return {
    dir: {
      input: ".",
      output: "_site",
    },
    // Treat nothing as a template — everything is copied verbatim (see note above).
    templateFormats: [],
  };
};
