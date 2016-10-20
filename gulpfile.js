var gulp = require('gulp');

var minifyCSS = require('gulp-minify-css'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename'),
    rev = require('gulp-rev'),
    revCollector = require('gulp-rev-collector'),
    processhtml = require('gulp-processhtml');

gulp.task('processhtml', function() {
    return gulp.src('./public/**/*.html')
        .pipe(processhtml())
        .pipe(gulp.dest('./public'));
});

// 压缩、合并、生成md5 css 文件
// 在命令行使用 gulp css 启动此任务
gulp.task('css', function() {
    gulp.src(['public/public/css/poole.css', 'public/public/css/syntax.css', 'public/public/css/hyde.css', 'public/public/css/custom.css', 'public/public/css/font-awesome.min.css'])
        .pipe(concat('main.min.css'))
        .pipe(minifyCSS())
        .pipe(rev())
        .pipe(gulp.dest('public/public/dist/css'))
        .pipe(rev.manifest())
        .pipe(gulp.dest('./rev'));
});

gulp.task('rev', function() {
    gulp.src(['./rev/*.json', './public/**/*.html'])
        .pipe(revCollector())
        .pipe(gulp.dest('./public'));
});

gulp.task('font', function() {
    gulp.src('public/public/css/fonts/*')
        .pipe(gulp.dest('public/public/dist/css/fonts'))
});

// 在命令行使用 gulp auto 启动此任务
gulp.task('auto', function() {
    // 监听文件修改，当文件被修改则执行 css 任务
    gulp.watch('css/*.css', ['css'])
});

// 使用 gulp.task('default') 定义默认任务
// 在命令行使用 gulp 启动 css 任务和 auto 任务
gulp.task('default', ['css', 'rev', 'font']);