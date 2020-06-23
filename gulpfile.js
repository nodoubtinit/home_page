let tasks = [
   {
      source: 'src',
      dest: 'dist',
      folders: ['home_page', ]
   },
];

var mapsIncludeContent = true;

const gulp = require('gulp'),
   // sass = require('gulp-sass'),
   // autoprefixer = require('gulp-autoprefixer'),
   // minify = require('gulp-minify'),
   // notify = require('gulp-notify'),
   concat = require('gulp-concat'),
   sourcemaps = require('gulp-sourcemaps');


//#region /// for compiling sass files.
function stylesCompile(source, dest, options = {}) {
   let sass = require('gulp-sass'),
      autoprefixer = require('gulp-autoprefixer');

   //#region preparations
   if (typeof (source) === 'string') {
      source = gulp.src(source);
   }
   let defaultOptions = {
      fileName: 'style',
      outputStyle: 'expanded'
   };
   options = { ...defaultOptions, ...options };
   let { fileName, outputStyle } = options;
   if (!Array.isArray(outputStyle)) {
      outputStyle = [outputStyle];
   }

   //#endregion
   let last;
   for (let outStyle of outputStyle) {
      let filename = fileName + '.css';
      last = source
         .pipe(sourcemaps.init({ largeFile: true, loadMaps: false }))
         .pipe(sass({ outputStyle: outStyle }))
         .pipe(autoprefixer('last 2 versions'))
         .pipe(sourcemaps.write('.', { includeContent: mapsIncludeContent }))
         .pipe(gulp.dest(dest));
      
   }
   return last;
}

function stylesDoAll() {
   let a;
   for (let t of tasks) {
      for (let folder of t.folders) {
         a = stylesCompile(t.source + '/styles/' + folder + '/**/*.scss', t.dest + '/styles', { fileName: folder, outputStyle: ['compressed'] });
      }
   }
   return a;
}
gulp.task('sass', stylesDoAll);
//#endregion

//#region /// for js files.
function jsCompile(source, dest = './dist/js', options = {}) {

   //#region preparations
   if (typeof (source) === 'string') {
      source = gulp.src(source);
   }
   const defaultOptions = {
      fileName: 'all',
      outputStyle: 'expanded'
   };
   options = { ...defaultOptions, ...options };
   let { fileName, outputStyle } = options;
   if (!Array.isArray(outputStyle)) {
      outputStyle = [outputStyle];
   }
   //#endregion

   const babel = require('gulp-babel');
   let babelOptions = {
      presets: ['@babel/env']
   };
   const terser = require('gulp-terser');

   let last;
   for (let outStyle of outputStyle) {

      if (outStyle === 'compressed') {
         let filename = fileName + '.js';
         last = source
            .pipe(sourcemaps.init())
            .pipe(babel(babelOptions))
            .pipe(terser())
            .pipe(concat(filename))
            .pipe(sourcemaps.write('.', { includeContent: mapsIncludeContent }))
            .pipe(gulp.dest(dest));
      } else if (outStyle === 'expanded') {
         let filename = fileName + '.js';

         last = source
            .pipe(sourcemaps.init())

            .pipe(babel(babelOptions))
            .pipe(terser())

            .pipe(sourcemaps.write('.', { includeContent: mapsIncludeContent }))
            .pipe(gulp.dest(dest));
      }

   }
   return last;
}

function jsDoAll() {
   let a;
   for (let t of tasks) {
      for (let folder of t.folders) {
         a = jsCompile(t.source + '/js/' + folder + '/**/*.scss', t.dest + '/js', { fileName: folder, outputStyle: ['compressed'] });
      }
   }
   return a;
}
gulp.task('js', jsDoAll);
//#endregion

gulp.task('all', () => {
   stylesDoAll();
   return jsDoAll();
});
gulp.task('all-styles', () => {
   return stylesDoAll();
});
gulp.task('all-js', () => {
   return jsDoAll();
});

//#region watching

function _watch(sourceFolder, destDir, folders) {
   let last;
   console.log('=================');
   console.log('to:>>>>> ', destDir);
   for (let folder of folders) {
      /// for scss
      {
         let sourceDir, func;
         sourceDir = sourceFolder + '/styles/' + folder + '/**/*.scss';
         console.log('watching: ', sourceDir);
         func = () => {
            console.log('styles');
            console.log('from:', sourceDir);
            console.log('to:', destDir + '/styles');
            return stylesCompile(sourceDir, destDir + '/styles', { fileName: folder, outputStyle: ['compressed'] });
         }
         gulp.watch([sourceDir], func);
      }
      /// for js
      {
         let sourceDir, func;
         sourceDir = sourceFolder + '/js/' + folder + '/**/*.js';
         console.log('watching: ', sourceDir);
         func = () => {
            console.log('scripts');
            console.log('from:', sourceDir);
            console.log('to:', destDir + '/js');
            return jsCompile(sourceDir, destDir + '/js', { fileName: folder, outputStyle: ['compressed'] });
         };
         last = gulp.watch([sourceDir], func);
      }
   }
   return last;
}
function watchHome() {
   return _watch(homePageSourceDir, homePageDestDir, home_folders);
}
function watchCalculator() {
   return _watch(calculatorSourceDir, calculatorDestDir, calc_folders);
}

function watchAll() {
   let a;
   for (let t of tasks) {
      a = _watch(t.source, t.dest, t.folders);
   }
   return a;
}

gulp.task('watch', watchAll);

gulp.task('default', watchAll);

//#endregion