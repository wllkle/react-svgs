const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Shebang = require("webpack-shebang-plugin");

module.exports = {
    mode: "production",
    target: "node",
    entry: "./src/index.ts",
    externals: [nodeExternals()],
    plugins: [new Shebang({banner: "#!/usr/bin/env node", raw: true})],
    optimization: {
        minimize: true
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                // exclude: /node_modules/
            }
        ]
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: "svgs.js"
    }
};

// (28,672 bytes)
// (27,043 bytes)
