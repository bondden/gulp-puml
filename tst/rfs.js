/**
 * Created by root on 7/30/15.
 **/

"use strict";

//require("mocha");
var

  path = require("path"),
  fs = require("fs-extra"),

  assert = require("chai").assert,
  gulp=require("gulp"),
  exec=require("child_process").exec,

  puml = require("../"),

  dir = {
    "inp": path.resolve(__dirname + "/d/inp"),
    "out": path.resolve(__dirname + "/d/out")
  }

  ;

suite("gulp-puml on real file system suite",function(){
  this.timeout(30000);

  setup((done)=>{

    //clean out dir
    fs.emptyDir(dir.out,(e)=>{
      if(e){
        done(e);
      }else{
        done();
      }
    });

  });

  test("test Dot",(done)=>{

    exec("java -jar "+path.resolve(__dirname+"/../node_modules/esf-puml/bin/plantuml.8031.jar")+" -testdot",(e,r)=>{
      if(e){
        done(e);
        return e;
      }
      done();
    });

  });

  test("render",(done)=>{

    gulp.task("render",()=>{
      return gulp.src([
        path.resolve(dir.inp+"/*.puml"),
        dir.inp+'/**/*.puml'
      ])
        .pipe(puml())
        .pipe(gulp.dest(dir.out));
    });

    try{

      gulp.start("render",(e)=>{

        if(e){
          done(e);
          return e;
        }

        fs.readdir(dir.out,(e,d)=>{

          if(e){
            done(e);
            return e;
          }

          assert.isArray(d,"d should be an array");
          assert.equal(d.length,3,"there should be 3 files (recursive process dirs)");
          assert.deepEqual(d,["sub","test1.svg","test2.svg"],"2 of 3 files should be *.svg");

          fs.readFile(path.resolve(dir.out+"/test1.svg"),{"encoding":"utf8"},(ef,rf)=>{

            if(ef){
              done(e);
              return e;
            }

            let etalon='<?xml version="1.0" encoding="UTF-8" standalone="yes"?><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" height="415px" style="width:150px;height:415px;" version="1.1" viewBox="0 0 150 415" width="150px"><defs/><g><text fill="#191970" font-family="sans-serif" font-size="18" lengthAdjust="spacingAndGlyphs" textLength="51" x="54" y="28.6855">Test 1</text><text fill="#191970" font-family="sans-serif" font-size="18" lengthAdjust="spacingAndGlyphs" textLength="0" x="82" y="51.3262"/><ellipse cx="85.5" cy="65.2813" fill="#191970" rx="10" ry="10" style="stroke: none; stroke-width: 1.0;"/><rect fill="#FEFECE" height="35.0938" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="36" x="67.5" y="95.2813"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="16" x="77.5" y="117.7383">init</text><rect fill="#FFFFFF" height="178.6758" style="stroke: #000000; stroke-width: 2.0;" width="139" x="10" y="140.9512"/><path d="M40,141.9512 L40,151.6973 L30,161.6973 L10,161.6973 " fill="#FFFFFF" style="stroke: #000000; stroke-width: 2.0;"/><text fill="#000000" font-family="Serif" font-size="14" lengthAdjust="spacingAndGlyphs" textLength="20" x="13" y="156.6211">test</text><rect fill="#FEFECE" height="35.0938" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="61" x="55" y="240.5332"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="41" x="65" y="262.9902">run test</text><polygon fill="#FEFECE" points="56,178.6973,115,178.6973,127,190.6973,115,202.6973,56,202.6973,44,190.6973,56,178.6973" style="stroke: #191970; stroke-width: 1.5;"/><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="18" x="89.5" y="214.1162">yes</text><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="59" x="56" y="195.1982">tests remain</text><text fill="#191970" font-family="sans-serif" font-size="11" lengthAdjust="spacingAndGlyphs" textLength="12" x="32" y="188.2803">no</text><rect fill="#FEFECE" height="35.0938" rx="12.5" ry="12.5" style="stroke: #191970; stroke-width: 1.5;" width="52" x="59.5" y="339.627"/><text fill="#191970" font-family="sans-serif" font-size="12" lengthAdjust="spacingAndGlyphs" textLength="32" x="69.5" y="362.084">report</text><ellipse cx="85.5" cy="404.7207" fill="none" rx="10" ry="10" style="stroke: #191970; stroke-width: 1.0;"/><ellipse cx="86" cy="405.2207" fill="#191970" rx="6" ry="6" style="stroke: none; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="85.5" x2="85.5" y1="75.2813" y2="95.2813"/><polygon fill="#191970" points="81.5,85.2813,85.5,95.2813,89.5,85.2813,85.5,89.2813" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="85.5" x2="85.5" y1="202.6973" y2="240.5332"/><polygon fill="#191970" points="81.5,230.5332,85.5,240.5332,89.5,230.5332,85.5,234.5332" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="85.5" x2="85.5" y1="275.627" y2="287.627"/><line style="stroke: #191970; stroke-width: 1.5;" x1="85.5" x2="139" y1="287.627" y2="287.627"/><polygon fill="#191970" points="135,249.1621,139,239.1621,143,249.1621,139,245.1621" style="stroke: #191970; stroke-width: 1.5;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="139" x2="139" y1="190.6973" y2="287.627"/><line style="stroke: #191970; stroke-width: 1.5;" x1="139" x2="127" y1="190.6973" y2="190.6973"/><polygon fill="#191970" points="137,186.6973,127,190.6973,137,194.6973,133,190.6973" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="44" x2="32" y1="190.6973" y2="190.6973"/><polygon fill="#191970" points="28,235.1621,32,245.1621,36,235.1621,32,239.1621" style="stroke: #191970; stroke-width: 1.5;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="32" x2="32" y1="190.6973" y2="299.627"/><line style="stroke: #191970; stroke-width: 1.5;" x1="32" x2="85.5" y1="299.627" y2="299.627"/><line style="stroke: #191970; stroke-width: 1.5;" x1="85.5" x2="85.5" y1="299.627" y2="339.627"/><polygon fill="#191970" points="81.5,329.627,85.5,339.627,89.5,329.627,85.5,333.627" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="85.5" x2="85.5" y1="130.375" y2="178.6973"/><polygon fill="#191970" points="81.5,168.6973,85.5,178.6973,89.5,168.6973,85.5,172.6973" style="stroke: #191970; stroke-width: 1.0;"/><line style="stroke: #191970; stroke-width: 1.5;" x1="85.5" x2="85.5" y1="374.7207" y2="394.7207"/><polygon fill="#191970" points="81.5,384.7207,85.5,394.7207,89.5,384.7207,85.5,388.7207" style="stroke: #191970; stroke-width: 1.0;"/></g></svg>';
            assert.equal(rf,etalon,"checking proper result content");

            done();

          });

        });

      });

    }catch(e){
      done(e);
    }

  });

});
