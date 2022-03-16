const path = require("path")
const nodeExternals = require("webpack-node-externals")

module.exports = {
    mode: "production",
    target: "node",
    externals: [nodeExternals()],
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "svgs.js"
    },
    optimization: {
        minimize: true
    },
}

// (28,672 bytes)
// (27,043 bytes)
