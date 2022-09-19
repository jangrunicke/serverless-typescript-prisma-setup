/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");
const nodeExternals = require("webpack-node-externals");
const slsw = require("serverless-webpack");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");

const { isLocal } = slsw.lib.webpack;

module.exports = {
  target: "node",
  stats: "normal",
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  mode: isLocal ? "development" : "production",
  optimization: { concatenateModules: false },
  resolve: { extensions: [".js", ".json", ".ts"] },

  module: {
    rules: [
      {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve(".webpackCache"),
            },
          },
          "babel-loader",
        ],
      },
    ],
  },
  output: {
    libraryTarget: "commonjs",
    filename: "[name].js",
    path: path.resolve(__dirname, ".webpack"),
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        memoryLimit: 5000,
      },
    }),
  ],
};
