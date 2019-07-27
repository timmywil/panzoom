# Panzoom

[![Build Status](https://travis-ci.org/timmywil/panzoom.png?branch=master)](https://travis-ci.org/timmywil/panzoom)

**[Documentation](./docs/)**

**[Examples](https://timmywil.com/panzoom/test/demo/)**

Panzoom is a small library to add panning and zooming functionality to an element.
Rather than using absolute positioning or setting width and height, Panzoom uses CSS transforms to take advantage of hardware/GPU acceleration in the browser, which means the element can be _anything_: an image, a video, an iframe, a canvas, text, WHATEVER.

panzoom.min.js, included in this repo, is compressed with [uglifyjs](https://github.com/mishoo/UglifyJS).

For common support questions, see [the FAQ](https://github.com/timmywil/panzoom#faq) at the bottom.

## Browser support

Here is a list of [currently supported browsers](https://browserl.ist/?q=%3E0.25%25%2C+not+op_mini+all).

## Mobile support

iOS, Android, and Windows Mobile are supported.

Panzoom includes support for touch gestures and even supports **pinch gestures** for zooming. It is perfectly suited for both mobile and desktop browsers. It uses [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) by default wherever supported.

## SVG support

Panzoom supports panning and zooming SVG elements directly, in browsers that support SVG.

In IE11, CSS animations/transitions do not work on SVG elements, at least for the transform style. They do work in other browsers.

One could implement transitions manually in those browsers using the `setTransform` option and integrating a tweening library for javascript animations (such as [tween.js](https://www.createjs.com/#!/TweenJS)).

## Loading Panzoom

Panzoom uses (UMD)[https://github.com/umdjs/umd] and can be loaded a lot of ways.

With ES6 imports:

```js
import Panzoom from 'panzoom'
```

With AMD loader in an anonymous module:

```js
define(['panzoom'], function(Panzoom) {
  Panzoom('.panzoom')
})
```

With script tags:

```html
<script src="/js/panzoom.js"></script>
```

## Initialization

```js
const panzoom = Panzoom('.panzoom', {
  maxScale: 5
})
```

## FAQ

1\. How do I make it so that I never see the background behind the Panzoom element? [example](https://codepen.io/timmywil/pen/qjvBF)

- This can be done with the `contain` option. Set `contain` to `"invert"` or `"auto"` and make sure the Panzoom element is the same size or larger than its parent.

```js
$('.panzoom-elements').panzoom({
  contain: 'invert',
  minScale: 1
})
```

2\. How do I make links work if they're within a Panzoom element? [example](https://codepen.io/timmywil/pen/bFiqy)

- Event propagation is stopped for `mousedown` and `touchstart` events in order to allow for Panzoom elements within Panzoom elements. To fix the links, bind an event handler that prevents the event from reaching the Panzoom handler:

```js
$('.panzoom a').on('mousedown touchstart', function(e) {
  e.stopImmediatePropagation()
})
```

3\. What is `transform-origin` and why is it set to `'0 0'` on the panzoom element?

- The `transform-origin` is the origin from which transforms are applied. The default for SVG is already `'0 0'`. Panzoom normalizes HTML to the same default, which makes working with both much simpler. The SVG default was chosen over the HTML one because changing the `transform-origin` on SVG elements doesn't work in IE. Anything that can be done with a `transform-origin` of `'50% 50%'` can be done with `'0 0'`; the transform values just need adjusting.

4\. I am using Panzoom with an `<object>` tag. It zooms but does not pan. [example](https://codepen.io/timmywil/pen/qNpykA)

Object elements can eat up events, making it so they never reach Panzoom. To fix this, disable pointer events (`pointer-events: none`) on the `<object>` tag and call Panzoom using a wrapper.
