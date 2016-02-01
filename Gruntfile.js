
/**
 * Gruntfile.js
 */

module.exports = function( grunt ) {
	'use strict';

	// Load all grunt tasks
	require('load-grunt-tasks')( grunt );

	var gzip = require('gzip-js');
	var fs = require('graceful-fs');

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		bump: {
			options: {
				files: ['package.json', 'bower.json', 'panzoom.jquery.json'],
				commitFiles: ['package.json', 'bower.json', 'panzoom.jquery.json'],
				tagName: '%VERSION%',
				push: false
			}
		},
		bowercopy: {
			options: {
				clean: true
			},
			dev: {
				options: {
					destPrefix: 'test/libs'
				},
				files: {
					'mocha/mocha.js': 'mocha/mocha.js',
					'mocha/mocha.css': 'mocha/mocha.css',
					'jquery.mousewheel.js': 'jquery-mousewheel/jquery.mousewheel.js',
					'chai.js': 'chai/chai.js'
				}
			},
			pointertouch: {
				src: 'jquery.event.pointertouch/dist/jquery.event.pointertouch.js',
				dest: 'src/pointertouch.js'
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

			if ( /panzoom/.test(src) ) {
				var fixhook = fs.readFileSync(__dirname + '/src/pointertouch.js', 'utf8')
					.replace(/\/\*\*[\w\W]*'use strict';\s*/, '')
					.replace(/\s*return \w+;\s*\}\)\);\s*$/, '');
				compiled = compiled
					// Insert pointer/touch fixhook
					.replace( /\/\/ INSERT FIXHOOK/, fixhook )
					// Remove pointerhook dependency
					.replace(', \'./pointertouch\'', '')
					.replace(', require(\'./pointertouch\')', '');
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
