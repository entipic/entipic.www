var urlset = require("urlset");
var path = require("path");

urlset.load(path.join(__dirname, "..", "sitemap.json"));

export default urlset.url;
