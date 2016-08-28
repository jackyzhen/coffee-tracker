const path = require('path');
const webpack = require('webpack');

// post CSS plugins
const autoprefixer = require('autoprefixer');
const precss = require('precss');

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, '../../dist'),
};

module.exports = {
  // where does Webpack start building?
  entry: [
    './src/app/client',
  ],

  // where should Webpack store it processed files
  output: {
    path: PATHS.dist,
    filename: 'bundle.js',
  },

  resolve: {
    extensions: ['', '.js', '.css'],
  },

  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['react-hot', 'babel'],
      exclude: /(node_modules|vendor)/,
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader?modules&importLoaders=2&localIdentName=[local]_[hash:base36:5]!postcss-loader',
    }, {
      test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
      loader: 'url?limit=10000&mimetype=image/svg+xml',
    }, {
      test: /\.jpg$/,
      loader: 'url-loader',
      query: { mimetype: 'image/jpg' },
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.js$/,
      loaders: [
        'transform-loader/cacheable?brfs',
        'transform-loader/cacheable?packageify',
      ],
    }, {
      test: /node_modules[\\\/]auth0-lock[\\\/].*\.ejs$/,
      loader: 'transform-loader/cacheable?ejsify',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },

  postcss: function postcss() {
    return [
      autoprefixer({
        browsers: ['last 2 versions'],
      }),
      precss,
    ];
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // make sure build stops when it encounter an error
    new webpack.NoErrorsPlugin(),
  ],
};