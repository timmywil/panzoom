/**
 * jquery.event.pointertouch
 * Lift touch and pointer event properties to the jQuery event object
 * @version v0.0.6
 * @license MIT
 */
(function( global, factory ) {
	// AMD
	if ( typeof define === 'function' && define.amd ) {
		define( [ 'jquery' ], factory );
	// CommonJS/Browserify
	} else if ( typeof exports === 'object' ) {
		factory( require('jquery') );
	// Global
	} else {
		factory( global.jQuery );
	}
}( typeof window !== 'undefined' ? window : this, function( $ ) {
	'use strict';

	// Common properties to lift for touch or pointer events
	var props = [ 'pageX', 'pageY', 'clientX', 'clientY' ];
	var hook = { props: props };
	var events = {};

	// Support pointer events in IE11+ if available
	if ( window.PointerEvent ) {
		$.each([ 'pointerdown', 'pointermove', 'pointerup' ], function( i, name ) {
			// Add event name to events property
			events[ name.replace('pointer', '') ] = name;
			// Add fixHook
			$.event.fixHooks[ name ] = hook;
		});
	}

	// Add touches property for the touch hook
	props.push('touches');

	/**
	 * Support: Android
	 * Android sets pageX/Y to 0 for any touch event
	 * Attach first touch's pageX/pageY and clientX/clientY if not set correctly
	 */
	hook.filter = function( event, originalEvent ) {
		var touch;
		if ( !originalEvent.pageX && originalEvent.touches && (touch = originalEvent.touches[0]) ) {
			event.pageX = touch.pageX;
			event.pageY = touch.pageY;
			event.clientX = touch.clientX;
			event.clientY = touch.clientY;
		}
		return event;
	};

	$.each({
		mousedown: 'touchstart',
		mousemove: 'touchmove',
		mouseup: 'touchend'
	}, function( mouse, touch ) {
		// Add event names to events property
		events[ mouse.replace('mouse', '') ] = mouse + ' ' + touch;
		// Add fixHook
		$.event.fixHooks[ touch ] = hook;
	});

	$.pointertouch = events;

	return events;
}));
