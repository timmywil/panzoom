/**
 * test.js
 * Panzoom tests
 */

describe("Panzoom", function() {
	var $elem = $("#panzoom");
	var $svgElem = $("#panzoom-svg");
	var $rect = $svgElem.find("rect");
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
		var transition = panzoom._transition;
		$elem.panzoom("option", {
			duration: 500,
			easing: "linear"
		});
		// Updates the transition property
		expect( panzoom._transition ).to.not.equal( transition );
		$elem.panzoom( "option", "duration", options.duration );
		$elem.panzoom( "option", "easing", options.easing );
		expect( panzoom._transition ).to.equal( transition );
	});

	it("should set the cursor option", function(){
		$elem.panzoom( "option", "cursor", "default" );
		expect( $elem.panzoom("option", "cursor") ).to.equal("default");
		expect( $elem.css("cursor") ).to.equal("default");
		// Clean-up
		$elem.panzoom( "option", "cursor", "move" );
		expect( $elem.css("cursor") ).to.equal("move");
	});

	it("should not transition if transition is set to false", function() {
		$elem.panzoom( "option", "transition", false );
		$elem.panzoom("reset");
		expect( $elem.css("transform") ).to.equal("none");
		// Clean-up
		$elem.panzoom( "option", "transition", true );
	});

	it("should not pan if disablePan is set to true", function() {
		$elem.panzoom( "option", "disablePan", true );
		var panzoom = $elem.panzoom("instance");
		var setMatrix = panzoom.setMatrix;
		var called = false;
		panzoom.setMatrix = function() {
			called = true;
		};
		// Attempt to trigger normal move start
		$elem.triggerHandler("touchstart mousedown", { pageX: 0, pageY: 0, touches: ["one"] });
		expect( called ).to.be.false;

		// Clean-up
		panzoom.setMatrix = setMatrix;
		$elem.panzoom( "option", "disablePan", false );
	});

	it("should unbind zoom if disableZoom is set to true", function() {
		$elem.panzoom( "option", "disableZoom", true );
		var events = $._data( $zoomIn[0], "events" );
		var clickEvent = events && ( events.click || events.touchend );
		expect( clickEvent ).to.not.exist;

		// Clean-up
		$elem.panzoom( "option", "disableZoom", false );
		events = $._data( $zoomIn[0], "events" );
		clickEvent = events && ( events.click || events.touchend );
		expect( clickEvent ).to.not.be.empty;
	});

	it("should zoom, then reset transform matrix", function() {
		var panzoom = $elem.panzoom("instance");
		// Zoom twice
		$elem.panzoom("zoom");
		$elem.panzoom("zoom");
		expect( +panzoom.getMatrix()[0] ).to.be.above( 1 );

		$elem.panzoom("reset");
		expect( +panzoom.getMatrix()[0] ).to.equal( 1 );
	});

	it("should bind the onEnd event", function() {
		var called = false;
		var instance = $elem.panzoom("instance");
		function testEnd( e, panzoom ) {
			called = true;
			expect( panzoom ).to.eql( instance );
		}
		$elem.panzoom( "option", "onEnd", testEnd );
		instance._startMove( 0, 0 );
		$(document).trigger("mouseup").trigger("touchend");
		$elem.off( "panzoomend", testEnd );
		expect( called ).to.be.true;
	});

	it("should bind the onChange event", function() {
		var called = false;
		var instance = $elem.panzoom("instance");
		function testChange( e, panzoom, transform ) {
			called = true;
			expect( panzoom ).to.eql( instance );
			expect( transform ).to.be.a("string");
		}
		$elem.panzoom( "option", "onChange", testChange );
		$elem.panzoom( "setMatrix", [ 1, 0, 0, 1, 0, 0 ] );
		$elem.off( "panzoomchange", testChange );
		expect( called ).to.be.true;
	});

	/* SVG
	---------------------------------------------------------------------- */
	it("should create an SVG panzoom with buttons", function() {
		var panzoom = $svgElem.panzoom().panzoom("instance");
		// isSVG should be false on nodeName svg
		expect( panzoom.isSVG ).to.be.false;
		panzoom.destroy();
	});

	it("should create an SVG panzoom on a rect", function() {
		$rect.panzoom({
			$zoomIn: $zoomIn,
			$zoomOut: $zoomOut,
			$zoomRange: $zoomRange,
			$reset: $reset
		});
		var panzoom = $rect.panzoom("instance");
		expect( panzoom.isSVG ).to.be.true;
	});
});
