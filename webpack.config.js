'use strict';

var webpack = require('webpack');

module.exports = {
  entry: {
    script: './src/assets/js/script.js'
  },
  output: {
    filename: "[name].js"
  },
  //ファイル名解決のための設定
  resolve: {
    extensions: ['', '.js'],//拡張子の省略ができるように
    modulesDirectories: ['node_modules'],//moduleディレクトリの指定
    alias: { //インストールしたライブラリにaliasを貼るとrequire('TweenMax');のようにパス無しでつかえる
      TweenMax: 'gsap/src/uncompressed/TweenMax.js'
    }
  },
  // モジュール
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  // プラグイン
  plugins: [
    // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
    new webpack.optimize.DedupePlugin(),
    // ファイルを細かく分析し、まとめられるところはできるだけまとめてコードを圧縮する
    new webpack.optimize.AggressiveMergingPlugin(),
    // uglify
    // new webpack.optimize.UglifyJsPlugin(),
    // modernizr
    // new ModernizrWebpackPlugin(ModernizrConfig),
    // jQueryをグローバルに出す
    new webpack.ProvidePlugin({
      // Promise: 'imports?this=>global!exports?global.Promise!es6-promise',
      // fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch',
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ]
};
