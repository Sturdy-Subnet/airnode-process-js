// webpack.config.js
const path = require("path");
const webpack = require("webpack");

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
    resolve: {
        extensions: [".ts", ".js"],
        fallback: {
            buffer: require.resolve("buffer"),
        },
    },
    plugins: [
        // Work around for Buffer is undefined:
        // https://github.com/webpack/changelog-v5/issues/10
        new webpack.ProvidePlugin({
            Buffer: ["buffer", "Buffer"],
        }),
        new webpack.ProvidePlugin({
            process: "process/browser",
        }),
    ],
};
