const path = require("path");
const nodeExternals = require("webpack-node-externals");
const Shebang = require("webpack-shebang-plugin");

module.exports = {
    mode: "production",
    cache: false,
    target: "node",
    entry: "./src/index.ts",
    externals: [nodeExternals()],
    optimization: {
        minimize: true
    },
    resolve: {
        extensions: [".ts"]
    },
    module: {

        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/
            }
        ]
    },
    plugins: [new Shebang()],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "svgs.js"
    }
};
