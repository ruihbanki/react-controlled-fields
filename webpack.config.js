const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "index.js",
    chunkFilename: "[id].js",
    publicPath: "",
    library: "components",
    libraryTarget: "commonjs2",
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist)/,
        use: {
          loader: "babel-loader",
          options: {
            cacheDirectory: true,
            cacheCompression: false,
            envName: "production",
          },
        },
      },
    ],
  },
  externals: {
    react: "commonjs react",
  },
};
