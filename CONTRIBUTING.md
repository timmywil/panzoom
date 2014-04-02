# Contributing to jQuery Panzoom

Follow the [jQuery style guide](http://contribute.jquery.org/style-guide/js/), with these exceptions:

- Use single quotes
- Multiple var statements can be used to group variable declarations logically
- Use [jsdoc-style](http://usejsdoc.org/#JSDoc3_Tag_Dictionary) comments for functions
- Don't put extra spaces in parens and brackets.

Add tests to test.js.

### `grunt watch:dev`

Lint, uglify, and livereload the test page in the browser on file changes.

### `grunt watch:test`

Lint, uglify, and automatically test in the terminal using phantomjs on file changes.

If you're unfamiliar with grunt, [gruntjs.com](http://gruntjs.com/) is a good place to start. Follow instructions for installing grunt and see the Gruntfile for the tasks used.

Test in all browsers (IE9+, Firefox, Chrome, Safari, Opera, Mobile browsers to which you have access) before submitting a pull request.
