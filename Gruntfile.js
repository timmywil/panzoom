/**
 * Gruntfile.js
 */

module.exports = function( grunt ) {

	grunt.initConfig({
		compare_size: {
			files: [
				"jquery.panzoom.js",
				"jquery.panzoom.min.js"
			]
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
			"jquery.panzoom.min.js": [
				"jquery.panzoom.js"
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

	grunt.registerTask( "test", [ "jshint", "uglify", "mocha", "compare_size" ]);

	// Default grunt
	grunt.registerTask( "default", [ "test" ]);
};
