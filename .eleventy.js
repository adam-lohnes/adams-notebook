const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {
  // Copy the assets directory to the output
  eleventyConfig.addPassthroughCopy("src/assets");
  
  // Add a date formatting filter
  eleventyConfig.addFilter("formatDate", function(date) {
    return DateTime.fromJSDate(date).toFormat("MMMM d, yyyy");
  });
  
  // Add a slice filter for collections
  eleventyConfig.addFilter("slice", function(array, start, end) {
    return array.slice(start, end);
  });
  
  // Add a shortcode for the current year
  eleventyConfig.addShortcode("year", () => `${new Date().getFullYear()}`);
  
  // Configure collections
  eleventyConfig.addCollection("posts", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/posts/**/*.md");
  });
  
  // Configure markdown-it
  let markdownIt = require("markdown-it");
  let markdownItAnchor = require("markdown-it-anchor");
  let markdownItOptions = {
    html: true,
    breaks: true,
    linkify: true
  };
  let markdownItAnchorOptions = {
    permalink: true,
    permalinkClass: "direct-link",
    permalinkSymbol: "#"
  };
  
  eleventyConfig.setLibrary("md", markdownIt(markdownItOptions)
    .use(markdownItAnchor, markdownItAnchorOptions)
  );
  
  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      layouts: "_layouts"
    },
    templateFormats: ["md", "njk", "html"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    dataTemplateEngine: "njk"
  };
}; 