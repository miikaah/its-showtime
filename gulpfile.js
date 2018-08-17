const webpack = require('webpack');
const config = require('./webpack.config');
const gulp = require('gulp');
const sass = require('gulp-sass');
const htmlReplace = require('gulp-html-replace');
const rimraf = require('rimraf');
const path = require('path');
const browserSync = require('browser-sync').create();

const DIR_DEV = 'devdist';
const DIR_PROD = 'dist';
const STYLES = './src/styles.scss';
const HTML = './src/index.html';
const TS = './src/app/**/*.ts';

let outDir = DIR_DEV;

function clean(dir) {
	rimraf(path.join(__dirname, dir), err => console.error(err));
}

function webpackCb(err, stats) {
	if (!browserSync.active) browserSync.init({ server: `${outDir}/` });
	if (err) return console.error(err);
	console.log(stats.endTime - stats.startTime);
	makeSass();
	makeHtml();
	browserSync.reload();
}

function makeSass() {
	return gulp.src(STYLES)
		.pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
		.pipe(gulp.dest(`./${outDir}`))
		.pipe(browserSync.stream());
}

function makeHtml() {
	return outDir === DIR_DEV ?
		// Set CSP for local development
		gulp.src(HTML)
			.pipe(htmlReplace({ csp: "<meta http-equiv='Content-Security-Policy' content='default-src 'self'; connect-src http://localhost:3000 ws://localhost:3000; script-src 'sha256-iJcsMwzkuoYDQiIE1l2dQLYUNQ2yPFt9EAZXv+KyjAw=' ws://localhost:3000 http://localhost:3000 'unsafe-eval'; object-src 'self';'>" }))
			.pipe(gulp.dest(`./${outDir}`)) :
		gulp.src(HTML).pipe(gulp.dest(`./${outDir}`));
}

// Dev tasks including watches for html and scss
gulp.task('watch', () => {
	clean(outDir);
	webpack({ ...config, devtool: 'inline-source-map' })
		.run((err, stats) => webpackCb(err, stats));
});
gulp.task('setup:watches', () => {
	gulp.watch(STYLES, () => makeSass());
	gulp.watch(HTML, () => makeHtml()).on('change', browserSync.reload);
	gulp.watch(TS, ['watch']);
});
gulp.task('default', ['watch', 'setup:watches']);

// Production tasks
gulp.task('release:make', () => {
	outDir = DIR_PROD;
	clean(outDir);
	webpack({
		...config,
		mode: 'production',
		output: { ...config.output, path: path.join(__dirname, outDir) }
	}).run((err, stats) => webpackCb(err, stats));
});
gulp.task('release', ['release:make']);
