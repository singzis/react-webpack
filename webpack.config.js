const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
console.log(process.env)
const webpackConfig = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[contenthash].bundle.js',
    clean: true,
    publicPath: isProd ? `cdn地址` : '/',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  mode: process.env.NODE_ENV,
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    contentBase: '',
    allowedHosts: ['xxx.com'],
    proxy: {
      '/api': {
        target: 'http://xxx.com/',
        changeOrigin: true,
        toProxy: true,
        pathRewrite: { '^': '' },
      },
    },
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin({})],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            preset: ['@babel/preset-env'],
            cacheDirectory: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
      {
        test: /.(png|jpg|svg|gif)$/,
        use: 'file-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
}

module.exports = (env, arg) => {
  return webpackConfig
}
