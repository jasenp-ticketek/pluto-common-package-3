var path = require("path");

module.exports = {
  mode: "production",
  entry: path.resolve(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist")
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        use: "babel-loader"
      },
      {
        test: /\.(png|jpe?g)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 20000,
              name: "static/[name]-[hash].[ext]",
              fallback: "responsive-loader"
            }
          }
        ]
      }
    ]
  },

  resolve: {
    extensions: [".js", ".jsx", ".json"]
  }
};
