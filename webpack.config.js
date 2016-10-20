'use strict';

var webpack = require('webpack');
var Path = require('path');

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
      "TweenLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenLite.js'),
      "TweenMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TweenMax.js'),
      "TimelineLite": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineLite.js'),
      "TimelineMax": Path.resolve('node_modules', 'gsap/src/uncompressed/TimelineMax.js'),
      "ScrollMagic": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/ScrollMagic.js'),
      "animation.gsap": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap.js'),
      "debug.addIndicators": Path.resolve('node_modules', 'scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js')
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
