const gulp = require("gulp")
const browserSync = require("browser-sync")
const autoprefixer = require("gulp-autoprefixer")
const uglify = require("gulp-uglify")
const rename = require("gulp-rename")
const cleanCSS = require("gulp-clean-css")
const reload = browserSync.reload

// config

const srcFolder = "src"
const distFolder = "dist"

// build

gulp.task("css", function() {
  return gulp
    .src("src/pull-menu.css")
    .pipe(
      autoprefixer({
        browsers: ["> 1%", "last 3 versions"],
        cascade: false
      })
    )
    .pipe(gulp.dest("dist"))
    .pipe(reload({ stream: true }))
})

// CSS build + min

gulp.task("css-min", function() {
  return gulp
    .src("src/pull-menu.css")
    .pipe(
      autoprefixer({
        browsers: ["> 1%", "last 3 versions"],
        cascade: false
      })
    )
    .pipe(cleanCSS())
    .pipe(rename("pull-menu.min.css"))
    .pipe(gulp.dest("dist"))
    .pipe(reload({ stream: true }))
})

// JS build

gulp.task("js", function() {
  return gulp.src("src/pull-menu.js").pipe(gulp.dest("dist"))
})

// JS build + min

gulp.task("js-min", function() {
  return gulp
    .src("src/pull-menu.js")
    .pipe(
      uglify({
        mangle: true
      })
    )
    .pipe(rename("pull-menu.min.js"))
    .pipe(gulp.dest("dist"))
})

gulp.task("serve", function() {
  browserSync.init({
    server: "./"
  })

  gulp.watch("src/**", ["js", "css"])
})

gulp.task("default", ["css", "css-min", "js", "js-min"])
