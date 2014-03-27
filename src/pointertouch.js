/**
 * jquery.event.pointertouch
 * Lift touch and pointer event properties to the jQuery event object
 * @version v0.1.2
 * @license MIT
 */
(function(global, factory) {
	// AMD
	if (typeof define === 'function' && define.amd) {
		define(['jquery'], function(jQuery) { return factory(global, jQuery); });
	// CommonJS/Browserify
	} else if (typeof exports === 'object') {
		factory(global, require('jquery'));
	// Global
	} else {
		factory(global, global.jQuery);
	}
}(typeof window !== 'undefined' ? window : this, function(window, $) {
	'use strict';

	// Common properties to lift for touch or pointer events
	var list = 'over out down up move enter leave cancel'.split(' ');
	var hook = $.extend({}, $.event.mouseHooks);
	var events = {};

	// Support pointer events in IE11+ if available
	if ( window.PointerEvent ) {
		$.each(list, function( i, name ) {
			// Add event name to events property and add fixHook
			$.event.fixHooks[
				(events[name] = 'pointer' + name)
			] = hook;
		});
	} else {
		var mouseProps = hook.props;
		// Add touch properties for the touch hook
		hook.props = mouseProps.concat(['touches', 'changedTouches', 'targetTouches', 'altKey', 'ctrlKey', 'metaKey', 'shiftKey']);

		/**
		 * Support: Android
		 * Android sets pageX/Y to 0 for any touch event
		 * Attach first touch's pageX/pageY and clientX/clientY if not set correctly
		 */
		hook.filter = function( event, originalEvent ) {
			var touch;
			var i = mouseProps.length;
			if ( !originalEvent.pageX && originalEvent.touches && (touch = originalEvent.touches[0]) ) {
				// Copy over all mouse properties
				while(i--) {
					event[mouseProps[i]] = touch[mouseProps[i]];
				}
			}
			return event;
		};

		$.each(list, function( i, name ) {
			// No equivalent touch events for over and out
			if (i < 2) {
				events[ name ] = 'mouse' + name;
			} else {
				var touch = 'touch' +
					(name === 'down' ? 'start' : name === 'up' ? 'end' : name);
				// Add fixHook
				$.event.fixHooks[ touch ] = hook;
				// Add event names to events property
				events[ name ] = touch + ' mouse' + name;
			}
		});
	}

	$.pointertouch = events;

	return events;
}));
