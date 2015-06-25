'use strict';
/* eslint-disable */
import gulp from 'gulp';
import shell from 'gulp-shell';
import seq from 'run-sequence';

const path = {
  app:    `./app`,
  styles: `./app/common-styles`,
  bin:    `./node_modules/.bin`
}

const bin = {
  lessc:      `${path.bin}/lessc`,
  browserify: `${path.bin}/browserify`,
  watchify:   `${path.bin}/watchify`
};

gulp.task('less', shell.task([`${bin.lessc} ${path.styles}/index.less > ./style.css`]));

const babelify = `[ babelify --optional es7.decorators ]`;
gulp.task('browserify', shell.task([`${bin.browserify} -e ${path.app}/index.js -o ./bundle.js -t ${babelify}`]));
gulp.task('watchify',   shell.task([`${bin.watchify}   -e ${path.app}/index.js -o ./bundle.js -t ${babelify} -v`]));
gulp.task('build', done => seq(['less'], 'browserify', done));
gulp.task('_watch', ['less'], () => {
  gulp
    .watch([`${path.app}/**/*.less`], ['less'])
    .on('error', err => process.exit(1));
});

gulp.task('watch', done => seq('_watch', 'watchify', done));
