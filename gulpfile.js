const gulp = require("gulp");
const browserSync = require("browser-sync").create(); //npm install -g browser-sync
const jasmineBrowser = require("gulp-jasmine-browser");


//watchers

gulp.task("watch:css", function(){
    gulp.watch("./css/**/*.css", gulp.series("cssw"));
    
});
gulp.task("cssw", function(done){
    gulp.watch("./css/**/*.css", browserSync.reload());
    done();
});

gulp.task("watch:html", function(){
    gulp.watch("*.html", gulp.series("htmlw"));
     
});
gulp.task("htmlw", function(done){
    gulp.watch("*.html", browserSync.reload());
    done();
});

gulp.task("watch:js", function(){
    gulp.watch("./js/**/*.js", gulp.series("jsw"));
    
  
});

gulp.task("jsw", function(done){
    gulp.watch("./js/**/*.js", browserSync.reload());
    done(); 
});

gulp.task("watch:tests", function(){
    gulp.watch("./tests/**/*.js", gulp.series("testsw"));
    
});
gulp.task("testsw", function(done){
    gulp.watch("./tests/**/*.js", browserSync.reload());
    done(); 
});


gulp.task("watch", gulp.parallel("watch:css", "watch:html", "watch:js", "watch:tests"));

//browser sync, launched with sync
gulp.task("browserSync", function(done) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
    });
    done();
});
//sync task
gulp.task("sync",
    gulp.parallel( "browserSync", gulp.parallel("watch"))
);


//jasmin
gulp.task("tests", function() {
    gulp.src("tests/spec/extraSpec.js")
        .pipe(jasmineBrowser.specRunner())
        .pipe(jasmineBrowser.server({port:3001}));
});
