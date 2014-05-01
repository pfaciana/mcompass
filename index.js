'use strict';

var gulp = require('gulp'),
	compass = require('gulp-compass'),
	path = require('path'),
	through = require('through2');

module.exports = function (opts) {
	opts = opts || {};

	function stream(file, encoding, callback) {

		var pwd = path.dirname(file.path),
			ext = path.extname(file.path);

		// this is needed for relative mapping when concatenating
		process.chdir(pwd);

		// if not a sass file, pass through and do not alter
		if (ext !== ".scss" && ext !== ".sass") {
			this.push(file);
			return callback();
		}

		gulp.src(file.path).pipe(compass(opts)).on('data', function (buffer) {
			this.push(buffer);
			callback();
		}.bind(this));
	}

	return through.obj(stream);
};