/**
 * Gruntfile.js
 */

module.exports = function( grunt ) {

	grunt.initConfig({
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
	grunt.loadNpmTasks("grunt-contrib-jshint");
	grunt.loadNpmTasks("grunt-contrib-uglify");
	grunt.loadNpmTasks("grunt-mocha");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask( "test", [ "jshint", "uglify", "mocha" ]);

	// Default grunt
	grunt.registerTask( "default", [ "test" ]);
};
