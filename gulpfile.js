var gulp = require("gulp")
var sass = require("gulp-sass")
var uglify = require("gulp-uglify")
var concat = require("gulp-concat")
var clean = require("gulp-clean-css")
var connect = require("gulp-connect")

gulp.task("server",function(){
	connect.server({
		//指定服务端口监听的目录
		root:["dist"],
		//端口号
		port:8086,
		//是否允许自动刷新
		livereload:true
	})
})

gulp.task("copyIndex",function(){
	gulp.src("src/index.html").pipe(gulp.dest("dist"))
//	console.log("执行完成")
})

gulp.task("copyTemp",function(){
	gulp.src("src/temp/*.html").pipe(gulp.dest("dist/temp"))
//	console.log("执行完成")
})

gulp.task("changeToCss",function(){
	gulp.src("src/css/*.scss").pipe(sass()).pipe(gulp.dest("src/css")).pipe(clean()).pipe(gulp.dest("dist/css"))
})

gulp.task("copyCss",function(){
   	gulp.src("src/css/base.css").pipe(sass()).pipe(gulp.dest("dist/css"))
})

//gulp.task("copyFont",function(){
// 	gulp.src("src/font/**/*").pipe(sass()).pipe(gulp.dest("dist/font"))
//})

gulp.task("copyJS",function(){
   	gulp.src("src/js/*.js").pipe(uglify()).pipe(gulp.dest("dist/js"))
})

gulp.task("watch",function(){
	gulp.watch("src/index.html",["copyIndex"])
	gulp.watch("src/temp/*.html",["copyTemp"])
	gulp.watch("src/css/base.css",["copyCss"])
	gulp.watch("src/css/*.scss",["changeToCss"])
	gulp.watch("src/js/*.js",["copyJS"])
})
//gulp.task("watch2",function(){
//	return gulp.watch("src/css/**/*",["copyCss"])
//})

gulp.task("default",["server","watch"],function(){
	console.log("执行完成")
})
