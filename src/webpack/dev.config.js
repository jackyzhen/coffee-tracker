const webpack = require("webpack");
const autoprefixer = require("autoprefixer");
const precss = require("precss");

const port = 4001;
const hostname = "localhost";

module.exports = {
  // where does Webpack start building?
  entry: [
    `webpack-hot-middleware/client?path=http://${hostname}:${port}/__webpack_hmr`,
    "./src/app/client"
  ],

  // where should Webpack store it processed files
  output: {
    path: "/",
    filename: "bundle.js",
    publicPath: `http://${hostname}:${port}/`
  },

  resolve: {
    extensions: ["", ".js", ".css"]
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ["react-hot", "babel"],
        exclude: /(node_modules|vendor)/
      },
      {
        test: /\.css$/,
        loader:
          "style-loader!css-loader?modules&importLoaders=2&localIdentName=[local]_[hash:base36:5]!postcss-loader"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.jpg$/,
        loader: "url-loader",
        query: { mimetype: "image/jpg" }
      }
    ]
  },

  devtool: "inline-source-map",
  devServer: {
    hot: true
  }
};
