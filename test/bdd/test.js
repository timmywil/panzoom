/**
 * test.js
 * Panzoom tests
 */

describe("Panzoom", function() {
	var $elem = $("#panzoom");
	var $zoomIn = $(".zoom-in");
	var $zoomOut = $(".zoom-out");
	var $zoomRange = $(".zoom-range");
	var $reset = $(".reset");

	before(function() {
		$elem.panzoom();
	});

	it("should have elements available", function() {
		expect( $elem ).to.have.length( 1 );
		expect( $zoomIn ).to.have.length( 1 );
		expect( $zoomOut ).to.have.length( 1 );
		expect( $zoomRange ).to.have.length( 1 );
		expect( $reset ).to.have.length( 1 );
	});

	it("should chain and not create a new instance when called again", function() {
		var orig = $elem.panzoom("instance");
		expect( $elem.panzoom().panzoom("instance") ).to.equal( orig );
	});

	it("should destroy itself", function() {
		$elem.panzoom("destroy");
		expect( $elem.panzoom("instance") ).to.be.undefined;
	});

	it("should create a new panzoom with buttons", function() {
		$elem.panzoom({
			$zoomIn: $zoomIn,
			$zoomOut: $zoomOut,
			$zoomRange: $zoomRange,
			$reset: $reset
		});
		expect( $elem.panzoom("option", "$zoomIn") ).to.have.length( 1 );
	});

	it("should allow retrieval of all options without affecting them", function() {
		var options = $elem.panzoom("option");
		options.$zoomIn = null;
		expect( $elem.panzoom("option", "$zoomIn") ).to.not.be.null;
	});

	it("should set options correctly", function() {
		var panzoom = $elem.panzoom("instance");
		var options = $elem.panzoom("option");
		var transition = panzoom.transition;
		$elem.panzoom("option", {
			duration: 500,
			easing: "linear"
		});
		// Updates the transition property
		expect( panzoom.transition ).to.not.equal( transition );
		$elem.panzoom( "option", "duration", options.duration );
		$elem.panzoom( "option", "easing", options.easing );
		expect( panzoom.transition ).to.equal( transition );
	});

	it("should zoom, then reset transform matrix", function() {
		var panzoom = $elem.panzoom("instance");
		// Zoom twice
		$elem.panzoom("zoom");
		$elem.panzoom("zoom");
		expect( +panzoom._getMatrix()[0] ).to.be.above( 1 );

		$elem.panzoom("reset");
		expect( +panzoom._getMatrix()[0] ).to.equal( 1 );
	});
});
