'use strict';

var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var less = require('gulp-less');
var cssmin = require('gulp-cssmin');

var paths = {
	scripts: ['node_modules/bootstrap/js/transition.js',
		'node_modules/bootstrap/js/button.js',
		'node_modules/bootstrap/js/dropdown.js',
		'node_modules/bootstrap/js/tooltip.js',
		'node_modules/bootstrap/js/modal.js'
	],
	images: ['assets/img/*.{gif,jpg,png,svg}'],
	styles: ['assets/less/main.less']
};

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function(cb) {
	// You can use multiple globbing patterns as you would with `gulp.src`
	del(['public/assets'], cb);
});

gulp.task('scripts', ['clean'], function() {
	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	return gulp.src(paths.scripts)
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(concat('main.min.js'))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest('public/assets/js'));
});

gulp.task('styles', ['clean'], function() {
	return gulp.src(paths.styles)
		.pipe(less({
			paths: ['node_modules/bootstrap/less/']
		}))
		.pipe(concat('main.min.css'))
		.pipe(cssmin())
		.pipe(gulp.dest('public/assets/css'));
});

// Copy all static images
gulp.task('images', ['clean'], function() {
	return gulp.src(paths.images)
		// Pass in options to the task
		.pipe(imagemin({
			optimizationLevel: 5
		}))
		.pipe(gulp.dest('public/assets/img'));
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['scripts', 'images', 'styles']);
