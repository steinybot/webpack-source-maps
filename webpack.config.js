const path = require('path');

const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { SourceMapDevToolPlugin } = require('webpack');

const sourceDir = 'src';
const distDir = path.join(__dirname, 'dist');
const distSourceDir = 'src'

module.exports = {
  mode: 'production',
  entry: './src/index.ts',
  // Disable the devtool and specify the options to the SourceMapDevToolPlugin manually.
  devtool: false,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: sourceDir, to: path.join(distDir, distSourceDir) },
      ],
    }),
    new HtmlWebpackPlugin(),
    new SourceMapDevToolPlugin({
      // Specify the filename so that the source map is not inlined.
      filename: '[file].map',
      // Prevent source content from being included in the source map.
      noSources: true,
      // This sets the sourceRoot but now we have to make sure to relativize everything to this.
      sourceRoot: distSourceDir,
      moduleFilenameTemplate: params => {
        //console.error('identifier: ' + params.identifier);
        //console.error('shortIdentifier: ' + params.shortIdentifier);
        //console.error('resource: ' + params.resource);
        //console.error('resourcePath: ' + params.resourcePath);
        //console.error('absoluteResourcePath: ' + params.absoluteResourcePath);
        //console.error('allLoaders: ' + params.allLoaders);
        //console.error('query: ' + params.query);
        //console.error('moduleId: ' + params.moduleId);
        //console.error('hash: ' + params.hash);
        //console.error('namespace: ' + params.namespace);
        const normalizedResourcePath = path.normalize(params.resourcePath);
        if (normalizedResourcePath.startsWith(sourceDir)) {
          return path.relative(sourceDir, normalizedResourcePath);
        } else {
          // Default.
          return 'webpack://' + params.namespace + '/' + params.resourcePath;
        }
      }
    })
  ],
  devServer: {
    contentBase: distDir
  },
};
