// module import
import gulp from 'gulp'; // 俺にﾐα(ﾟДﾟ　)ﾏｶｾﾛ!!
import browserSync from 'browser-sync'; // ブラウザはおともだち
import dateUtils from 'date-utils'; // 日付を簡単フォーマット
import insert from 'gulp-insert'; // ファイルに任意のものをインサートできる
import rimraf from 'rimraf'; // rm -rfと同義
import fileinclude from 'gulp-file-include'; // ファイルのインクルード
import plumber from 'gulp-plumber'; // エラー起きてもこけない
import runSequence from 'run-sequence'; // タスクの処理順序の担保
import replace from 'gulp-replace'; // 置換

import imagemin from 'gulp-imagemin'; // 画像圧縮
import sass from 'gulp-sass'; // sassからcss
import please from "gulp-pleeease"; // クロスブラウザとかを良しなにしてくれる
import csscomb from 'gulp-csscomb'; // cssを綺麗にしてくれる
import gutil from 'gulp-util'; // これは何か。プラグインがなんかあった時に教えてくれたりする何かなのかな？
import webpack from 'gulp-webpack'; // js関係のことを今回やらせます。
import webpackConfig from './webpack.config.js'; // webpackの設定ファイル


////////// Directory
const DIR = {
  src:  'src/',
  dest: 'dest/',
  srcAssets:  'src/assets/',
  destAssets: 'dest/assets/',
  release: '_release/'
}

////////// 現在時刻
const fmtdDate = new Date().toFormat("YYYY-MM-DD HH24MISS");


////////// Tasks

// clean dest dir
gulp.task('clean',  (cb)=> {
  rimraf(DIR.dest, cb);
});

// browserSync
gulp.task('browserSync', ()=> {
  browserSync.init({
    server: {
      baseDir: DIR.dest
    },
    ghostMode: {
      clicks: true,
      forms: true,
      scroll: false
    }
  });
});

// sass
gulp.task('sass', ()=> {
  return gulp.src(DIR.srcAssets+'sass/**/*.{sass,scss}')
  .pipe(plumber())
  .pipe(sass({outputStyle: ':expanded'})
  .on('error', sass.logError))
  .pipe(please({
    autoprefixer: {
      browsers: ['last 4 versions', 'last 4 ios_saf versions']
    },
    sass: false,
    // minifier: false, //if env not minify
    rem: false,
    pseudoElements: false,
    mqpacker: true
  }))
  .pipe(csscomb())
  .pipe(insert.prepend('/*! compiled at:'+fmtdDate+' */\n'))
  .pipe(gulp.dest(DIR.destAssets+'css/'))
  .pipe(browserSync.stream());
});

// js conat
gulp.task('scripts', () => {
    return gulp.src(DIR.srcAssets + 'js/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(DIR.destAssets + 'js'))
    .pipe(browserSync.stream());

});


// ヘッダー・フッターインクルード
gulp.task("fileinclude", ()=> {
  gulp.src([DIR.src + '**/*.html',!DIR.src +'src/_inc/**/*.html'])
    .pipe(plumber())
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(DIR.dest))
    .pipe(browserSync.stream());
});

// imageMin
gulp.task('imageMin', ()=> {
  return gulp.src(DIR.srcAssets+'img/**/*')
  .pipe(imagemin())
  .pipe(gulp.dest(DIR.destAssets+'img/'))
  .pipe(browserSync.stream());
});

// watch
gulp.task('watch', ()=> {
  gulp.watch(DIR.src+ '**/*.html', ['fileinclude']);
  gulp.watch(DIR.srcAssets+'sass/**/*.{sass,scss}', ['sass']);
  gulp.watch(DIR.srcAssets+'js/**/*.js', ['scripts']);
  gulp.watch(DIR.srcAssets+'img/**/*', ['imageMin']);
});

// clean
gulp.task('clean', ()=> {
  runSequence(
    'clean'
  )
});

// default
gulp.task('default', ()=> {
  runSequence(
    ['fileinclude','scripts','sass','imageMin'],
    'browserSync',
    'watch'
  )
});

////////// upload用を生成



// // ↑タスクを直列で実行
// gulp.task('release', ()=>{
//   runSequence(
//     'copyImg',
//   )
// });
