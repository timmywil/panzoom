
/**
 * Gruntfile.js
 */

module.exports = function( grunt ) {
	"use strict";

	var gzip = require("gzip-js");

	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		build: {
			all: {
				dest: "dist/jquery.panzoom.js",
				src: "jquery.panzoom.js"
			}
		},
		compare_size: {
			files: [
				"dist/jquery.panzoom.js",
				"dist/jquery.panzoom.min.js"
			],
			options: {
				compress: {
					gz: function( contents ) {
						return gzip.zip( contents, {} ).length;
					}
				},
				cache: "dist/.sizecache.json"
			}
		},
		jshint: {
			all: [
				"Gruntfile.js",
				"jquery.panzoom.js",
				"test/bdd/*.js"
			],
			options: {
				jshintrc: ".jshintrc"
			}
		},
		uglify: {
			"dist/jquery.panzoom.min.js": [
				"dist/jquery.panzoom.js"
			],
			options: {
				preserveComments: "some"
			}
		},
		mocha: {
			// runs all html files in phantomjs
			all: {
				src: [ "test/index.html" ],
				options: {
					mocha: {
						ui: "bdd",
						ignoreLeaks: false
					}
				}
			}
		},
		watch: {
			files: [
				"<%= jshint.all %>",
				"package.json",
				"test/index.html"
			],
			tasks: "test"
		}
	});

	// Load necessary tasks from NPM packages
	grunt.loadNpmTasks("grunt-compare-size");
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-mocha");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerMultiTask(
		"build",
		"Build jquery.panzoom to the dist directory",
		function() {
			var data = this.data;
			var dest = data.dest;
			var src = data.src;
			var version = grunt.config("pkg.version");
			var compiled = grunt.file.read( src );

			// Append commit id to version
			if ( process.env.COMMIT ) {
				version += " " + process.env.COMMIT;
			}

			// Replace version and date
			compiled = compiled
				.replace( /@VERSION/g, version )
				.replace( "@DATE", (new Date).toDateString() );

			// Write source to file
			grunt.file.write( dest, compiled );

			grunt.log.ok( "File written to " + dest );
		}
	);

	grunt.registerTask( "test", [ "jshint", "build", "uglify", "compare_size", "mocha" ]);

	// Default grunt
	grunt.registerTask( "default", [ "test" ]);
};
