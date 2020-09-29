const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // 예제에는 named export라는 얘기 없었는데
const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: 'development',
  entry: './src/index.tsx',
  // entry: path.resolve(__dirname, 'src/index'),
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ]
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          'file-loader'
        ]
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: [
            "@babel/preset-env",
            "@babel/preset-react"
            ]
          }
        }]
      },
      {
        test: /\.jsx?/,
        loader: 'babel-loader',
        options: {
          presets: [['@babel/preset-env'], ['@babel/preset-react']],
        },
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(), // 순서대로
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public' },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'public/index.html'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin(),
  ],
  devServer: {
    contentBase: './build',
    hot: true,
    inline: true, // 이걸 해야 하나?
    compress: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    // path: path.join(__dirname, 'dist'),
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
  }
};
