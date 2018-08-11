const webpack = require('webpack');
const config = require('./webpack.config');
const gulp = require('gulp');
const sass = require('gulp-sass');
const rimraf = require('rimraf');
const path = require('path');

const DIR_DEV = 'devdist';
const DIR_PROD = 'dist';
const STYLES = './src/styles.scss';
const HTML = './src/index.html';

let outDir = DIR_DEV;

function clean(dir) {
	rimraf(path.join(__dirname, dir), err => console.error(err));
}

function webpackCb(err, stats, done) {
	if (err) {
		console.error(err);
		return done(err);
	}
	console.log(stats.endTime - stats.startTime);
	done();
}

function makeSass() {
	return gulp.src(STYLES)
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest(`./${outDir}`));
}

function makeHtml() {
	return gulp.src(HTML).pipe(gulp.dest(`./${outDir}`));
}

// Dev tasks including watches for html and scss
gulp.task('watch', done => {
	clean(outDir);
	webpack({ ...config, devtool: 'inline-source-map' }).watch({
		aggregateTimeout: 200,
		poll: 2000
	}, (err, stats) => webpackCb(err, stats, done));
});
gulp.task('watch:sass', ['watch'], () => makeSass());
gulp.task('watch:html', ['watch'], () => makeHtml());
gulp.task('sass:watch', () => gulp.watch(STYLES, ['sass:make']));
gulp.task('sass:make', () => makeSass());
gulp.task('html:watch', () => gulp.watch(HTML, ['html:make']));
gulp.task('html:make', () => makeHtml());
gulp.task('default', ['watch', 'watch:sass', 'watch:html', 'sass:watch', 'html:watch']);

// Production tasks
gulp.task('release:make', done => {
	outDir = DIR_PROD;
	clean(outDir);
	webpack({
		...config,
		mode: 'production',
		output: { ...config.output, path: path.join(__dirname, outDir) }
	}).run((err, stats) => webpackCb(err, stats, done));
});
gulp.task('release:sass', ['release:make'], () => makeSass());
gulp.task('release:html', ['release:make'], () => makeHtml());
gulp.task('release', ['release:make', 'release:sass', 'release:html']);
