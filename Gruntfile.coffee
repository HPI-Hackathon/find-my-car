#global module:false

"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-contrib-sass"
  grunt.loadNpmTasks "grunt-exec"

  grunt.initConfig

    # copy:

    exec:
      bower:
        cmd: "bower install"

    sass:
      dist:
        options:
          style: "expanded"
          loadPath: [
            "_sass"
            "bower_components/bootstrap-sass/assets/stylesheets"
            "bower_components/animate-scss/src"
          ]
        files:
          "stylesheets/main.css": "_sass/main.scss"

    watch:
      options:
        livereload: true

      source:
        files: [
          "_sass/**/*"
        ]
        tasks: [
          "sass"
        ]

    connect:
      server:
        options:
          port: 4000
          livereload: true

  grunt.registerTask "build", [
    "exec:bower"
    "sass"
    # "copy"
  ]

  grunt.registerTask "serve", [
    "build"
    "connect:server"
    "watch"
  ]

  grunt.registerTask "default", [
    "serve"
  ]
