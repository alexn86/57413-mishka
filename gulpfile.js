"use strict";

var gulp = require("gulp");
var sass = require("gulp-sass");
var sassGlob = require('gulp-sass-glob');
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var minify = require('gulp-csso');
var rename = require("gulp-rename");
var imagemin = require("gulp-imagemin");
var webp = require("gulp-webp");
var svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");
var del = require("del");
var run = require("run-sequence");
var htmlmin = require("gulp-htmlmin");
var uglify = require('gulp-uglify');

gulp.task("style", function () {
  gulp.src("sass/style.scss")
      .pipe(plumber())
      .pipe(sassGlob())
      .pipe(sass({
        includePaths: require('node-normalize-scss').includePaths
      }))
      .pipe(postcss([
        autoprefixer()
      ]))
      .pipe(gulp.dest("build/css"))
      .pipe(minify())
      .pipe(rename("style.min.css"))
      .pipe(gulp.dest("build/css"))
      .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("img/**/*.{png,jpg,svg}")
      .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
      ]))
      .pipe(gulp.dest("build/img"));
});

gulp.task("webp", function () {
  return gulp.src("img/**/*.{png,jpg}")
      .pipe(webp({quality: 80}))
      .pipe(gulp.dest("build/img"));
});

gulp.task("sprite", function () {
  return gulp.src("img/icon-*.svg, logo-desktop.svg, logo-htmlacademy.svg")
      .pipe(svgstore({
        inlineSvg: true
      }))
      .pipe(rename("sprite.svg"))
      .pipe(gulp.dest("build/img"));
});

gulp.task("html", function () {
  return gulp.src("*.html")
      .pipe(posthtml([
        include()
      ]))
      .pipe(htmlmin({collapseWhitespace: false}))
      .pipe(gulp.dest("build"));
});

gulp.task("compress", function () {
  return gulp.src("js/app.js")
      .pipe(uglify())
      .pipe(rename("app.min.js"))
      .pipe(gulp.dest("build/js"));
});

gulp.task("copy", function () {
  return gulp.src([
    "fonts/**/*.{woff,woff2}",
    "img/**",
    "js/**"
  ], {
    base: "."
  })
      .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
  return del("build");
});

gulp.task("build", function (done) {
  run(
      "clean",
      "copy",
      "style",
      "compress",
      "sprite",
      "html",
      done
  );
});

gulp.task("serve", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("sass/**/*.{scss,sass}", ["style"]);
  gulp.watch("*.html", ["html"]);
});
