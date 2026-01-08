const path = require('path');
const { HtmlRspackPlugin } = require('@rspack/core');

/** @type {import('@rspack/cli').Configuration} */
module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';

  return {
    entry: './src/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: isProduction ? '[name].[contenthash].js' : '[name].js',
      clean: true,
    },
    experiments: {
      css: true,
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: 'builtin:swc-loader',
            options: {
              jsc: {
                parser: {
                  syntax: 'ecmascript',
                  jsx: true,
                },
                transform: {
                  react: {
                    runtime: 'automatic',
                  },
                },
              },
            },
          },
        },
        {
          test: /\.css$/,
          type: 'css',
        },
      ],
    },
    plugins: [
      new HtmlRspackPlugin({
        template: './public/index.html',
      }),
    ],
    devServer: {
      static: {
        directory: path.join(__dirname, 'public'),
      },
      port: 4000,
      hot: true,
    },
    resolve: {
      extensions: ['.js', '.jsx'],
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
  };
};
