module.exports = function (grunt) {
    // Load plugins
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-autoprefixer');

    // Default task(s).
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('build', ['less:production', 'autoprefixer', 'uglify:production', 'replace']);

    // javascript stack
    var jsFiles = [
            'assets/scripts/vendor/bootstrap/modal.js',
            'assets/scripts/vendor/bootstrap/transition.js',
            'assets/scripts/vendor/bootstrap/button.js',
            'assets/scripts/vendor/bootstrap/collapse.js',
            'assets/scripts/vendor/bootstrap/dropdown.js',
            'assets/scripts/vendor/bootstrap/tooltip.js',
            'assets/scripts/vendor/leaflet/leaflet.js',
            'assets/scripts/vendor/leaflet/leaflet.d3.js',
            'assets/scripts/vendor/*.js',
            'assets/scripts/vis/*.js',
            'assets/scripts/page.js'
        ];

    grunt.initConfig({
        concat: {
            development: {
                src: jsFiles,
                dest: 'public/js/main.js'
            }
        },
        uglify: {
            production: {
                options: {
                    report: 'min',
                },
                files: {
                    'public/js/main.js': jsFiles
                }
            }
        },
        less: {
            development: {
                files: {
                    "public/css/main.css": "assets/less/main.less"
                }
            },
            production: {
                options: {
                    yuicompress: true
                },
                files: {
                    "public/css/main.css": "assets/less/main.less"
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 version', "> 5%", 'ie 8']
            },
            single_file: {
                src: 'public/css/main.css',
                dest: 'public/css/main.css'
            }
        },
        watch: {
            options: {
                livereload: true
            },
            grunt: {
                files: ['Gruntfile.js']
            },
            less: {
                files: ['assets/less/*.less'],
                tasks: ['less:development', 'autoprefixer'],
                options: {
                    livereload: false
                }
            },
            asset_javascript: {
                files: ['assets/**/*.js'],
                tasks: ['concat:development'],
                options: {
                    livereload: false
                }
            },
            templates: {
                files: ['public/templates/*.html'],
                tasks: ['replace:template'],
                options: {
                    livereload: false
                }
            },
            javascript: {
                files: ['public/js/*.js']
            },
            css: {
                files: ['public/css/*.css']
            },
            html: {
                files: ['public/*.html']
            }
        },
        replace: {
            foo: {
                src: ['public/index.html'],
                overwrite: true,
                replacements: [{
                    from: /\?foo=[0-9]*/g,
                    to: function () {
                        var cacheBuster = Math.floor((Math.random() * 100000) + 1);
                        return '?foo=' + cacheBuster;
                    }
                }]
            }
        }
    });

};
