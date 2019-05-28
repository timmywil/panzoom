# Panzoom

[![Build Status](https://travis-ci.org/timmywil/panzoom.png?branch=master)](https://travis-ci.org/timmywil/panzoom)

Panzoom is a small library to add panning and zooming functionality to an element.
Rather than setting width and height, Panzoom uses CSS transforms and matrix functions to take advantage of hardware/GPU acceleration in the browser, which means the element can be _anything_: an image, a video, an iframe, a canvas, text, WHATEVER.

panzoom.min.js (12.5kb/4.6kb gzip), included in this repo, is compressed with [uglifyjs](https://github.com/mishoo/UglifyJS).

For common support questions, see [the FAQ](https://github.com/timmywil/panzoom#faq) at the bottom.

**[Examples](./test/demo/)**
**[Documentation](./docs/)**

## Dependencies

Panzoom used to rely on jQuery, but is now a standalone library. However, it can still be used as a jQuery plugin.

## Browser support

Here is a list of [currently supported browsers](https://browserl.ist/?q=%3E0.25%25%2C+not+op_mini+all).

## Mobile support

Panzoom includes support for touch gestures and even supports **pinch gestures** for zooming. It is perfectly suited for both mobile and desktop browsers.

iOS and Android are supported.

**Pointer**, **touch**, and **mouse** events are supported.

## SVG support

Panzoom supports panning and zooming SVG elements directly, in browsers that support SVG.

In IE11, CSS animations/transitions do not work on SVG elements, at least for the transform style. They do work in other browsers.

One could implement transitions manually in those browsers by overriding the `setTransform()` method and integrating a tweening library for javascript animations (such as [tween.js](http://www.createjs.com/#!/TweenJS)).

**Compatibility note:** _There is a [known issue with Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=530985) and using the `focal` option. Firefox does not correctly maintain the dimensions of SVG parent elements, which throws off offsets. If using the `focal` option with SVG, the workaround is to set the correct offset on the Panzoom instance manually using `Panzoom.prototype.parentOffset` ([example](http://jsfiddle.net/timmywil/Vu8nA/))._

## Loading Panzoom

Panzoom can be included with your scripts at the end of the body,
but Panzoom supports AMD for javascript module love.

With script tags:

```html
<script src="/js/panzoom.js"></script>
```

With AMD loader in an anonymous module:

```js
define(['panzoom'], function(Panzoom) {
  Panzoom('.panzoom')
})
```

## Initialization

```js
const panzoom = Panzoom('.panzoom', {
  maxScale: 5
})
```

## FAQ

1\. How do I make it so that I never see the background behind the Panzoom element? [example](http://codepen.io/timmywil/pen/qjvBF)

- This can be done with the `contain` option. Set `contain` to `"invert"` or `"auto"` and make sure the Panzoom element is the same size or larger than its parent.

```js
$('.panzoom-elements').panzoom({
  contain: 'invert',
  minScale: 1
})
```

2\. How do I make links work if they're within a Panzoom element? [example](http://codepen.io/timmywil/pen/bFiqy)

- Event propagation is stopped for `mousedown` and `touchstart` events in order to allow for Panzoom elements within Panzoom elements. To fix the links, bind an event handler that prevents the event from reaching the Panzoom handler:

```js
$('.panzoom a').on('mousedown touchstart', function(e) {
  e.stopImmediatePropagation()
})
```

3\. What is `transform-origin` and why is it added to the panzoom element?

- The `transform-origin` is the origin from which transforms are applied. Panzoom ensures the defaults are set to what it expects to calculate focal points and containment. The defaults are needed because certain browsers (_IE_) don't support changing them for certain elements.
- HTML elements default to '50% 50%'.
- SVG elements default to '0 0'.

4\. How do I prevent zooming beyond the image's original size?

- The `maxScale` option can be set using the image's `naturalWidth` divided by the `clientWidth`:

```js
$('#large-image').panzoom({
  maxScale: elem.naturalWidth / elem.clientWidth
})
```

5\. I am using Panzoom with an `<object>` tag. It zooms but does not pan. [example](http://codepen.io/timmywil/pen/qNpykA)

Object elements can eat up events, making it so they never reach Panzoom. To fix this, disable pointer events on the object tag and call Panzoom using a wrapper.
