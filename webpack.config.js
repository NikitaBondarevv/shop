const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './index.tsx',
  context: path.resolve(__dirname, 'src'),
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
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
        test: /\.tsx$/,
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
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.tsx', '.ts', '.json', '.js'],
  },
  plugins: [
    new HTMLPlugin({
      title: 'React',
      template: './index.html'
    }),
    new MiniCssExtractPlugin({ filename: 'styles.css' }),
    new webpack.DefinePlugin({
      BASE_URL: "'http://localhost:8086'"
    })
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
    historyApiFallback: true
  }
};
