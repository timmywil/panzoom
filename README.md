# Panzoom

[![Build Status](https://travis-ci.org/timmywil/panzoom.png?branch=master)](https://travis-ci.org/timmywil/panzoom)

**[Examples](https://timmywil.com/panzoom/test/demo/)**

**This rewrite is a work in progress**

Have a look at the [GitHub project](https://github.com/timmywil/panzoom/projects/1) to follow along on the status of this rewrite.

---

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

Panzoom supports panning and zooming SVG elements directly.

In IE11, CSS animations/transitions do not work on SVG elements, at least for the transform style. They do work in other browsers.

One could implement transitions manually in IE11 using the `setTransform` option and integrating a tweening library for javascript animations (such as [tween.js](https://www.createjs.com/#!/TweenJS)).

## Loading Panzoom

Panzoom uses [UMD](https://github.com/umdjs/umd) and can be loaded a lot of ways.

With ES6 imports:

```js
import Panzoom from "panzoom";
```

With AMD loader in an anonymous module:

```js
define(["panzoom"], function(Panzoom) {
  Panzoom(".panzoom");
});
```

With script tags:

```html
<script src="/js/panzoom.js"></script>
```

## Initialization

```js
const panzoom = Panzoom(".panzoom", {
  maxScale: 5
});
```

## FAQ

1\. What is `transform-origin` and why is it added to the panzoom element?

- The `transform-origin` is the origin from which transforms are applied. Panzoom ensures the defaults are set to what it expects to calculate focal point zooming.
- HTML elements default to '50% 50%'.
- SVG elements default to '0 0'.

2\. I am using Panzoom with an `<object>` tag. It zooms but does not pan. [example](https://codepen.io/timmywil/pen/qNpykA)

Object elements can eat up events, making it so they never reach Panzoom. To fix this, disable pointer events (`pointer-events: none`) on the `<object>` tag and call Panzoom using a wrapper.

3\. My links aren't working! How do I enable an anchor within a panzoom element?

Add class `options.clickable` (default is `"clickable"`) to whatever element you want to be clickable. This will add a listener that calls `event.stopImmediatePropagation()` to prevent the event from reaching panzoom. You could also do this yourself.

---

## Documentation

### Default export

▸ **Panzoom**(`elem`: `HTMLElement` | `SVGElement`, `options?`: [PanzoomOptions](#PanzoomOptions)): _[PanzoomObject](#PanzoomObject)_

_Defined in [panzoom.ts:37](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L37)_

**Parameters:**

| Name       | Type                          |
| ---------- | ----------------------------- |
| `elem`     | `HTMLElement` \| `SVGElement` |
| `options?` | PanzoomOptions                |

**Returns:** _PanzoomObject_

### `Const` defaultOptions

_Defined in [panzoom.ts:17](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L17)_

### animate

• **animate**: _false_ = false

_Defined in [panzoom.ts:18](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L18)_

### clickableClass

• **clickableClass**: _string_ = "clickable"

_Defined in [panzoom.ts:19](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L19)_

### cursor

• **cursor**: _string_ = "move"

_Defined in [panzoom.ts:20](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L20)_

### disablePan

• **disablePan**: _false_ = false

_Defined in [panzoom.ts:21](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L21)_

### disableXAxis

• **disableXAxis**: _false_ = false

_Defined in [panzoom.ts:23](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L23)_

### disableYAxis

• **disableYAxis**: _false_ = false

_Defined in [panzoom.ts:24](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L24)_

### disableZoom

• **disableZoom**: _false_ = false

_Defined in [panzoom.ts:22](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L22)_

### duration

• **duration**: _number_ = 200

_Defined in [panzoom.ts:25](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L25)_

### easing

• **easing**: _string_ = "ease-in-out"

_Defined in [panzoom.ts:26](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L26)_

### maxScale

• **maxScale**: _number_ = 4

_Defined in [panzoom.ts:27](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L27)_

### minScale

• **minScale**: _number_ = 0.125

_Defined in [panzoom.ts:28](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L28)_

### relative

• **relative**: _false_ = false

_Defined in [panzoom.ts:29](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L29)_

### setTransform

• **setTransform**: _`setTransform`_

_Defined in [panzoom.ts:30](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L30)_

### startScale

• **startScale**: _number_ = 1

_Defined in [panzoom.ts:33](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L33)_

### startX

• **startX**: _number_ = 0

_Defined in [panzoom.ts:31](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L31)_

### startY

• **startY**: _number_ = 0

_Defined in [panzoom.ts:32](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L32)_

### step

• **step**: _number_ = 0.3

_Defined in [panzoom.ts:34](https://github.com/timmywil/panzoom/blob/6e3342a/src/panzoom.ts#L34)_

## `[PanzoomOptions](#PanzoomOptions)`

Includes `MiscOptions`, `PanOptions`, and `ZoomOptions`

---

## `MiscOptions`

### `Optional` animate

• **animate**? : _boolean_

_Defined in [types.ts:5](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L5)_

Whether to animate transitions

---

### `Optional` clickableClass

• **clickableClass**? : _string_

_Defined in [types.ts:10](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L10)_

Add this class to any element within the panzoom element
that you want to be clickable and not initiate the drag

---

### `Optional` duration

• **duration**? : _number_

_Defined in [types.ts:12](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L12)_

Duration of the transition (ms)

---

### `Optional` easing

• **easing**? : _string_

_Defined in [types.ts:14](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L14)_

CSS Easing used for transitions

---

### `Optional` origin

• **origin**? : _string_

_Defined in [types.ts:28](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L28)_

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

### `Optional` setTransform

• **setTransform**? : _`setTransform`_

_Defined in [types.ts:45](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L45)_

Override the transform setter
This is exposed mostly so the user could
set other parts of a transform
aside from scale and translate.

```js
// This example always sets a rotation
// when setting the scale and translation
Panzoom(elem, {
  setTransform: (elem, { scale, x, y }) => {
    setStyle(
      elem,
      "transform",
      `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`
    );
  }
});
```

---

### `Optional` startScale

• **startScale**? : _number_

_Defined in [types.ts:49](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L49)_

---

### `Optional` startX

• **startX**? : _number_

_Defined in [types.ts:47](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L47)_

Values used to set the beginning transform

---

### `Optional` startY

• **startY**? : _number_

_Defined in [types.ts:48](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L48)_

---

## `PanOptions`

Includes `MiscOptions`

### `Optional` contain

• **contain**? : _"inside" | "outside"_

_Defined in [types.ts:66](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L66)_

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

### `Optional` cursor

• **cursor**? : _string_

_Defined in [types.ts:68](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L68)_

The cursor style to set on the panzoom element

---

### `Optional` disablePan

• **disablePan**? : _boolean_

_Defined in [types.ts:70](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L70)_

Disable panning functionality. Note: disablePan also disables focal point zooming

---

### `Optional` disableXAxis

• **disableXAxis**? : _boolean_

_Defined in [types.ts:72](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L72)_

Pan only on the Y axis

---

### `Optional` disableYAxis

• **disableYAxis**? : _boolean_

_Defined in [types.ts:74](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L74)_

Pan only on the X axis

---

### `Optional` panOnlyWhenZoomed

• **panOnlyWhenZoomed**? : _boolean_

_Defined in [types.ts:78](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L78)_

Disable panning while the scale is equal to the starting value

---

### `Optional` relative

• **relative**? : _boolean_

_Defined in [types.ts:76](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L76)_

When passing x and y values to .pan(), treat the values as relative to their current values

---

## `ZoomOptions`

Includes `MiscOptions`

### `Optional` disableZoom

• **disableZoom**? : _boolean_

_Defined in [types.ts:83](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L83)_

Disable zooming functionality

---

### `Optional` focal

• **focal**? : _object_

_Defined in [types.ts:90](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L90)_

Zoom to the given point on the panzoom element.
This point is expected to be relative to
the panzoom element's dimensions and is unrelated
to the parent dimensions.

#### Type declaration:

- **x**: _number_

- **y**: _number_

---

### `Optional` maxScale

• **maxScale**? : _number_

_Defined in [types.ts:94](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L94)_

The maximum scale when zooming

---

### `Optional` minScale

• **minScale**? : _number_

_Defined in [types.ts:92](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L92)_

The minimum scale when zooming

---

### `Optional` step

• **step**? : _number_

_Defined in [types.ts:96](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L96)_

The step affects the rate of zooming with a mouse wheel, pinching, or range element

---

## `[PanzoomObject](#PanzoomObject)`

### getOptions

• **getOptions**: _function_

_Defined in [types.ts:117](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L117)_

Returns a _copy_ of the current options object

#### Signature with return type:

▸ (): _[PanzoomOptions](#PanzoomOptions)_

---

### getPan

• **getPan**: _function_

_Defined in [types.ts:113](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L113)_

Get the current x/y translation

#### Signature with return type:

▸ (): _object_

- **x**: _number_

- **y**: _number_

---

### getScale

• **getScale**: _function_

_Defined in [types.ts:115](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L115)_

Get the current scale

#### Signature with return type:

▸ (): _number_

---

### pan

• **pan**: _function_

_Defined in [types.ts:128](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L128)_

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100);
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true });
```

#### Signature with return type:

▸ (`x`: number | string, `y`: number | string, `panOptions?`: PanOptions): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name          | Type             |
| ------------- | ---------------- |
| `x`           | number \| string |
| `y`           | number \| string |
| `panOptions?` | PanOptions       |

---

### reset

• **reset**: _function_

_Defined in [types.ts:134](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L134)_

Reset the pan and zoom to startX, startY, and startScale.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

#### Signature with return type:

▸ (`resetOptions?`: PanzoomOptions): _CurrentValues_

**Parameters:**

| Name            | Type           |
| --------------- | -------------- |
| `resetOptions?` | PanzoomOptions |

---

### setOptions

• **setOptions**: _function_

_Defined in [types.ts:136](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L136)_

Change options for the Panzoom instance

#### Signature with return type:

▸ (`options?`: PanzoomOptions): _void_

**Parameters:**

| Name       | Type           |
| ---------- | -------------- |
| `options?` | PanzoomOptions |

---

### setStyle

• **setStyle**: _`setStyle`_

_Defined in [types.ts:138](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L138)_

A convenience method for setting prefixed styles on the Panzoom element

---

### zoom

• **zoom**: _function_

_Defined in [types.ts:147](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L147)_

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2);
panzoom.zoom(2.2, { animate: true });
```

#### Signature with return type:

▸ (`scale`: number, `zoomOptions?`: ZoomOptions): _CurrentValues_

**Parameters:**

| Name           | Type        |
| -------------- | ----------- |
| `scale`        | number      |
| `zoomOptions?` | ZoomOptions |

---

### zoomIn

• **zoomIn**: _function_

_Defined in [types.ts:153](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L153)_

Zoom in using the predetermined increment set in options
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

#### Signature with return type:

▸ (`zoomOptions?`: ZoomOptions): _CurrentValues_

**Parameters:**

| Name           | Type        |
| -------------- | ----------- |
| `zoomOptions?` | ZoomOptions |

---

### zoomOut

• **zoomOut**: _function_

_Defined in [types.ts:159](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L159)_

Zoom out using the predetermined increment set in options
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

#### Signature with return type:

▸ (`zoomOptions?`: ZoomOptions): _CurrentValues_

**Parameters:**

| Name           | Type        |
| -------------- | ----------- |
| `zoomOptions?` | ZoomOptions |

---

### zoomToPoint

• **zoomToPoint**: _function_

_Defined in [types.ts:166](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L166)_

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a pointer event on the Panzoom element.

#### Signature with return type:

▸ (`scale`: number, `point`: object, `zoomOptions?`: ZoomOptions): _CurrentValues_

**Parameters:**

▪ **scale**: _number_

▪ **point**: _object_

| Name      | Type   |
| --------- | ------ |
| `clientX` | number |
| `clientY` | number |

▪`Optional` **zoomOptions**: _ZoomOptions_

---

### zoomWithWheel

• **zoomWithWheel**: _function_

_Defined in [types.ts:195](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L195)_

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
elem.parentElement.addEventListener("wheel", panzoom.zoomUsingWheel);
// Bind to shift+mousewheel
elem.parentElement.addEventListener("wheel", function(event) {
  if (!event.shiftKey) return;
  panzoom.zoomUsingWheel(event);
});
```

#### Signature with return type:

▸ (`event`: `WheelEvent`, `zoomOptions?`: ZoomOptions): _CurrentValues_

**Parameters:**

| Name           | Type         |
| -------------- | ------------ |
| `event`        | `WheelEvent` |
| `zoomOptions?` | ZoomOptions  |

---

## <a name="CurrentValues">`CurrentValues`</a>

### scale

• **scale**: _number_

_Defined in [types.ts:108](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L108)_

---

### x

• **x**: _number_

_Defined in [types.ts:106](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L106)_

---

### y

• **y**: _number_

_Defined in [types.ts:107](https://github.com/timmywil/panzoom/blob/6e3342a/src/types.ts#L107)_
