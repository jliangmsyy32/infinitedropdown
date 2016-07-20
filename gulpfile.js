'use strict';

var gulp = require('gulp');
// var $ = require('gulp-load-plugins')();
var rename = require('gulp-rename');
var markJSON = require('markit-json');
var docUtil = require('amazeui-doc-util');

gulp.task('markdoc', function(){
  return gulp.src('./www/doc.md')
    .pipe(markJSON(docUtil.markedOptions))
    .pipe(docUtil.applyTemplate(null, {
      pluginTitle: 'Infinite dropdown plugin',
      pluginDesc: 'help me to improve it',
      head: '<style>.custom-css {width: 180px;height:50px;border: solid 2px springgreen;}</style>',
      footer: "<script src='./idd.min.js'></script>"
    }))
    .pipe(rename(function(file) {
      file.extname = '.html';
    }))
    .pipe(gulp.dest('./docs'));
});
