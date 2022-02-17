const path = require("path");

module.exports = {
  entry: {
    bundle: "./src/view/app/index.tsx",
  },
  output: {
    path: __dirname,
    filename: "[name].js",
  },
  devtool: "eval-source-map",
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        loader: "ts-loader",
        options: {},
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
          },
        ],
      },
    ],
  },
  performance: {
    hints: false,
  },
};
