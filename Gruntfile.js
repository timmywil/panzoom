
/**
 * Gruntfile.js
 */

module.exports = function( grunt ) {
	'use strict';

	var gzip = require('gzip-js');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		build: {
			dist: {
				dest: 'dist/jquery.panzoom.js',
				src: 'panzoom.js'
			},
			manifest: {
				src: 'panzoom.jquery.json'
			},
			bower: {
				src: 'bower.json'
			},
			readme: {
				src: 'README.md'
			}
		},
		compare_size: {
			files: [
				'dist/jquery.panzoom.js',
				'dist/jquery.panzoom.min.js'
			],
			options: {
				cache: 'dist/.sizecache.json',
				compress: {
					gz: function( contents ) {
						return gzip.zip( contents, {} ).length;
					}
				}
			}
		},
		jsonlint: {
			pkg: {
				src: 'package.json'
			},
			bower: {
				src: 'bower.json'
			},
			jquery: {
				src: 'panzoom.jquery.json'
			}
		},
		jshint: {
			all: [
				'Gruntfile.js',
				'panzoom.js',
				'test/bdd/*.js'
			],
			options: {
				jshintrc: '.jshintrc'
			}
		},
		uglify: {
			'dist/jquery.panzoom.min.js': [
				'dist/jquery.panzoom.js'
			],
			options: {
				preserveComments: 'some'
			}
		},
		mocha: {
			// runs all html files in phantomjs
			all: {
				src: [ 'test/index.html' ],
				options: {
					mocha: {
						ui: 'bdd',
						ignoreLeaks: false
					}
				}
			}
		},
		watch: {
			dev: {
				files: [
					'<%= jshint.all %>',
					'package.json',
					'.jshintrc',
					'test/index.html'
				],
				tasks: 'dev',
				options: {
					livereload: 35711
				}
			},
			test: {
				files: '<%= watch.dev.files %>',
				tasks: 'test'
			}
		}
	});

	// Load necessary tasks from NPM packages
	grunt.loadNpmTasks('grunt-compare-size');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-mocha');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-jsonlint');

	grunt.registerMultiTask(
		'build',
		'Build jquery.panzoom and package manifest',
		function() {
			var data = this.data;
			var src = data.src;
			var dest = data.dest || src;
			var version = grunt.config('pkg.version');
			var compiled = grunt.file.read( src );

			// If this is the README, replace versions to download
			if ( /README/.test(src) ) {
				compiled = compiled
					// Replace the version if not v1.1.0
					.replace( /\bv\d+\.\d+\.\d+\b/g, function( all ) {
						return all !== 'v1.1.0' ? 'v' + version : all;
					});
			} else {
				// Replace version and date
				compiled = compiled
					// Replace version in JSON files
					.replace( /("version":\s*")[^"]+/, '$1' + version )
					// Replace version tag
					.replace( /@VERSION/g, version )
					.replace( '@DATE', (new Date).toDateString() );
			}

			// Write source to file
			grunt.file.write( dest, compiled );

			grunt.log.ok( 'File written to ' + dest );
		}
	);

	grunt.registerTask( 'dev', [ 'jsonlint', 'jshint', 'build', 'uglify', 'compare_size' ] );
	grunt.registerTask( 'test', [ 'dev', 'mocha' ]);

	// Default grunt
	grunt.registerTask( 'default', 'test');
};
