module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
      pkg: grunt.file.readJSON('package.json'),
      uglify: {
        options: {
          banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
        },
        build: {
          src: 'src/<%= pkg.name %>.js',
          dest: 'build/<%= pkg.name %>.min.js'
        }
      },
      package_minifier: {
        your_target: {
          target: '', // (optional) Entry point (e.g 'browser') to use, when present, instead of 'main' (the default)
          src: [], // Path to package.json files for modules to be minified
          dest: '' // Target directory for minified modules.
        },
      },
    });
  
    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-package-minifier');

  
    // Default task(s).
    grunt.registerTask('default', ['uglify']);
  
  };