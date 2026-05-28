// Directory settings applied to every file in content/writings/.
// Each Markdown post joins the "writings" collection, is wrapped in the post
// layout, and is published at /writings/<file-name>/.
module.exports = {
  tags: "writings",
  layout: "writing.njk",
  permalink: (data) => `/writings/${data.page.fileSlug}/`,
};
