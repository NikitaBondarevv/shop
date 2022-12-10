const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.js',
  // context: path.resolve(__dirname, 'src'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', ['@babel/preset-react', { runtime: 'automatic' }]] }
        },
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]--[hash:base64:5]',
              },
              importLoaders: 1,
            },
          },
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader',
        options: { emitWarning: true }
      },
      {
        test : /\.(jpg|png|svg|jpeg)$/,
        type: 'asset/resource',
      } 
    ]
  },
  plugins: [
    new HTMLPlugin({
      title: 'React',
      template: path.resolve(__dirname, 'index.html')
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' })
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      name(module) {
        const moduleFileName = module
          .identifier()
          .split('/')
          .reduceRight((item) => item);

        return moduleFileName.replace(/\.\w+$/, '');
      },
    }
  },
  devServer: {
    port: 9000,
    hot: true,
    client: {
      overlay: false,
    },   
  }
};
