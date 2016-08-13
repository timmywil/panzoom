
/**
 * Gruntfile.js
 */

module.exports = function( grunt ) {
	'use strict';

	// Load all grunt tasks
	require('load-grunt-tasks')( grunt );

	var gzip = require('gzip-js');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bowercopy: {
			options: {
				clean: true
			},
			dev: {
				options: {
					destPrefix: 'test/libs'
				},
				files: {
					'test/libs/jquery.js': 'jquery/dist/jquery.js',
					'mocha/mocha.js': 'mocha/mocha.js',
					'mocha/mocha.css': 'mocha/mocha.css',
					'jquery.mousewheel.js': 'jquery-mousewheel/jquery.mousewheel.js',
					'chai.js': 'chai/chai.js'
				}
			}
		},
		build: {
			dist: {
				dest: 'dist/jquery.panzoom.js',
				src: 'src/panzoom.js'
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
				'src/panzoom.js',
				'test/bdd/*.js'
			],
			options: {
				jshintrc: true
			}
		},
		uglify: {
			'dist/jquery.panzoom.min.js': [
				'dist/jquery.panzoom.js'
			],
			options: {
				banner: '/* jquery.panzoom.min.js <%= pkg.version %> (c) Timmy Willison - MIT License */\n'
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
					'test/index.html'
				],
				tasks: 'dev',
				options: {
					livereload: 35711,
					atBegin: true
				}
			},
			test: {
				files: '<%= watch.dev.files %>',
				tasks: 'test'
			}
		}
	});

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
					// Replace first instance of vx.x.x
					.replace( /v\d\.\d+\.\d+/, 'v' + version )
					// Replace the version in the URLs
					.replace( /(panzoom\/)\b\d+\.\d+\.\d+\b(\/)/g, '$1' + version + '$2' );
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
