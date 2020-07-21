# Panzoom

[![Build Status](https://travis-ci.org/timmywil/panzoom.png?branch=master)](https://travis-ci.org/timmywil/panzoom)

**[Examples](https://timmywil.com/panzoom/demo/)**

---

Panzoom is a small library (~3.7kb gzipped) to add panning and zooming functionality to an element.
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
import Panzoom from '@panzoom/panzoom'
```

With commonjs or browserify:

```js
const Panzoom = require('@panzoom/panzoom')
```

With an AMD loader in an anonymous module:

```js
define(['@panzoom/panzoom'], function (Panzoom) {
  const elem = document.getElementById('panzoom-element')
  Panzoom(elem)
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

// Panning and pinch zooming are bound automatically (unless disablePan is true).
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

Add class `options.excludeClass` (default is `"panzoom-exclude"`) to whatever element you want to be clickable. Panzoom will check for this class before handling the event.
Alternatively, add a reference to the element to the `exclude` option, or call `event.stopImmediatePropagation()` in an event handler on the clickable element.

## A note on the async nature of Panzoom

In some cases, setting one thing and then setting another synchronously will not work as intended.

For instance, the following usually works fine.

```js
const panzoom = Panzoom(elem)
panzoom.zoom(2)
panzoom.pan(100, 100)
```

However, you might find that the things start breaking when the `contain` option is set.

This is due to the fact that in order for Panzoom to retrieve proper dimensions, the scale needs to be painted.

If you find that things aren't looking quite right, try the following instead...

```js
panzoom.zoom(2)
setTimeout(() => panzoom.pan(100, 100))
```

---

## Documentation

▸ **Panzoom**(`elem`: HTMLElement | SVGElement, `options?`: Omit‹[PanzoomOptions](#PanzoomOptions), "force"›): _[PanzoomObject](#PanzoomObject)_

_Defined in [panzoom.ts:51](https://github.com/timmywil/panzoom/blob/3a0119e/src/panzoom.ts#L51)_

**Parameters:**

| Name       | Type                                             |
| ---------- | ------------------------------------------------ |
| `elem`     | HTMLElement &#124; SVGElement                    |
| `options?` | Omit‹[PanzoomOptions](#PanzoomOptions), "force"› |

**Returns:** _[PanzoomObject](#PanzoomObject)_

## `PanzoomOptions`

Includes `MiscOptions`, `PanOptions`, and `ZoomOptions`

---

## `MiscOptions`

### animate

• **animate**? : _boolean_ (Default: **false**)

_Defined in [types.ts:13](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L13)_

Whether to animate transitions

---

### canvas

• **canvas**? : _boolean_ (Default: **false**)

_Defined in [types.ts:24](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L24)_

This option treats the Panzoom element's parent
as a canvas. Effectively, Panzoom binds the
down handler to the parent instead of the Panzoom
element, so that pointer events anywhere on the "canvas"
moves its children. See issue #472.

**Note**: setting this option to `true` also changes
where the `cursor` style is applied (i.e. the parent).

---

### duration

• **duration**? : _number_ (Default: **200**)

_Defined in [types.ts:26](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L26)_

Duration of the transition (ms)

---

### easing

• **easing**? : _string_ (Default: **"ease-in-out"**)

_Defined in [types.ts:28](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L28)_

CSS Easing used for transitions

---

### exclude

• **exclude**? : _Element[]_

_Defined in [types.ts:35](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L35)_

Add elements to this array that should be excluded
from Panzoom handling.
Ancestors of event targets are also checked.
e.g. links and buttons that should not propagate the click event.

---

### excludeClass

• **excludeClass**? : _string_ (Default: **"panzoom-exclude"**)

_Defined in [types.ts:42](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L42)_

Add this class to any element within the Panzoom element
that you want to exclude from Panzoom handling. That
element's children will also be excluded.
e.g. links and buttons that should not propagate the click event.

---

### force

• **force**? : _boolean_

_Defined in [types.ts:58](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L58)_

`force` should be used sparingly to temporarily
override and ignore options such as disablePan,
disableZoom, and panOnlyWhenZoomed.
This option cannot be passed to the
Panzoom constructor or setOptions (to avoid
setting this option globally).

```js
// Overrides disablePan and panOnlyWhenZoomed
panzoom.pan(50, 100, { force: true })
// Overrides disableZoom
panzoom.zoom(1, { force: true })
```

---

### handleStartEvent

• **handleStartEvent**? : _function_

_Defined in [types.ts:83](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L83)_

On the first pointer event, when panning starts,
the default Panzoom behavior is to call
`event.preventDefault()` and `event.stopPropagation()`
on that event. The former is almost certainly a necessity;
the latter enables Panzoom elements within Panzoom elements.

But there are some cases where the default is
not the desired behavior. Set this option to override that behavior.

```js
// Only call preventDefault()
Panzoom(elem, {
  handleStartEvent: (event) => {
    event.preventDefault()
  }
})
// Do nothing.
// This can change dragging behavior on mobile.
Panzoom(elem, {
  handleStartEvent: () => {}
})
```

#### Type declaration:

▸ (`event`: Event): _void_

**Parameters:**

| Name    | Type  |
| ------- | ----- |
| `event` | Event |

---

### noBind

• **noBind**? : _boolean_

_Defined in [types.ts:87](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L87)_

Skip binding the default Panzoom event listeners

---

### origin

• **origin**? : _string_

_Defined in [types.ts:101](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L101)_

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

### overflow

• **overflow**? : _string_ (Default: **"hidden"**)

_Defined in [types.ts:103](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L103)_

The overflow CSS value for the parent. Defaults to 'hidden'

---

### setTransform

• **setTransform**? : _typeof setTransform_

_Defined in [types.ts:121](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L121)_

Override the transform setter.
This is exposed mostly so the user could
set other parts of a transform
aside from scale and translate.
Default is defined in src/css.ts.

```js
// This example always sets a rotation
// when setting the scale and translation
const panzoom = Panzoom(elem, {
  setTransform: (elem, { scale, x, y }) => {
    panzoom.setStyle('transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
  }
})
```

---

### silent

• **silent**? : _boolean_

_Defined in [types.ts:123](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L123)_

Silence all events

---

### startScale

• **startScale**? : _number_ (Default: **1**)

_Defined in [types.ts:129](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L129)_

Scale used to set the beginning transform

---

### startX

• **startX**? : _number_ (Default: **0**)

_Defined in [types.ts:125](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L125)_

X Value used to set the beginning transform

---

### startY

• **startY**? : _number_ (Default: **0**)

_Defined in [types.ts:127](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L127)_

Y Value used to set the beginning transform

---

### touchAction

• **touchAction**? : _string_ (Default: **"none"**)

_Defined in [types.ts:139](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L139)_

This value is used to set touch-action on both the
Panzoom element and its parent.
It is needed because that the native scroll on mobile
interferes with panning and pinch zooming.
Set this to empty string to re-enable scrolling
on mobile, but note that both scrolling and panning
cannot work at the same time.

---

## `PanOptions`

Includes `MiscOptions`

### contain

• **contain**? : _"inside" | "outside"_

_Defined in [types.ts:158](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L158)_

Contain the panzoom element either
inside or outside the parent.
Inside: The panzoom element is smaller
than its parent and cannot be panned
to the outside.
Outside: The panzoom element is larger
than its parent and cannot be panned
to the inside. In other words, no
empty space around the element will be shown.

**Note**: the containment pan adjustment is not affected by the `disablePan` option.

---

### cursor

• **cursor**? : _string_ (Default: **"move"**)

_Defined in [types.ts:160](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L160)_

The cursor style to set on the panzoom element

---

### disablePan

• **disablePan**? : _boolean_ (Default: **false**)

_Defined in [types.ts:166](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L166)_

Disable panning functionality.
Note: disablePan does not affect focal point zooming or the contain option.
The element will still pan accordingly.

---

### disableXAxis

• **disableXAxis**? : _boolean_ (Default: **false**)

_Defined in [types.ts:168](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L168)_

Pan only on the Y axis

---

### disableYAxis

• **disableYAxis**? : _boolean_ (Default: **false**)

_Defined in [types.ts:170](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L170)_

Pan only on the X axis

---

### panOnlyWhenZoomed

• **panOnlyWhenZoomed**? : _boolean_ (Default: **false**)

_Defined in [types.ts:174](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L174)_

Disable panning while the scale is equal to the starting value

---

### relative

• **relative**? : _boolean_ (Default: **false**)

_Defined in [types.ts:172](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L172)_

When passing x and y values to .pan(), treat the values as relative to their current values

---

## `ZoomOptions`

Includes `MiscOptions`

### disableZoom

• **disableZoom**? : _boolean_ (Default: **false**)

_Defined in [types.ts:179](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L179)_

Disable zooming functionality

---

### focal

• **focal**? : _object_

_Defined in [types.ts:186](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L186)_

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

_Defined in [types.ts:190](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L190)_

The maximum scale when zooming

---

### minScale

• **minScale**? : _number_ (Default: **0.125**)

_Defined in [types.ts:188](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L188)_

The minimum scale when zooming

---

### step

• **step**? : _number_ (Default: **0.3**)

_Defined in [types.ts:192](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L192)_

The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut

---

## `PanzoomObject`

These methods are available after initializing Panzoom

### bind()

• **bind**: _function_

_Defined in [types.ts:213](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L213)_

Bind the default down, move, and up event listeners to the Panzoom element.
This does not normally need to be called.
It gets called by default when creating a new Panzoom object,
but can be skipped with the `noBind` option.

#### Signature with return type:

▸ (): _void_

---

### destroy()

• **destroy**: _function_

_Defined in [types.ts:215](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L215)_

Remove all event listeners bound to the the Panzoom element

#### Signature with return type:

▸ (): _void_

---

### eventNames()

• **eventNames**: _object_

_Defined in [types.ts:221](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L221)_

This object exposes the event names used by Panzoom,
depending on the current browser's support for
Pointer or Touch events.

#### Signature with return type:

- **down**: _string_

- **move**: _string_

- **up**: _string_

---

### getOptions()

• **getOptions**: _function_

_Defined in [types.ts:227](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L227)_

Returns a _copy_ of the current options object

#### Signature with return type:

▸ (): _[PanzoomOptions](#PanzoomOptions)_

---

### getPan()

• **getPan**: _function_

_Defined in [types.ts:223](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L223)_

Get the current x/y translation

#### Signature with return type:

▸ (): _object_

- **x**: _number_

- **y**: _number_

---

### getScale()

• **getScale**: _function_

_Defined in [types.ts:225](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L225)_

Get the current scale

#### Signature with return type:

▸ (): _number_

---

### pan()

• **pan**: _function_

_Defined in [types.ts:238](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L238)_

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
| `x`           | number &#124; string      |
| `y`           | number &#124; string      |
| `panOptions?` | [PanOptions](#PanOptions) |

---

### reset()

• **reset**: _function_

_Defined in [types.ts:251](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L251)_

Reset the pan and zoom to startX, startY, and startScale.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.
Reset ignores the `disablePan`, `disableZoom`, and `panOnlyWhenZoomed` options.
Pass `{ force: false }` to override.

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

_Defined in [types.ts:253](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L253)_

Change options for the Panzoom instance

#### Signature with return type:

▸ (`options?`: [PanzoomOptions](#PanzoomOptions)): _void_

**Parameters:**

| Name       | Type                              |
| ---------- | --------------------------------- |
| `options?` | [PanzoomOptions](#PanzoomOptions) |

---

### setStyle()

• **setStyle**: _function_

_Defined in [types.ts:255](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L255)_

A convenience method for setting prefixed styles on the Panzoom element

#### Signature with return type:

▸ (`name`: string, `value`: string): _void_

**Parameters:**

| Name    | Type   |
| ------- | ------ |
| `name`  | string |
| `value` | string |

---

### zoom()

• **zoom**: _function_

_Defined in [types.ts:264](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L264)_

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

_Defined in [types.ts:275](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L275)_

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

_Defined in [types.ts:286](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L286)_

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

_Defined in [types.ts:297](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L297)_

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a `pointermove` event on the Panzoom element's parent.

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

_Defined in [types.ts:326](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L326)_

Zoom the Panzoom element to a focal point using the given WheelEvent

This is a convenience function that may not handle all use cases.
Other cases should handroll solutions using the `zoomToPoint`
method or the `zoom` method's focal option.

**Note**: the focal point zooming pan adjustment is not affected by the `disablePan` option.

```js
// Bind to mousewheel
elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
// Bind to shift+mousewheel
elem.parentElement.addEventListener('wheel', function (event) {
  if (!event.shiftKey) return
  // Panzoom will automatically use `deltaX` here instead
  // of `deltaY`. On a mac, the shift modifier usually
  // translates to horizontal scrolling, but Panzoom assumes
  // the desired behavior is zooming.
  panzoom.zoomWithWheel(event)
})
```

#### Signature with return type:

▸ (`event`: WheelEvent, `zoomOptions?`: [ZoomOptions](#ZoomOptions)): _[CurrentValues](#CurrentValues)_

**Parameters:**

| Name           | Type                        |
| -------------- | --------------------------- |
| `event`        | WheelEvent                  |
| `zoomOptions?` | [ZoomOptions](#ZoomOptions) |

---

## `CurrentValues`

### `Optional` isSVG

• **isSVG**? : _boolean_

_Defined in [types.ts:203](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L203)_

---

### scale

• **scale**: _number_

_Defined in [types.ts:202](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L202)_

---

### x

• **x**: _number_

_Defined in [types.ts:200](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L200)_

---

### y

• **y**: _number_

_Defined in [types.ts:201](https://github.com/timmywil/panzoom/blob/3a0119e/src/types.ts#L201)_

## Events

The following events are available as custom events on the panzoom element using the native [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) API.
Add listeners the same way you would any other event.

```js
elem.addEventListener('panzoomchange', (event) => {
  console.log(event.detail) // => { x: 0, y: 0, scale: 1 }
})
```

### Notes about all events

- The event object passed as an argument to the listener will always have a `detail` property with the current `x`, `y`, and `scale` values.
- Events can be silenced when the `silent` option is set to `true`, either globally or when passed to `pan`, any `zoom` method, or `reset`.
- Avoid putting too much logic in these event handlers as it could effect the performance of panning or zooming.

### `"panzoomstart"`

Fired when the user starts a move or pinch zoom gesture on mobile.

### `"panzoomchange"`

Fired whenever there is a pan, zoom, or reset. Note that direct calls to `options.setTransform` do not fire this event.

### `"panzoomzoom"`

Fired whenever the zoom is changed by any Panzoom `zoom` method, directly or internally.

### `"panzoompan"`

Fired whenever the zoom is changed by the `pan` method, directly or internally.

### `"panzoomend"`

Fired when the user finishes a move or finishes a pinch zoom gesture on mobile.

### `"panzoomreset"`

Fired whenever reset is called.
