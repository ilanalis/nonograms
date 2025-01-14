const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
// const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ESLintPlugin = require("eslint-webpack-plugin");
const {CleanWebpackPlugin }= require ("clean-webpack-plugin")

const devServer = (isDev) => {
  isDev
    ? {
        devServer: {
          open: true,
          hot: true,
          port: 8080,
          contentBase: path.join(__dirname, "public"),
        },
      }
    : {};
};

const esLintPlugin = (isDev) => {
  isDev ? [new ESLintPlugin({ extensions: ["js"] })] : [];
};

module.exports = ({ develop }) => ({
  mode: develop ? "development" : "production",
  devtool: develop ? "inline-source-map" : false,
  entry: {
    app: "./src/index.js",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: "assets/[hash][ext]",
  },
  module: {
    rules: [
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.css/i,
        use: "css-loader",
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(mp3|wav|mpe?g|ogg)$/i,
        type: "asset/resource",

      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css",
    }),
    // new CopyPlugin({
    //   patterns: [
    //     {
    //       from: "./public",
    //     },
    //   ],
    // }),
    new CleanWebpackPlugin({
      cleanStaleWebpackAssets: false,
    }),
  ],
  ...devServer(develop),
  ...esLintPlugin(develop),
});
