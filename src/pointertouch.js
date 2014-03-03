/**
 * jquery.event.pointertouch
 * Lift touch and pointer event properties to the jQuery event object
 * @version v0.1.0
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
	var hook = $.event.mouseHooks;
	var props = hook.props;
	var events = {};
	var list = 'over out down up move enter leave cancel'.split(' ');
	var touchReplace = { down: 'start', up: 'end' };

	// Support pointer events in IE11+ if available
	if ( window.PointerEvent ) {
		$.each(list, function( i, name ) {
			// Add event name to events property and add fixHook
			$.event.fixHooks[
				(events[name] = 'pointer' + name)
			] = hook;
		});
	} else {
		// Add touches property for the touch hook
		props.push('touches', 'changedTouches', 'targetTouches', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey');

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

		// Take off 'over' and 'out' when attaching touch hooks
		$.each(list.slice(2), function( i, name ) {
			var touch = 'touch' + (touchReplace[name] || name);
			// Add fixHook
			$.event.fixHooks[ touch ] = hook;
			// Add event names to events property
			events[ name ] = touch + ' mouse' + name;
		});
	}

	$.pointertouch = events;

	return events;
}));
