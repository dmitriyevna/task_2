var gulp = require('gulp'),
	sass = require('gulp-sass'),
	browserSync = require('browser-sync'),
	autoprefixer = require('gulp-autoprefixer'),
	imagemin = require('gulp-imagemin');
	del = require('del');

var paths = {

	html: ['./src/*.html'],
	js: ['./src/js/**/*.js'],
	sass: ['./src/sass/**/*.sass'],
	css: ['./src/css/**/*.css'],
	fonts: ['./src/fonts/**/*'],
	images: ['./src/img/**/*']

};

gulp.task('sass', function(){

	return gulp.src(paths.sass)
			.pipe(sass({outputStyle: 'expanded'}).on('error', sass.logError))
			.pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    		.pipe(gulp.dest('./src/css/'));

});

gulp.task('imagemin', function() {

    gulp.src(paths.images)
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))

});

gulp.task('serve', function(){

    browserSync.init({
        server: {
            baseDir: './src'
        }
    });

    
    gulp.watch([paths.sass, paths.html], ['sass']).on('change', browserSync.reload);

});

gulp.task('default', ['sass','serve']);

gulp.task('clean', function(){

	return del.sync('./build');

})

gulp.task('build', ['clean', 'imagemin', 'sass'], function() {
    
	var buildCss = gulp.src(paths.css)
    .pipe(gulp.dest('build/css'));

    var buildFonts = gulp.src(paths.fonts)
    .pipe(gulp.dest('build/fonts'));

    var buildHtml = gulp.src(paths.html)
    .pipe(gulp.dest('build'));    

    var buildJS = gulp.src(paths.js)
    .pipe(gulp.dest('build/js'));

});