'use strict';
var gutil 	= require('gulp-util');
var through = require('through2');
var PumlRenderer 		= require('esf-puml').PumlRenderer;
var stream = require('stream');
var streamBuffers = require("stream-buffers");

module.exports = function (options) {

	var options=options||{
		"format":"svg"
	};

	return through.obj(function (file, enc, cb) {

		if (file.isNull()) {
			cb(null, file);
			return;
		}

		var rdr=new PumlRenderer();
		var fmt='svg';

		if(options.format && (
			options.format === 'png' ||
			options.format === 'svg' ||
			options.format === 'eps'
		) ){
			fmt=options.format;
		}

		if (file.isBuffer()) {

			try{

				var myReadableStreamBuffer = new streamBuffers.ReadableStreamBuffer({
				  frequency: 10,
				  chunkSize: 2048
				});

				file.contents =
					myReadableStreamBuffer
					.pipe(rdr.stream(fmt));

				myReadableStreamBuffer
					.put(file.contents, "utf8")
				;

			} catch (err) {
				this.emit('error', new gutil.PluginError('gulp-puml', err));
			}

    }

    if (file.isStream()) {
			try {

	      file.contents = file.contents.pipe(rdr.stream(fmt));

			} catch (err) {
				this.emit('error', new gutil.PluginError('gulp-puml', err));
			}

    }

		cb();
		
	});
};
