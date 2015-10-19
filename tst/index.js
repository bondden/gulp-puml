/**
 * Created by root on 7/30/15.
 */
'use strict';

var

	assert   =require('chai').assert,
	path	 	 =require('path'),
	fs  	 	 =require('fs-extra'),

	gulp 	 	 =require('gulp'),
	puml     =require('../'),

	dir={
		"inp":path.resolve(__dirname+'/d/inp'),
		"out":path.resolve(__dirname+'/d/out')
	}

;

suite('gulp-puml suite',function(){

	suite('init',function(){

		// test('test Dot',(done)=>{
		//
		// 	exec(	'java -jar '+path.resolve(__dirname+'/../bin/plantuml.8031.jar')+' -testdot',(e,r)=>{
    //     if(e){
		// 			done(e);
		// 			return e;
    //     }
		// 		done();
    //   });
		//
		// });

	});

	suite('run',function(){
		this.timeout(30000);

		setup((done)=>{

			//clean out dir
			fs.emptyDir(dir.out,(e)=>{
				if(e){
					done(e);
				}else{
					rdr=rdr||new Rdr();
					done();
				}
			});

		});

		test('render',(done)=>{

			gulp.task('render',()=>{
				return gulp.src(d.js.src)
			    .pipe(eslint())
					.pipe(gulp.dest(d.js.dst));
			});

			rdr.renderDir(dir.inp,dir.out).then((r)=>{

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

			}).catch((e)=>{
				done(e);
			});

		});

	});

});
