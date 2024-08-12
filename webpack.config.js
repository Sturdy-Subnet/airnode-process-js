// webpack.config.js
const path = require("path");

module.exports = {
  entry: {
    preprocess: "./src/preprocess.js",
    postprocess: "./src/postprocess.js",
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  mode: "production",
};
