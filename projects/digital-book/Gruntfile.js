module.exports = function(grunt) {
    grunt.initConfig({
        // Server
        connect: {
            src: {
                options: {
                    port: 9000,
                    hostname: '*',
                    open: true,
                    livereload: true,
                    base: 'src'
                }
            },
            build: {
                options: {
                    port: 9000,
                    hostname: '*',
                    open: true,
                    keepalive: true,
                    base: 'build'
                }
            }
        },
        // Verifica alterações 
        watch: {
            css: {
                files: ['src/**/*.css'],
                options: {
                    livereload: true
                }
            },
            scripts: {
                files: ['src/**/*.js'],
                options: {
                    livereload: true
                }
            },
            html: {
                files: ['src/**/*.html'],
                options: {
                    livereload: true
                }
            }
        },
        // Minifica JS
        uglify: {
            options: {
                mangle: true,
                preserveComments: false,
                compress: true
            },
            my_target: {
                files: {
                    'build/scripts/scripts.min.js': ['src/scripts/*.js', '!src/scripts/cordova.js']
                }
            }
        },
        // Minifica CSS
        cssmin: {
            minify: {
                files: {
                    'build/content/style.css': ['src/content/**/*.css']
                }
            }
        },
        // Compact as imagens
        // imagemin: {
        //     png: {
        //         options: {
        //             optimizationLevel: 1
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'assets/_img/',
        //             src: ['**/*.png'],
        //             dest: 'assets/img/'
        //         }]
        //     },
        //     jpg: {
        //         options: {
        //             progressive: true
        //         },
        //         files: [{
        //             expand: true,
        //             cwd: 'assets/_img/',
        //             src: ['**/*.jpg'],
        //             dest: 'assets/img/'
        //         }]
        //     }
        // }

        // Copias outros arquivos para a pasta build
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'src/views/',
                    src: ['**'],
                    dest: 'build/views/'
                }, {
                    expand: true,
                    cwd: 'src/content/',
                    src: ['**', '!**/*.css', '!**/*.tps', '!**/*.psd', '!**/*.jsx'],
                    dest: 'build/content/'
                }]
            }
        },

        clean: ["build"]
    });

    // Plugins, devem ser instalados via "npm install nome-do-plugin --save-dev"
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    // grunt.loadNpmTasks('grunt-contrib-imagemin');

    // Tarefas para serem executadas no terminal via "grun nome-tarefa".
    // O Primeiro paramentro é o nome da tarefa, e o array são as tarefas que ele ira executar.
    grunt.registerTask('server-dev', ['connect:src', 'watch']);
    grunt.registerTask('build', ['clean', 'uglify', 'cssmin', 'copy', 'connect:build']);
};