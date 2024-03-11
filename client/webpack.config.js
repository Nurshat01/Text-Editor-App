const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

const title = 'Text Editor';
const swSrc = './src-sw.js';
const swDest = 'src-sw.js';
const name = 'Text Editor';
const short_name = 'JATE';
const description = 'Just another text editor.';
const background_color = '#225ca3';
const theme_color = '#225ca3';
const start_url = './';
const publicPath = './';
const srcImagePath = 'src/images/logo.png';
const sizes = [96, 128, 192, 256, 384, 512];
const destination = path.join('assets', 'icons');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        title,
      }),
      new InjectManifest({
        swSrc,
        swDest,
      }),
      new WebpackPwaManifest({
        fingerprints: false,
        inject: true,
        name,
        short_name,
        description,
        background_color,
        theme_color,
        start_url,
        publicPath,
        icons: [
          {
            src: path.resolve(srcImagePath),
            sizes,
            destination: path.join(destination),
          },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [
                '@babel/plugin-proposal-object-rest-spread',
                '@babel/transform-runtime',
              ],
            },
          },
        },
      ],
    },
  };
};
