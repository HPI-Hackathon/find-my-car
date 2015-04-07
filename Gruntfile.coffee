#global module:false

"use strict"

module.exports = (grunt) ->
  grunt.loadNpmTasks "grunt-contrib-connect"
  grunt.loadNpmTasks "grunt-contrib-copy"
  grunt.loadNpmTasks "grunt-contrib-watch"
  grunt.loadNpmTasks "grunt-exec"

  grunt.initConfig

    # copy:

    exec:
      bower:
        cmd: "bower install"

    watch:
      options:
        livereload: true
      source:
        files: [

        ]
        tasks: [
        ]

    connect:
      server:
        options:
          port: 4000
          livereload: true

  grunt.registerTask "build", [
    "exec:bower"
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
