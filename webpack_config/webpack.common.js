/*----------  Vendor Imports  ----------*/
const webpack = require('webpack');

/*----------  Node imports  ----------*/
const path = require('path');
const fs = require('fs');
const { promisify } = require('util');

/*----------  Setup  ----------*/
const readFileAsync = promisify(fs.readFile);

const getBaseWebpackConfig = async () => {

  let babelConfig;
  try {
    babelConfig = await readFileAsync(path.resolve(__dirname, '../.babelrc'), {encoding: 'utf8'});
    babelConfig = JSON.parse(babelConfig);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }

  const baseConfig = {

    entry: {
      polyfill: '@babel/polyfill',
      app: path.resolve(__dirname, '../client/entry.jsx'),
    },

    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '../public'),
      publicPath: '/',
    },

    resolve: {
      extensions: ['.jsx', '.js'],
      alias: {
        '@': path.resolve(__dirname, '../client'),
      },
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: babelConfig,
          },
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        }
      ],
    },

    plugins: [
      new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      })
    ],

  };

  return baseConfig;

}; // end getBaseWebpackConfig

module.exports = getBaseWebpackConfig;
