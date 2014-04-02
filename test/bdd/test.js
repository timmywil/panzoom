/**
 * test.js
 * Panzoom tests
 */

describe('Panzoom', function() {
	var $elem = $('#panzoom');
	var $svgElem = $('#panzoom-svg');
	var $rect = $svgElem.find('rect');
	var $zoomIn = $('.zoom-in');
	var $zoomOut = $('.zoom-out');
	var $zoomRange = $('.zoom-range');
	var $reset = $('.reset');
	var rnoneMatrix = /^none|matrix\(1\,?\s*0\,?\s*0\,?\s*1\,?\s*0\,?\s*0\)$/;
	var rcommaSpace = /,\s*/g;

	/**
	 * Simulates a start by triggering faux mousedown and touchstart events
	 */
	function fauxStart() {
		var e = new jQuery.Event('mousedown', {
			which: 1,
			pageX: 0,
			pageY: 0,
			touches: [
				{ pageX: 0, pageY: 0 }
			]
		});
		$elem.trigger( e );
		e.type = 'touchstart';
		$elem.trigger( e );
		e.type = 'pointerdown';
		$elem.trigger( e );
	}

	/**
	 * Simulate a move to the specified x and y
	 * @param {Number} x
	 * @param {Number} y
	 */
	function fauxMove( x, y ) {
		fauxStart();
		var e = new jQuery.Event('mousemove', {
			pageX: x,
			pageY: y,
			touches: [
				{ pageX: x, pageY: y }
			]
		});
		var $doc = $(document).trigger( e );
		e.type = 'touchmove';
		$doc.trigger( e );
		e.type = 'pointermove';
		$doc.trigger( e );

		$doc.trigger('mouseup').trigger('touchend').trigger('pointerup');
	}

	/**
	 * Simulates a pinch gesture (even in desktop browsers) starting at the move
	 * (the move event must already be bound)
	 * @param {Function} complete
	 * @param {Boolean} [started] If the start has already been triggered, don't trigger another start
	 */
	function testPinch( complete, started ) {
		var e;
		var panzoom = $elem.panzoom('instance');
		var origMatrix = panzoom.getMatrix();

		if ( !started ) {
			// Start move by using touchstart
			e = new jQuery.Event('touchstart', {
				touches: [
					{ clientX: 0,  clientY: 0 },
					{ clientX: 10, clientY: 10 }
				]
			});
			$elem.trigger( e );
		}

		// Faux events with touches property
		e = new jQuery.Event('mousemove', {
			touches: [
				{ clientX: 10, clientY: 10 },
				{ clientX: 30, clientY: 30 }
			]
		});
		var $doc = $(document).trigger( e );
		e.type = 'touchmove';
		$doc.trigger( e );
		// Kill events
		$doc.trigger('touchend').trigger('mouseup').trigger('pointerup');

		// Run tests
		complete();

		// Reset matrix
		panzoom.setMatrix( origMatrix );
	}
	window.testPinch = testPinch;

	/**
	 * Test the invert containment option
	 */
	function testInvert() {
		var panzoom = $elem.panzoom('instance');
		// Zoom in for moving
		$elem.panzoom('zoom', { animate: false });
		// Set contain to 'invert'
		$elem.panzoom('option', 'contain', 'invert');
		fauxMove( -2, -2 );
		var matrix = panzoom.getMatrix();
		expect( +matrix[4] ).to.equal( -2 );
		expect( +matrix[5] ).to.equal( -2 );
		fauxMove( 2, 2 );
		matrix = panzoom.getMatrix();
		// Should normalize to 0
		expect( +matrix[4] ).to.equal( 0 );
		expect( +matrix[5] ).to.equal( 0 );
		// Clean up
		$elem.panzoom('option', 'contain', false).panzoom( 'reset', false );
		matrix = panzoom.getMatrix();
		expect( +matrix[4] ).to.equal( 0 );
		expect( +matrix[5] ).to.equal( 0 );
	}

	/* panzoom creation and options
	---------------------------------------------------------------------- */
	it('should have elements available', function() {
		expect( $elem ).to.have.length( 1 );
		expect( $zoomIn ).to.have.length( 1 );
		expect( $zoomOut ).to.have.length( 1 );
		expect( $zoomRange ).to.have.length( 1 );
		expect( $reset ).to.have.length( 1 );
	});
	it('should chain and not create a new instance when called again', function() {
		$elem.panzoom();
		var orig = $elem.panzoom('instance');
		expect( $elem.panzoom().panzoom('instance') ).to.eql( orig );
	});
	it('should allow different starting values for zoom than 1', function() {
		$elem.panzoom('destroy');
		$elem.css( 'transform', 'scale(2)' );
		var panzoom = $elem.panzoom({ $zoomRange: $zoomRange }).panzoom('instance');
		expect( panzoom.getTransform() ).to.contain('matrix');
		expect( $zoomRange.val() ).to.equal('2');
		// Clean-up
		$elem.css( 'transform', '' );
		$elem.panzoom('destroy');
	});
	it('should create a new panzoom with buttons', function() {
		$elem.panzoom({
			$zoomIn: $zoomIn,
			$zoomOut: $zoomOut,
			$zoomRange: $zoomRange,
			$reset: $reset
		});
		expect( $elem.panzoom('option', '$zoomIn') ).to.have.length( 1 );
	});
	it('should allow retrieval of all options without affecting them', function() {
		var options = $elem.panzoom('option');
		options.$zoomIn = null;
		expect( $elem.panzoom('option', '$zoomIn') ).to.not.be.null;
	});
	it('should set options correctly', function() {
		var panzoom = $elem.panzoom('instance');
		var options = $elem.panzoom('option');
		var transition = panzoom._transition;
		$elem.panzoom('option', {
			duration: 500,
			easing: 'linear'
		});
		// Updates the transition property
		expect( panzoom._transition ).to.not.equal( transition );
		$elem.panzoom( 'option', 'duration', options.duration );
		$elem.panzoom( 'option', 'easing', options.easing );
		expect( panzoom._transition ).to.equal( transition );
	});
	it('returns null for nonexistent options', function() {
		expect( $elem.panzoom('option', 'nonasdfomawefoijawef') ).to.be.null;
	});
	it('should set the cursor option', function(){
		$elem.panzoom( 'option', 'cursor', 'default' );
		expect( $elem.panzoom('option', 'cursor') ).to.equal('default');
		expect( $elem.css('cursor') ).to.equal('default');
		// Clean-up
		$elem.panzoom( 'option', 'cursor', 'move' );
		expect( $elem.css('cursor') ).to.equal('move');
	});
	it('should not transition if transition is set to false', function() {
		$elem.panzoom( 'option', 'transition', false );
		$elem.panzoom('reset');
		expect( $elem.css('transform') ).to.match( rnoneMatrix );
		// Clean-up
		$elem.panzoom( 'option', 'transition', true );
	});
	it('should not pan if disablePan is set to true', function() {
		$elem.panzoom( 'option', 'disablePan', true );
		var panzoom = $elem.panzoom('instance');
		var setMatrix = panzoom.setMatrix;
		var called = false;
		panzoom.setMatrix = function() {
			called = true;
		};
		fauxMove( 1, 1 );
		expect( called ).to.be.false;

		// Clean-up
		panzoom.setMatrix = setMatrix;
		$elem.panzoom( 'option', 'disablePan', false );
	});
	it('should unbind zoom if disableZoom is set to true', function() {
		$elem.panzoom( 'option', 'disableZoom', true );
		var events = $._data( $zoomIn[0], 'events' );
		var clickEvent = events && ( events.click || events.touchend || events.pointerup );
		expect( clickEvent ).to.not.exist;

		// Clean-up
		$elem.panzoom( 'option', 'disableZoom', false );
		events = $._data( $zoomIn[0], 'events' );
		clickEvent = events && ( events.click || events.touchend || events.pointerup );
		expect( clickEvent ).to.not.be.empty;
	});

	/* containment
	---------------------------------------------------------------------- */
	it('should contain the panzoom element within its parent when the contain option is true', function() {
		$elem.panzoom( 'option', 'contain', true );
		fauxMove( -2, -2 );
		var matrix = $elem.panzoom('getMatrix');
		expect( +matrix[4] ).to.not.equal( -2 );
		expect( +matrix[5] ).to.not.equal( -2 );
		// Clean up
		$elem.panzoom('option', 'contain', false).panzoom( 'reset', false );
	});
	it('should invert-contain the panzoom element outside its parent when the contain option is set to "invert"', function() {
		testInvert();
	});
	it('should invert-contain the panzoom element when the panzoom element is larger than the container', function() {
		var width = $elem.width();
		$elem.width( width * 2 );
		testInvert();
		$elem.width( width );
	});

	/* Properties
	---------------------------------------------------------------------- */
	it('should have rmatrix present on the Panzoom object', function() {
		expect( $.Panzoom.rmatrix ).to.be.a('regexp');
	});
	it('should have event name(s) on the Panzoom object', function() {
		var events = $.Panzoom.events;
		$.each([ 'down', 'up', 'move' ], function(i, event) {
			expect( events[ event ] ).to.be.a('string');
		});
	});

	/* Events
	---------------------------------------------------------------------- */
	it('should bind the onStart event', function() {
		var called = false;
		var instance = $elem.panzoom('instance');
		function testStart( e, panzoom, event ) {
			called = true;
			expect( event ).to.have.property('type');
			expect( event ).to.have.property('pageX');
			expect( panzoom ).to.eql( instance );
			expect( panzoom.panning ).to.be.true;
		}
		$elem.panzoom( 'option', 'onStart', testStart );
		instance._startMove({ pageX: 0, pageY: 0, type: 'mousedown' });
		$(document).trigger('mouseup');
		$elem.off( 'panzoomstart', testStart );
		$elem.panzoom( 'option', 'onStart', null );
		expect( called ).to.be.true;
	});
	it('should bind the onEnd event', function() {
		var called = false;
		var instance = $elem.panzoom('instance');
		instance.reset( false );
		function testEnd( e, panzoom, matrix, changed ) {
			called = true;
			expect( panzoom ).to.eql( instance );
			expect( panzoom.panning ).to.be.false;
			expect( matrix ).to.be.an('array');
			expect( changed ).to.be.true;
		}
		$elem.panzoom( 'option', 'onEnd', testEnd );
		fauxMove( 1, 0 );
		$elem.panzoom( 'option', 'onEnd', null );
		expect( called ).to.be.true;
	});
	it('should pass through the event target to the end event', function() {
		var called = false;
		function testEnd( e ) {
			called = true;
			expect( e.target.nodeType ).to.be.a('number');
		}
		$elem.panzoom( 'option', 'onEnd', testEnd );
		fauxMove( 0, 0 );
		$elem.panzoom( 'option', 'onEnd', null );
		expect( called ).to.be.true;
	});
	it('should bind the onChange event', function() {
		var called = false;
		var instance = $elem.panzoom('instance');
		function testChange( e, panzoom, transform ) {
			called = true;
			expect( panzoom ).to.eql( instance );
			expect( transform ).to.be.an('array');
			expect( panzoom.panning ).to.be.false;
		}
		$elem.panzoom( 'option', 'onChange', testChange );
		$elem.panzoom( 'setMatrix', [ 1, 0, 0, 1, 0, 0 ] );
		$elem.off( 'panzoomchange', testChange );
		$elem.panzoom( 'option', 'onChange', null );
		expect( called ).to.be.true;
	});
	it('should not trigger the change event if the silent option is true', function() {
		var called = false;
		function testChange() {
			called = true;
		}
		$elem.on( 'panzoomchange', testChange );
		$elem.panzoom( 'setMatrix', [ 1, 0, 0, 1, 0, 0 ], { silent: true });
		$elem.off( 'panzoomchange', testChange );
		expect( called ).to.be.false;
	});
	it('should trigger the zoom event on zoom', function() {
		var called = false;
		function testZoom( e, panzoom, scale ) {
			called = true;
			expect( scale ).to.be.a('number');
		}
		$elem.on( 'panzoomzoom', testZoom );
		$elem.panzoom('zoom');
		expect( called ).to.be.true;
	});
	it('should not trigger the zoom event when silenced', function() {
		var called = false;
		function testZoom() {
			called = true;
		}
		$elem.on( 'panzoomzoom', testZoom );
		$elem.panzoom('zoom', { silent: true });
		expect( called ).to.be.false;
	});
	it('should trigger the pan event on pan', function() {
		var called = false;
		function testPan( e, panzoom, x, y ) {
			called = true;
			expect( x ).to.be.a('number');
			expect( y ).to.be.a('number');
		}
		$elem.on( 'panzoompan', testPan );
		fauxMove( 1, 1 );
		expect( called ).to.be.true;
	});
	it('should silence the pan event when silent is passed', function() {
		var called = false;
		$elem.on('panzoompan', function() {
			called = true;
		});
		$elem.panzoom( 'pan', 0, 0, { silent: true } );
		expect( called ).to.be.false;
	});

	/* pan
	---------------------------------------------------------------------- */
	it('should pan relatively when the relative option is passed', function() {
		var panzoom = $elem.panzoom('instance');
		var matrix = panzoom.getMatrix().slice(0);
		$elem.panzoom( 'pan', 10, -10, { relative: true } );
		var newMatrix = panzoom.getMatrix();
		expect( newMatrix[4] - matrix[4] ).to.equal( 10 );
		expect( newMatrix[5] - matrix[5] ).to.equal( -10 );
		panzoom.reset( false );
	});
	it('should not pan when called if disablePan is true', function() {
		$elem.panzoom( 'option', 'disablePan', true );
		var matrix = $elem.panzoom('getMatrix').slice(0);
		$elem.panzoom( 'pan', 10, -10 );
		var newMatrix = $elem.panzoom('getMatrix');
		expect( +newMatrix[4] ).to.equal( +matrix[4] );
		expect( +newMatrix[5] ).to.equal( +matrix[5] );
		$elem.panzoom( 'option', 'disablePan', false );
	});

	/* zoom
	---------------------------------------------------------------------- */
	it('should zoom, then reset transform matrix', function() {
		var panzoom = $elem.panzoom('instance');
		// Zoom twice
		$elem.panzoom('zoom');
		$elem.panzoom('zoom');
		expect( +panzoom.getMatrix()[0] ).to.be.above( 1 );

		$elem.panzoom('reset');
		expect( +panzoom.getMatrix()[0] ).to.equal( 1 );
	});
	it('should set the zoom range input\'s value on zoom', function() {
		var cur = $zoomRange.val();
		$elem.panzoom('zoom');
		var val = $zoomRange.val();
		expect( val ).to.not.equal( cur );
		expect( val ).to.equal( $elem.panzoom('getMatrix')[0] );
	});
	it('should set the zoom range step option', function() {
		var old = $zoomRange.attr('step');
		$elem.panzoom('option', 'rangeStep', 1);
		expect( $zoomRange.attr('step') ).to.equal('1');
		expect( $elem.panzoom( 'option', 'rangeStep' ) ).to.equal( 1 );
		// Reset
		$elem.panzoom('option', 'rangeStep', old);
	});
	it('should not set the default step if an attribute exists on the input', function() {
		var $pan = $('<div></div>').appendTo('body');
		var $input = $('<input type="range" step="1"/>');
		$pan.panzoom({
			$zoomRange: $input
		});
		expect( $input.attr('step') ).to.equal('1');
		$pan.remove();
	});
	it('should override the range\'s step attribute if explicitly specified', function() {
		var $pan = $('<div></div>').appendTo('body');
		var $input = $('<input type="range" step="1"/>');
		$pan.panzoom({
			$zoomRange: $input,
			rangeStep: 0.7
		});
		expect( $input.attr('step') ).to.equal('0.7');
		$pan.remove();
	});
	it('should set the dValue if specified', function() {
		$elem.panzoom('zoom', 1, { dValue: -1 });
		var matrix = $elem.panzoom('getMatrix');
		expect( +matrix[0] ).to.equal( 1 );
		expect( +matrix[3] ).to.equal( -1 );
		$elem.panzoom('reset', false);
	});
	it('should not pan when passed a focal point when disablePan is true', function() {
		$elem.panzoom( 'option', 'disablePan', true );
		var matrix = $elem.panzoom('getMatrix').slice(0);
		$elem.panzoom( 'zoom', { focal: { clientX: 10, clientY: 10 } } );
		var newMatrix = $elem.panzoom('getMatrix');
		expect( +newMatrix[4] ).to.equal( +matrix[4] );
		expect( +newMatrix[5] ).to.equal( +matrix[5] );
		$elem.panzoom( 'option', 'disablePan', false );
	});
	it('should not calculate margins with negative scale', function() {
		var panzoom = $elem.panzoom('instance');
		var matrix = panzoom.setMatrix([ -2, 0, 0, 1, 0, 0 ]);
		expect(matrix[0]).to.equal(-2);
		matrix[4] = 100;
		matrix = panzoom.setMatrix(matrix, { contain: 'invert' });
		expect(matrix[4]).to.equal(100);
	});

	/* isPanning
	---------------------------------------------------------------------- */
	it('should keep panning up-to-date for isPanning()', function() {
		fauxStart();
		var panzoom = $elem.panzoom('instance');
		expect( panzoom.isPanning() ).to.be.true;
		$(document).trigger('mouseup').trigger('touchend').trigger('pointerup');
		expect( panzoom.isPanning() ).to.be.false;
	});

	/* destroy
	---------------------------------------------------------------------- */
	it('should destroy itself', function() {
		$elem.panzoom('reset', false);
		var options = $elem.panzoom('option');
		$elem.panzoom('destroy');
		expect( $elem.panzoom('instance') ).to.be.undefined;
		$elem.panzoom( options );
	});

	/* setMatrix
	---------------------------------------------------------------------- */
	it('should allow strings or arrays when setting the matrix', function() {
		var panzoom = $elem.panzoom('instance');
		var _matrix = panzoom.getMatrix();
		panzoom.setMatrix('none');
		expect( panzoom.getTransform() ).to.match( rnoneMatrix );
		panzoom.setMatrix( _matrix );
		expect( panzoom.getMatrix() ).to.eql( _matrix );
	});
	it('should respect the $set option when getting and setting', function() {
		$elem.panzoom('reset', false);
		var $set = $('<div/>');
		$elem.panzoom('option', '$set', $set);
		fauxMove( 1, 1 );
		expect( $elem.panzoom('getMatrix').join('') ).to.equal('100111');
		expect( $elem.css('transform') ).to.match( rnoneMatrix );
		expect( $set.css('transform') ).to.not.match( rnoneMatrix );
		$elem.panzoom('option', '$set', $elem);
		$elem.panzoom('reset', false);
	});
	it('should set the transition on elements in $set', function() {
		$elem.panzoom('reset', false);
		var $set = $('<div/>');
		$elem.panzoom('option', '$set', $set);
		$elem.panzoom('zoom');
		expect( $elem.css('transition') ).to.match(/none|^$/);
		expect( $set.css('transition') ).to.not.match(/none|^$/);
		$elem.panzoom('option', '$set', $elem);
		$elem.panzoom('reset', false);
	});

	/* resetDimensions
	---------------------------------------------------------------------- */
	it('should adjust containment when the parent\'s dimensions change', function() {
		var panzoom = $elem.panzoom('instance');
		var $parent = panzoom.$parent;
		$parent.css('width', '200%');
		$elem.panzoom('option', 'contain', true);
		$elem.panzoom('pan', 10, 0, { animate: false });
		expect( +$elem.panzoom('getMatrix')[4] ).to.equal( 1 );
		$elem.panzoom('resetDimensions');
		$elem.panzoom('pan', 10, 0, { animate: false });
		expect( +$elem.panzoom('getMatrix')[4] ).to.equal( 10 );

		// Clean up
		$parent.css('width', '');
		$elem.panzoom('option', 'contain', false);
		$elem.panzoom('reset', false);
	});

	/* reset
	---------------------------------------------------------------------- */
	it('should trigger the reset event on reset', function() {
		var called = false;
		function testReset( e, panzoom, matrix ) {
			called = true;
			expect( matrix ).to.be.an('array');
		}
		$elem.on('panzoomreset', testReset).panzoom('reset');
		expect( called ).to.be.true;
	});
	it('should reset to the specified transform on reset', function() {
		var transform = 'matrix(1, 0, 0, -1, 0, 0)';
		// Reset to upside-down
		$elem.panzoom( 'option', 'startTransform', transform );
		var panzoom = $elem.panzoom('instance');
		panzoom.reset();
		expect( panzoom.getTransform() ).to.equal( transform );
		$elem.css('transform', 'none');
		$elem.panzoom( 'option', 'startTransform', undefined );
		panzoom.reset();
	});
	it('should set the startTransform when initialized', function() {
		var panzoom = $elem.panzoom().panzoom('instance');
		$elem.panzoom('destroy');
		$elem.panzoom({
			startTransform: 'scale(1.1)',
			transition: false
		});
		var transform = $elem.panzoom('getTransform');
		expect( transform ).to.contain('1.1');
		// Restore other instance
		$elem.css( 'transform', '' );
		$elem.panzoom('destroy');
		$elem.panzoom( panzoom.option() );
	});
	it('should save the original transform in matrix format for resetting', function() {
		var transform = 'scale(1.1)';
		var instance = $elem.panzoom().panzoom('instance');
		var startTransform = $elem.panzoom('option', 'startTransform');
		$elem.panzoom( 'option', 'startTransform', transform );
		expect( instance._origTransform ).to.not.equal( transform );
		$elem.css('transform', '');
		instance._origTransform = startTransform || 'none';
		expect( $elem.css('transform') ).to.not.contain('1.1');
	});


	/* resetZoom
	---------------------------------------------------------------------- */
	it('should reset only zoom on resetZoom', function() {
		var panzoom = $elem.panzoom('instance');
		panzoom.setMatrix([ 2, 0, 0, 2, 1, 1 ]);
		$elem.panzoom('resetZoom', false);
		var matrix = panzoom.getMatrix();
		expect( matrix[0] ).to.equal( '1' );
		expect( matrix[3] ).to.equal( '1' );
		expect( matrix[4] ).to.equal( '1' );
		expect( matrix[5] ).to.equal( '1' );
		$elem.panzoom('reset');
	});
	it('should fire a zoom event on resetZoom', function() {
		var called = false;
		$elem.on('panzoomzoom.resetZoom', function() {
			called = true;
		});
		$elem.panzoom('resetZoom', false).off('.resetZoom');
		expect( called ).to.be.true;
	});

	/* resetPan
	---------------------------------------------------------------------- */
	it('should reset only pan on resetPan', function() {
		var panzoom = $elem.panzoom('instance');
		panzoom.setMatrix([ 2, 0, 0, 2, 1, 1 ], false);
		$elem.panzoom('resetPan');
		var matrix = panzoom.getMatrix();
		expect( matrix[0] ).to.equal( '2' );
		expect( matrix[3] ).to.equal( '2' );
		expect( matrix[4] ).to.equal( '0' );
		expect( matrix[5] ).to.equal( '0' );
		$elem.panzoom('reset');
	});
	it('should fire a pan event on resetPan', function() {
		var called = false;
		$elem.on('panzoompan.resetPan', function() {
			called = true;
		});
		$elem.panzoom('resetPan', false).off('.resetPan');
		expect( called ).to.be.true;
	});

	/* disable/enable
	---------------------------------------------------------------------- */
	it('should disable/enable panzoom when disable/enable is called', function() {
		// Disable
		$elem.panzoom('disable');
		var panzoom = $elem.panzoom('instance');
		expect( panzoom ).to.be.an('object');
		var events = $._data( panzoom.elem, 'events' ) || {};
		expect( events.mousedown || events.touchstart || events.pointerdown ).to.be.undefined;

		// Enable
		$elem.panzoom('enable');
		events = $._data( panzoom.elem, 'events' );
		expect( events.mousedown || events.touchstart || events.pointerdown ).to.not.be.undefined;
	});
	it('should reset styles when disabling', function() {
		$elem.panzoom('zoom').panzoom('disable');
		expect( $elem.css('cursor') ).to.equal('auto');
		expect( $elem.css('transition') || '' ).to.not.contain('transform');
		$elem.panzoom('enable').panzoom( 'reset', false );
	});

	/* Touch
	---------------------------------------------------------------------- */
	if ( window.PointerEvent ) {
		it('should continue with a pointer event if started with a pointer event', function() {
			var called = false;
			$elem.panzoom().on('panzoomchange.continue', function() {
				called = true;
			});
			var e = new jQuery.Event('pointerdown', {
				pageX: 0,
				pageY: 0,
				which: 1
			});
			$elem.trigger( e );
			// Mouse
			e = new jQuery.Event('mousemove', {
				pageX: 0,
				pageY: 0
			});
			var $doc = $(document).trigger( e );
			expect( called ).to.be.false;
			// Pointer
			e = new jQuery.Event('pointermove', {
				pageX: 0,
				pageY: 1
			});
			$doc.trigger( e );
			expect( called ).to.be.true;
			$elem.off('.continue');
			$doc.trigger('pointerup');
		});
	} else {
		it('should pan with 2 fingers even if disableZoom is true', function() {
			$elem.panzoom( 'option', 'disableZoom', true );
			var panzoom = $elem.panzoom('instance');
			var matrix = panzoom.getMatrix();
			testPinch(function() {
				var newMatrix = panzoom.getMatrix();
				// Make sure a pan was done
				expect( +newMatrix[4] ).to.not.equal( +matrix[4] );
				expect( +newMatrix[5] ).to.not.equal( +matrix[5] );
			});
			// Clean-up
			$elem.panzoom( 'option', 'disableZoom', false );
		});
		it('should not pan with 2 fingers if disablePan is true', function() {
			var called = false;
			$elem.panzoom( 'option', 'disablePan', true );
			var panzoom = $elem.panzoom('instance');
			var matrix = panzoom.getMatrix();
			$elem.on( 'panzoompan', function() {
				called = true;
			});

			testPinch(function() {
				var newMatrix = panzoom.getMatrix();
				// Make sure a pan was not done
				expect( +newMatrix[4] ).to.equal( +matrix[5] );
				expect( +newMatrix[5] ).to.equal( +matrix[5] );
			});

			expect( called ).to.be.false;

			// Clean-up
			$elem.panzoom( 'option', 'disablePan', false );
		});
		it('should pan on the middle point as a focal point', function() {
			var panzoom = $elem.panzoom('instance');
			var matrix = panzoom.getMatrix();
			testPinch(function() {
				var newMatrix = panzoom.getMatrix();
				expect( +newMatrix[4] ).to.not.equal( +matrix[4] );
				expect( +newMatrix[5] ).to.not.equal( +matrix[5] );
			});
		});
		it('should continue with a touch event if started with a touch event', function() {
			var called = false;
			$elem.on('panzoomchange.continue', function() {
				called = true;
			});
			var e = new jQuery.Event('touchstart', {
				touches: [
					{ pageX: 0, pageY: 0 }
				]
			});
			$elem.trigger( e );
			// Mouse
			e = new jQuery.Event('mousemove', {
				touches: [
					{ pageX: 0, pageY: 0 }
				]
			});
			var $doc = $(document).trigger( e );
			expect( called ).to.be.false;
			// Touch
			e = new jQuery.Event('touchmove', {
				touches: [
					{ pageX: 0, pageY: 0 }
				]
			});
			$doc.trigger( e );
			expect( called ).to.be.true;
			$elem.off('.continue');
		});
	}

	/* SVG
	---------------------------------------------------------------------- */
	it('should create an SVG panzoom with buttons', function() {
		var panzoom = $svgElem.panzoom().panzoom('instance');
		// isSVG should be false on nodeName svg
		expect( panzoom.isSVG ).to.be.false;
		panzoom.destroy();
	});
	it('should create an SVG panzoom on a rect', function() {
		$rect.panzoom({
			$zoomIn: $zoomIn,
			$zoomOut: $zoomOut,
			$zoomRange: $zoomRange,
			$reset: $reset,
			eventNamespace: '.svg'
		});
		var panzoom = $rect.panzoom('instance');
		expect(panzoom.isSVG).to.be.true;
	});
	it('should set the starting transform value as an attribute', function() {
		$rect.panzoom('destroy');
		$rect.panzoom({
			// IE10 will ignore a 'none' setting
			startTransform: 'matrix(1,0,0,-1,0,0)'
		});
		var transform = $.attr($rect[0], 'transform').replace(rcommaSpace, ' ');
		expect(transform).to.equal('matrix(1 0 0 -1 0 0)');
	});
	it('should retrieve the transform attribute and use that as the start', function() {
		var panzoom = $rect.panzoom('destroy').attr('transform', 'matrix(2,0,0,2,0,0)').panzoom().panzoom('instance');
		expect(panzoom._origTransform.replace(rcommaSpace, ' ')).to.equal('matrix(2 0 0 2 0 0)');
	});
});
