# Panzoom

[![Build Status](https://travis-ci.org/timmywil/panzoom.png?branch=master)](https://travis-ci.org/timmywil/panzoom) [![Greenkeeper badge](https://badges.greenkeeper.io/timmywil/panzoom.svg)](https://greenkeeper.io/)

**[Examples](https://timmywil.com/panzoom/demo/)**

**This rewrite is a work in progress**

Have a look at the [GitHub project](https://github.com/timmywil/panzoom/projects/1) to follow along on the status of this rewrite.

---

Panzoom is a small library (<3kb gzipped) to add panning and zooming functionality to an element.
Rather than using absolute positioning or setting width and height, Panzoom uses CSS transforms to take advantage of hardware/GPU acceleration in the browser, which means the element can be _anything_: an image, a video, an iframe, a canvas, text, WHATEVER.

For common support questions, see [the FAQ](https://github.com/timmywil/panzoom#faq).

## Browser support

Here is a list of [currently supported browsers](https://browserl.ist/?q=%3E0.25%25%2C+not+op_mini+all).

## Mobile support

iOS, Android, and Windows Mobile are supported.

Panzoom includes support for touch gestures and even supports **pinch gestures** for zooming. It is perfectly suited for both mobile and desktop browsers. It uses [pointer events](https://developer.mozilla.org/en-US/docs/Web/API/Pointer_events) by default wherever supported.

## SVG support

Panzoom supports panning and zooming SVG elements directly.

In IE11, CSS animations/transitions do not work on SVG elements, at least for the transform style. They do work in other browsers.

One could implement transitions manually in IE11 using the `setTransform` option and integrating a tweening library for javascript animations (such as [tween.js](https://www.createjs.com/#!/TweenJS)).

## Installing

With npm:

```bash
$ npm install --save @panzoom/panzoom
```

With yarn:

```bash
$ yarn add @panzoom/panzoom
```

Panzoom uses [UMD](https://github.com/umdjs/umd) and can be loaded a lot of ways.

With ES6 imports:

```js
import Panzoom from 'panzoom'
```

With commonjs or browserify:

```
const Panzoom = require('panzoom')
```

With an AMD loader in an anonymous module:

```js
define(['panzoom'], function(Panzoom) {
  Panzoom('.panzoom')
})
```

With a script tag:

```html
<script src="/js/panzoom.js"></script>
```

## Usage

```js
const elem = document.getElementById('panzoom-element')
const panzoom = Panzoom(elem, {
  maxScale: 5
})
panzoom.pan(10, 10)
panzoom.zoom(2, { animate: true })

// Panning and pinch zooming are bound automatically.
// There are several available methods for zooming
// that can be bound on button clicks or mousewheel.
button.addEventListener('click', panzoom.zoomIn)
elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
```

## FAQ

1\. What is `transform-origin` and why is it added to the panzoom element?

- The `transform-origin` is the origin from which transforms are applied. Panzoom ensures the defaults are set to what it expects to calculate focal point zooming.
- HTML elements default to '50% 50%'.
- SVG elements default to '0 0'.

2\. I am using Panzoom with an `<object>` tag and it's not working. What's wrong?

Object elements can eat up events, making it so they never reach Panzoom. To fix this, disable pointer events (`pointer-events: none`) on the `<object>` tag and call Panzoom using a wrapper.

3\. My links aren't working! How do I enable an anchor within a panzoom element?

Add class `options.clickableClass` (default is `"clickable"`) to whatever element you want to be clickable. Panzoom will check for this class before handling the event.
Alternatively, call `event.stopImmediatePropagation()` in an event handler on the clickable element.

---

## Documentation

▸ **Panzoom**(`elem`: `HTMLElement` | `SVGElement`, `options?`: [PanzoomOptions](#PanzoomOptions)): _[PanzoomObject](#PanzoomObject)_

_Defined in [panzoom.ts:39](https://github.com/timmywil/panzoom/blob/1ddd93e/src/panzoom.ts#L39)_

**Parameters:**

| Name       | Type                              |
| ---------- | --------------------------------- |
| `elem`     | `HTMLElement` \| `SVGElement`     |
| `options?` | [PanzoomOptions](#PanzoomOptions) |

**Returns:** _[PanzoomObject](#PanzoomObject)_

## `PanzoomOptions`

Includes `MiscOptions`, `PanOptions`, and `ZoomOptions`

---

## `MiscOptions`

### animate

• **animate**? : _boolean_ (Default: **false**)

_Defined in [types.ts:5](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L5)_

Whether to animate transitions

---

### clickableClass

• **clickableClass**? : _string_ (Default: **"clickable"**)

_Defined in [types.ts:10](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L10)_

Add this class to any element within the panzoom element
that you want to be clickable and not initiate the drag

---

### duration

• **duration**? : _number_ (Default: **200**)

_Defined in [types.ts:12](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L12)_

Duration of the transition (ms)

---

### easing

• **easing**? : _string_ (Default: **"ease-in-out"**)

_Defined in [types.ts:14](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L14)_

CSS Easing used for transitions

---

### origin

• **origin**? : _string_

_Defined in [types.ts:28](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L28)_

**Change this at your own risk.**
The `transform-origin` is the origin from which transforms are applied.
Default: `'50% 50%'` for HTML and `'0 0'` for SVG.
The defaults are set because changing the `transform-origin` on
SVG elements doesn't work in IE.

Changing this should work with many things, but
it will break focal point zooming, which assumes the
defaults are set to do the more complicated calculations.

And again, changing this for SVG in IE doesn't work at all.

---

### setTransform

• **setTransform**? : _`setTransform`_

_Defined in [types.ts:46](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L46)_

Override the transform setter.
This is exposed mostly so the user could
set other parts of a transform
aside from scale and translate.
Default is defined in src/css.ts.

```js
// This example always sets a rotation
// when setting the scale and translation
Panzoom(elem, {
  setTransform: (elem, { scale, x, y }) => {
    setStyle(elem, 'transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
  }
})
```

---

### startScale

• **startScale**? : _number_ (Default: **1**)

_Defined in [types.ts:52](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L52)_

Scale used to set the beginning transform

---

### startX

• **startX**? : _number_ (Default: **0**)

_Defined in [types.ts:48](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L48)_

X Value used to set the beginning transform

---

### startY

• **startY**? : _number_ (Default: **0**)

_Defined in [types.ts:50](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L50)_

Y Value used to set the beginning transform

---

## `PanOptions`

Includes `MiscOptions`

### contain

• **contain**? : _"inside" | "outside"_

_Defined in [types.ts:69](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L69)_

Contain the panzoom element either
inside or outside the parent.
Inside: The panzoom element is smaller
than its parent and cannot be panned
to the outside.
Outside: The panzoom element is larger
than its parent and cannot be panned
to the inside. In other words, no
empty space around the element will be shown.

---

### cursor

• **cursor**? : _string_ (Default: **"move"**)

_Defined in [types.ts:71](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L71)_

The cursor style to set on the panzoom element

---

### disablePan

• **disablePan**? : _boolean_ (Default: **false**)

_Defined in [types.ts:73](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L73)_

Disable panning functionality. Note: disablePan also disables focal point zooming

---

### disableXAxis

• **disableXAxis**? : _boolean_ (Default: **false**)

_Defined in [types.ts:75](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L75)_

Pan only on the Y axis

---

### disableYAxis

• **disableYAxis**? : _boolean_ (Default: **false**)

_Defined in [types.ts:77](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L77)_

Pan only on the X axis

---

### panOnlyWhenZoomed

• **panOnlyWhenZoomed**? : _boolean_ (Default: **false**)

_Defined in [types.ts:81](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L81)_

Disable panning while the scale is equal to the starting value

---

### relative

• **relative**? : _boolean_ (Default: **false**)

_Defined in [types.ts:79](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L79)_

When passing x and y values to .pan(), treat the values as relative to their current values

---

## `ZoomOptions`

Includes `MiscOptions`

### disableZoom

• **disableZoom**? : _boolean_ (Default: **false**)

_Defined in [types.ts:86](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L86)_

Disable zooming functionality

---

### focal

• **focal**? : _object_

_Defined in [types.ts:93](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L93)_

Zoom to the given point on the panzoom element.
This point is expected to be relative to
the panzoom element's dimensions and is unrelated
to the parent dimensions.

#### Type declaration:

- **x**: _number_

- **y**: _number_

---

### maxScale

• **maxScale**? : _number_ (Default: **4**)

_Defined in [types.ts:97](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L97)_

The maximum scale when zooming

---

### minScale

• **minScale**? : _number_ (Default: **0.125**)

_Defined in [types.ts:95](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L95)_

The minimum scale when zooming

---

### step

• **step**? : _number_ (Default: **0.3**)

_Defined in [types.ts:99](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L99)_

The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut

---

## `PanzoomObject`

These methods are available after initializing Panzoom

### getOptions()

• **getOptions**: _function_

_Defined in [types.ts:120](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L120)_

Returns a _copy_ of the current options object

#### Signature with return type:

▸ (): _[PanzoomOptions](#PanzoomOptions)_

---

### getPan()

• **getPan**: _function_

_Defined in [types.ts:116](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L116)_

Get the current x/y translation

#### Signature with return type:

▸ (): _object_

- **x**: _number_

- **y**: _number_

---

### getScale()

• **getScale**: _function_

_Defined in [types.ts:118](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L118)_

Get the current scale

#### Signature with return type:

▸ (): _number_

---

### pan()

• **pan**: _function_

_Defined in [types.ts:131](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L131)_

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100)
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true })
```

#### Signature with return type:

▸ (`x`: number | string, `y`: number | string, `panOptions?`: [PanOptions](#PanOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name          | Type                      |
| ------------- | ------------------------- |
| `x`           | number \| string          |
| `y`           | number \| string          |
| `panOptions?` | [PanOptions](#PanOptions) |

---

### reset()

• **reset**: _function_

_Defined in [types.ts:142](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L142)_

Reset the pan and zoom to startX, startY, and startScale.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.reset()
panzoom.reset({ animate: false })
```

#### Signature with return type:

▸ (`resetOptions?`: [PanzoomOptions](#PanzoomOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name            | Type                              |
| --------------- | --------------------------------- |
| `resetOptions?` | [PanzoomOptions](#PanzoomOptions) |

---

### setOptions()

• **setOptions**: _function_

_Defined in [types.ts:144](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L144)_

Change options for the Panzoom instance

#### Signature with return type:

▸ (`options?`: [PanzoomOptions](#PanzoomOptions)): _void_

**Parameters:**

| Name       | Type                              |
| ---------- | --------------------------------- |
| `options?` | [PanzoomOptions](#PanzoomOptions) |

---

### setStyle()

• **setStyle**: _`setStyle`_

_Defined in [types.ts:146](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L146)_

A convenience method for setting prefixed styles on the Panzoom element

---

### zoom()

• **zoom**: _function_

_Defined in [types.ts:155](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L155)_

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

#### Signature with return type:

▸ (`scale`: number, `zoomOptions?`: [ZoomOptions](#ZoomOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name           | Type                        |
| -------------- | --------------------------- |
| `scale`        | number                      |
| `zoomOptions?` | [ZoomOptions](#ZoomOptions) |

---

### zoomIn()

• **zoomIn**: _function_

_Defined in [types.ts:166](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L166)_

Zoom in using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomIn()
panzoom.zoomIn({ animate: false })
```

#### Signature with return type:

▸ (`zoomOptions?`: [ZoomOptions](#ZoomOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name           | Type                        |
| -------------- | --------------------------- |
| `zoomOptions?` | [ZoomOptions](#ZoomOptions) |

---

### zoomOut()

• **zoomOut**: _function_

_Defined in [types.ts:177](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L177)_

Zoom out using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomOut()
panzoom.zoomOut({ animate: false })
```

#### Signature with return type:

▸ (`zoomOptions?`: [ZoomOptions](#ZoomOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name           | Type                        |
| -------------- | --------------------------- |
| `zoomOptions?` | [ZoomOptions](#ZoomOptions) |

---

### zoomToPoint()

• **zoomToPoint**: _function_

_Defined in [types.ts:188](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L188)_

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a pointer event on the Panzoom element.

```js
panzoom.zoomToPoint(1.2, pointerEvent)
```

#### Signature with return type:

▸ (`scale`: number, `point`: object, `zoomOptions?`: [ZoomOptions](#ZoomOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

▪ **scale**: _number_

▪ **point**: _object_

| Name      | Type   |
| --------- | ------ |
| `clientX` | number |
| `clientY` | number |

▪`Optional` **zoomOptions**: _[ZoomOptions](#ZoomOptions)_

---

### zoomWithWheel()

• **zoomWithWheel**: _function_

_Defined in [types.ts:217](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L217)_

Zoom the Panzoom element to a focal point using the given WheelEvent

`disablePan` will prevent the focal point adjustment and will only zoom.

`zoomWithWheel` normally uses `deltaY` to determine the scale,
but will fall back to `deltaX` in case the shift modifier is used with
the wheel event. On a mac, that usually translates to horizontal scrolling,
but this method assumes the desired behavior is zooming.

This is a convenience function that may not handle all use cases.
Other cases should handroll solutions using the `zoomToPoint`
method or the `zoom` method's focal option.

```js
// Bind to mousewheel
elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
// Bind to shift+mousewheel
elem.parentElement.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomWithWheel(event)
})
```

#### Signature with return type:

▸ (`event`: `WheelEvent`, `zoomOptions?`: [ZoomOptions](#ZoomOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name           | Type                        |
| -------------- | --------------------------- |
| `event`        | `WheelEvent`                |
| `zoomOptions?` | [ZoomOptions](#ZoomOptions) |

---

## `CurrentValues`

### scale

• **scale**: _number_

_Defined in [types.ts:111](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L111)_

---

### x

• **x**: _number_

_Defined in [types.ts:109](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L109)_

---

### y

• **y**: _number_

_Defined in [types.ts:110](https://github.com/timmywil/panzoom/blob/1ddd93e/src/types.ts#L110)_
