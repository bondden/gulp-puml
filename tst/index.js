/**
 * Created by root on 7/30/15.
 */
'use strict';

var

	path = require('path'),
	fs = require('fs-extra'),

	//es = require('event-stream'),
	gutil = require('gulp-util'),
	assert = require('chai').assert,
	pssTru = require('stream').PassThrough,

	puml = require('../'),

	dir = {
		"inp": path.resolve(__dirname + '/d/inp'),
		"out": path.resolve(__dirname + '/d/out')
	},

	fls = [{
		"name": "test1.puml",
		"content": null
	}, {
		"name": "test2.puml",
		"content": null
	}]

;

suite('gulp-puml suite', function() {

	suite.skip('vinyl-fs tests',function(){

		suiteSetup(function(done) {

			let wtr = [];
			fls.forEach((v, i, a) => {
				wtr.push(new Promise((rs, rj) => {

					fs.readFile(
						path.resolve(dir.inp + '/' + v.name),
						{
							'encoding': 'utf8'
						},
						(e, d) => {
							if (e) {
								rj(e);
							} else {
								a[i].content = d;
								rs();
							}
						}
					);

				}));
			});

			Promise.all(wtr).then((r) => {
				done();
			}).catch((e) => {
				done(e);
			});

		});

		test('buffer mode', function(done) {

			var stream = puml();
			var bfrs = [];

			fls.forEach((v) => {
				var fakeBuffer = new Buffer(v.content);
				var fakeFile = new gutil.File({
					contents: fakeBuffer
				});
				bfrs.push({
					"file": fakeFile,
					"bfr": fakeBuffer
				});
			});

			stream.on('data', function(newFile) {
				bfrs.forEach((b) => {
					if (newFile === b.file){
						assert.equal(b.bfr, newFile.contents);
					}
				});
			});

			stream.on('end', function(){
				done();
			});

			bfrs.forEach((b) => {
				stream.write(b.file);
			});

			stream.end();

		});

		test('stream mode', function(done) {

			var stream = puml();
			var stms = [];

			fls.forEach((v) => {
				var fakeStream = new pssTru();
				var fakeFile = new gutil.File({
					contents: fakeStream
				});
				stms.push({
					"file": fakeFile,
					"data": v.content
				});
				fakeStream.write(new Buffer(v.content));
				fakeStream.end();
			});

			stream.on('data', function(newFile) {

				stms.forEach((stm) => {
					if(newFile === stm.file){
						newFile.pipe(es.wait(function(e,d){
							assert.equal(stm.data, d);
						}));
					}
				});

			});

			stream.on('end',()=>{
				done();
			});

			stms.forEach((stm)=>{
				stream.write(stm.file);
			});

			stream.end();

		});

	});

	suite('gulp-puml on real file system suite',function(){
		this.timeout(30000);

		var
			gulp=require('gulp'),
			exec=require('child_process').exec
		;

		setup((done)=>{

			//clean out dir
			fs.emptyDir(dir.out,(e)=>{
				if(e){
					done(e);
				}else{
					//rdr=rdr||new Rdr();
					done();
				}
			});

		});

		test.skip('test Dot',(done)=>{

			exec(	'java -jar '+path.resolve(__dirname+'/../node_modules/esf-puml/bin/plantuml.8031.jar')+' -testdot',(e,r)=>{
	      if(e){
					done(e);
					return e;
	      }
				done();
	    });

		});

		test('render',(done)=>{

			gulp.task('render',()=>{
				return gulp.src(dir.inp)
			    .pipe(puml())
					.pipe(gulp.dest(dir.out));
			});

			try{

				gulp.start('render',(e)=>{

					if(e){
						done(e);
						return e;
					}

					fs.readdir(dir.out,(e,d)=>{

						if(e){
							done(e);
							return e;
						}

						assert.isArray(d,'d should be an array');
						assert.equal(d.length,3,'there should be 3 files (recursive process dirs)');
						assert.deepEqual(d,['test1.svg','test2.svg','test3.svg'],'files should be *.svg');

						done();

					});

				});

			}catch(e){
				done(e);
			};

		});

	});

});
