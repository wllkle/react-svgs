const path = require("path")
const nodeExternals = require("webpack-node-externals")
const Shebang = require("webpack-shebang-plugin")

module.exports = {
    mode: "production",
    target: "node",
    externals: [nodeExternals()],
    plugins: [new Shebang({banner: "#!/usr/bin/env node", raw: true})],
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "svgs.js"
    },
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    }
}

// (28,672 bytes)
// (27,043 bytes)
