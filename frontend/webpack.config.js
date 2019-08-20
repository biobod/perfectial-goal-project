const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


module.exports = {
  devtool: 'source-map',
  entry: {
    name: ['@babel/polyfill', path.join(__dirname, './index.js')],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: 'dist',
  },
  resolve: {
    alias: {
      Common: path.resolve(__dirname, './src/common'),
    },
  },
  watch: true,
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react', '@babel/env'],
        },
      },
    }, {
      test: /\.css$/,
      use: ExtractTextPlugin.extract(
        {
          fallback: 'style-loader',
          use: ['css-loader'],
        },
      ),
    },
    {
      test: /\.(png|jpg|gif)$/,
      use: [
        {
          loader: 'file-loader',
        },
      ],
    },
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './public/index.html', // source html
    }),
    new ExtractTextPlugin({ filename: 'css/style.css' }),
  ],
};
