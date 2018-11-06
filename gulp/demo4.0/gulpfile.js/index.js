const { src, dest, watch, series, parallel } = require('gulp');
const gclean = require('gulp-clean')

function clean() {
  return src(['./dist/'], {allowEmpty: true})
  .pipe(gclean())
}

function copy() {
  return src(['a/**/*.txt', '!a/b/*'])
  .pipe(dest('./dist/'))
}

function watchAll (cb) {
  const watcher = watch('a/**/*');

  watcher.on('change', function(path, stats) {
    console.log(`File ${path} was changed`);
    src(path, {base: '.'})
    .pipe(dest('./changed/'))
  });

  watcher.on('add', function(path, stats) {
    console.log(`File ${path} was added`);
  });

  watcher.on('unlink', function(path, stats) {
    console.log(`File ${path} was removed`);
  });
  // watcher.close();

  cb()
}


exports.default = series(clean, copy)
exports.clean = clean
exports.copy = copy
exports.watch = watchAll