# Panzoom

[![Build Status](https://travis-ci.org/timmywil/panzoom.png?branch=main)](https://travis-ci.org/timmywil/panzoom)

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

With a script tag from a CDN:

```html
<script src="https://unpkg.com/@panzoom/panzoom@4.5.1/dist/panzoom.min.js"></script>
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

4\. I'm using Panzoom with SVG text elements and am seeing some [weird text resizing](https://github.com/timmywil/panzoom/issues/593). How do I fix this?

Add `text-rendering="geometricPrecision"` to your `<text>` elements.

```xml
<text text-rendering="geometricPrecision" x="40" y="120">Hello World</text>
```

5\. I'm using Panzoom on a canvas element that renders a PDF. How do I avoid the PDF getting blurry when scaled?

See this [stackoverflow question](https://stackoverflow.com/questions/70428922/pan-zoom-a-pdf-javascript/70501465)

---

## Documentation

### Panzoom

▸ **Panzoom**(`elem`, `options?`): `[PanzoomObject](#PanzoomObject)`

#### Parameters

| Name       | Type                                                    |
| :--------- | :------------------------------------------------------ |
| `elem`     | `HTMLElement` \| `SVGElement`                           |
| `options?` | `Omit`<`[PanzoomOptions](#PanzoomOptions)`, `"force"`\> |

#### Returns

`[PanzoomObject](#PanzoomObject)`

#### Defined in

[panzoom.ts:59](https://github.com/timmywil/panzoom/blob/8205b07/src/panzoom.ts#L59)

## `PanzoomOptions`

Includes `MiscOptions`, `PanOptions`, and `ZoomOptions`

## MiscOptions

These options can be passed to `Panzoom()`, as well as any pan or zoom function. One exception is `force`, which can only be passed to methods like `pan()` or `zoom()`, but not `Panzoom()` or `setOptions()` as it should not be set globally.

### animate

• `Optional` **animate**: `boolean` (Default: **false**)

Whether to animate transitions

#### Defined in

[types.ts:21](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L21)

### canvas

• `Optional` **canvas**: `boolean` (Default: **false**)

This option treats the Panzoom element's parent
as a canvas. Effectively, Panzoom binds the
down handler to the parent instead of the Panzoom
element, so that pointer events anywhere on the "canvas"
moves its children. See issue #472.

**Note**: setting this option to `true` also changes
where the `cursor` style is applied (i.e. the parent).

#### Defined in

[types.ts:32](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L32)

### duration

• `Optional` **duration**: `number` (Default: **200**)

Duration of the transition (ms)

#### Defined in

[types.ts:34](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L34)

### easing

• `Optional` **easing**: `string` (Default: **"ease-in-out"**)

CSS Easing used for transitions

#### Defined in

[types.ts:36](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L36)

### exclude

• `Optional` **exclude**: `Element`[] (Default: **[]**)

Add elements to this array that should be excluded
from Panzoom handling.
Ancestors of event targets are also checked.
e.g. links and buttons that should not propagate the click event.

#### Defined in

[types.ts:43](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L43)

### excludeClass

• `Optional` **excludeClass**: `string` (Default: **"panzoom-exclude"**)

Add this class to any element within the Panzoom element
that you want to exclude from Panzoom handling. That
element's children will also be excluded.
e.g. links and buttons that should not propagate the click event.

#### Defined in

[types.ts:50](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L50)

### force

• `Optional` **force**: `boolean`

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

#### Defined in

[types.ts:66](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L66)

### handleStartEvent

• `Optional` **handleStartEvent**: (`event`: `Event`) => `void` (Default: **(e: Event) => {
e.preventDefault()
e.stopPropagation()
}**)

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

##### Parameters

| Name    | Type    |
| :------ | :------ |
| `event` | `Event` |

##### Returns

`void`

#### Defined in

[types.ts:91](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L91)

### noBind

• `Optional` **noBind**: `boolean`

Skip binding the default Panzoom event listeners

#### Defined in

[types.ts:95](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L95)

### origin

• `Optional` **origin**: `string`

**Change this at your own risk.**
The `transform-origin` is the origin from which transforms are applied.
Default: `'50% 50%'` for HTML and `'0 0'` for SVG.
The defaults are set because changing the `transform-origin` on
SVG elements doesn't work in IE.

Changing this should work with many things, but
it will break focal point zooming, which assumes the
defaults are set to do the more complicated calculations.

And again, changing this for SVG in IE doesn't work at all.

#### Defined in

[types.ts:109](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L109)

### overflow

• `Optional` **overflow**: `string` (Default: **"hidden"**)

The overflow CSS value for the parent. Defaults to 'hidden'

#### Defined in

[types.ts:111](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L111)

### pinchAndPan

• `Optional` **pinchAndPan**: `boolean` (Default: **false**)

Set to true to enable panning during pinch zoom.
Note: this is zooming to a point and panning in the same
frame. In other words, the zoom has not yet painted and
therefore the pan is working with old dimensions.
Essentially, it may be best to avoid using this option
when using contain.

Related issues:
https://github.com/timmywil/panzoom/issues/512
https://github.com/timmywil/panzoom/issues/606

#### Defined in

[types.ts:124](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L124)

### setTransform

• `Optional` **setTransform**: (`elem`: `HTMLElement` \| `SVGElement`, `__namedParameters`: `CurrentValues`, `_options?`: `PanzoomOptions`) => `void`

Set the transform using the proper prefix

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

##### Parameters

| Name                | Type                          |
| :------------------ | :---------------------------- |
| `elem`              | `HTMLElement` \| `SVGElement` |
| `__namedParameters` | `CurrentValues`               |
| `_options?`         | `PanzoomOptions`              |

##### Returns

`void`

#### Defined in

[types.ts:128](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L128)

### silent

• `Optional` **silent**: `boolean`

Silence all events

#### Defined in

[types.ts:130](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L130)

### startScale

• `Optional` **startScale**: `number` (Default: **1**)

Scale used to set the beginning transform

#### Defined in

[types.ts:136](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L136)

### startX

• `Optional` **startX**: `number` (Default: **0**)

X Value used to set the beginning transform

#### Defined in

[types.ts:132](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L132)

### startY

• `Optional` **startY**: `number` (Default: **0**)

Y Value used to set the beginning transform

#### Defined in

[types.ts:134](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L134)

### touchAction

• `Optional` **touchAction**: `string` (Default: **"none"**)

This value is used to set touch-action on both the
Panzoom element and its parent.
It is needed because that the native scroll on mobile
interferes with panning and pinch zooming.
Set this to empty string to re-enable scrolling
on mobile, but note that both scrolling and panning
cannot work at the same time.

#### Defined in

[types.ts:146](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L146)

## PanOptions (includes MiscOptions)

### contain

• `Optional` **contain**: `"inside"` \| `"outside"`

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

#### Defined in

[types.ts:165](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L165)

### cursor

• `Optional` **cursor**: `string` (Default: **"move"**)

The cursor style to set on the panzoom element

#### Defined in

[types.ts:167](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L167)

### disablePan

• `Optional` **disablePan**: `boolean` (Default: **false**)

Disable panning functionality.
Note: disablePan does not affect focal point zooming or the contain option.
The element will still pan accordingly.

#### Defined in

[types.ts:173](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L173)

### disableXAxis

• `Optional` **disableXAxis**: `boolean` (Default: **false**)

Pan only on the Y axis

#### Defined in

[types.ts:175](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L175)

### disableYAxis

• `Optional` **disableYAxis**: `boolean` (Default: **false**)

Pan only on the X axis

#### Defined in

[types.ts:177](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L177)

### panOnlyWhenZoomed

• `Optional` **panOnlyWhenZoomed**: `boolean` (Default: **false**)

Disable panning while the scale is equal to the starting value

#### Defined in

[types.ts:181](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L181)

### relative

• `Optional` **relative**: `boolean` (Default: **false**)

When passing x and y values to .pan(), treat the values as relative to their current values

#### Defined in

[types.ts:179](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L179)

### roundPixels

• `Optional` **roundPixels**: `boolean`

Round x and y values to whole numbers.
This can help prevent images and text from looking blurry,
but the higher the scale, the more it becomes
necessary to use fractional pixels.
Use your own judgment on how much to limit
zooming in when using this option.

#### Defined in

[types.ts:190](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L190)

## ZoomOptions (includes MiscOptions)

### disableZoom

• `Optional` **disableZoom**: `boolean` (Default: **false**)

Disable zooming functionality

#### Defined in

[types.ts:195](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L195)

### focal

• `Optional` **focal**: `Object`

Zoom to the given point on the panzoom element.
This point is expected to be relative to
the panzoom element's dimensions and is unrelated
to the parent dimensions.

#### Type declaration

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

#### Defined in

[types.ts:202](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L202)

### maxScale

• `Optional` **maxScale**: `number` (Default: **4**)

The maximum scale when zooming

#### Defined in

[types.ts:206](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L206)

### minScale

• `Optional` **minScale**: `number` (Default: **0.125**)

The minimum scale when zooming

#### Defined in

[types.ts:204](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L204)

### step

• `Optional` **step**: `number` (Default: **0.3**)

The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut

#### Defined in

[types.ts:208](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L208)

## PanzoomObject

These methods are available after initializing Panzoom.

### bind

• **bind**: () => `void`

Bind the default down, move, and up event listeners to the Panzoom element.
This does not normally need to be called.
It gets called by default when creating a new Panzoom object,
but can be skipped with the `noBind` option.

```js
const panzoom = Panzoom(elem, { noBind: true })
// ...
panzoom.bind()
```

##### Returns

`void`

#### Defined in

[types.ts:235](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L235)

### destroy

• **destroy**: () => `void`

Remove all event listeners bound to the the Panzoom element

##### Returns

`void`

#### Defined in

[types.ts:237](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L237)

### eventNames

• **eventNames**: `Object`

This object exposes the event names used by Panzoom,
depending on the current browser's support for
Pointer or Touch events.

#### Type declaration

| Name   | Type     |
| :----- | :------- |
| `down` | `string` |
| `move` | `string` |
| `up`   | `string` |

#### Defined in

[types.ts:243](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L243)

### getOptions

• **getOptions**: () => `PanzoomOptions`

Returns a _copy_ of the current options object

##### Returns

`PanzoomOptions`

#### Defined in

[types.ts:249](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L249)

### getPan

• **getPan**: () => { `x`: `number` ; `y`: `number` }

Get the current x/y translation

##### Returns

`Object`

| Name | Type     |
| :--- | :------- |
| `x`  | `number` |
| `y`  | `number` |

#### Defined in

[types.ts:245](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L245)

### getScale

• **getScale**: () => `number`

Get the current scale

##### Returns

`number`

#### Defined in

[types.ts:247](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L247)

### handleDown

• **handleDown**: (`event`: `PointerEvent`) => `void`

handleDown, handleMove, and handleUp
are the exact event handlers that Panzoom
binds to pointer events. They are exposed
in case you prefer to bind your own events
or extend them.
Note that move and up are bound to the document,
not the Panzoom element. Only the down event
is bound to the Panzoom element.
To avoid double-binding, also set noBind to true.

```js
const panzoom = Panzoom(elem, { noBind: true })
elem.addEventListener('pointerdown', (event) => {
  console.log(event)
  panzoom.handleDown(event)
})
document.addEventListener('pointermove', panzoom.handleMove)
document.addEventListener('pointerup', panzoom.handleUp)
```

##### Parameters

| Name    | Type           |
| :------ | :------------- |
| `event` | `PointerEvent` |

##### Returns

`void`

#### Defined in

[types.ts:271](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L271)

### handleMove

• **handleMove**: (`event`: `PointerEvent`) => `void`

##### Parameters

| Name    | Type           |
| :------ | :------------- |
| `event` | `PointerEvent` |

##### Returns

`void`

#### Defined in

[types.ts:272](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L272)

### handleUp

• **handleUp**: (`event`: `PointerEvent`) => `void`

##### Parameters

| Name    | Type           |
| :------ | :------------- |
| `event` | `PointerEvent` |

##### Returns

`void`

#### Defined in

[types.ts:273](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L273)

### pan

• **pan**: (`x`: `string` \| `number`, `y`: `string` \| `number`, `panOptions?`: `PanOptions`) => `[CurrentValues](#CurrentValues)`

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100)
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true })
```

##### Parameters

| Name          | Type                 |
| :------------ | :------------------- |
| `x`           | `string` \| `number` |
| `y`           | `string` \| `number` |
| `panOptions?` | `PanOptions`         |

##### Returns

`[CurrentValues](#CurrentValues)`

#### Defined in

[types.ts:284](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L284)

### reset

• **reset**: (`resetOptions?`: `PanzoomOptions`) => `[CurrentValues](#CurrentValues)`

Reset the pan and zoom to startX, startY, and startScale.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.
Reset ignores the `disablePan`, `disableZoom`, and `panOnlyWhenZoomed` options.
Pass `{ force: false }` to override.

```js
panzoom.reset()
panzoom.reset({ animate: false })
```

##### Parameters

| Name            | Type             |
| :-------------- | :--------------- |
| `resetOptions?` | `PanzoomOptions` |

##### Returns

`[CurrentValues](#CurrentValues)`

#### Defined in

[types.ts:297](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L297)

### resetStyle

• **resetStyle**: () => `void`

Reset the styles set on the Panzoom element
and its parent (such as overflow, cursor, etc.)

```js
panzoom.resetStyle()
```

##### Returns

`void`

#### Defined in

[types.ts:306](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L306)

### setOptions

• **setOptions**: (`options?`: `PanzoomOptions`) => `void`

Change any number of options on a Panzoom instance.
Setting some options will have side-effects.
For instance, changing the cursor option
will also set the cursor style.

```js
const panzoom = Panzoom(elem, { cursor: 'move' })
// ...
panzoom.setOptions({ cursor: 'default' })
```

##### Parameters

| Name       | Type             |
| :--------- | :--------------- |
| `options?` | `PanzoomOptions` |

##### Returns

`void`

#### Defined in

[types.ts:319](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L319)

### setStyle

• **setStyle**: (`name`: `string`, `value`: `string`) => `void`

A convenience method for setting prefixed styles on the Panzoom element

##### Parameters

| Name    | Type     |
| :------ | :------- |
| `name`  | `string` |
| `value` | `string` |

##### Returns

`void`

#### Defined in

[types.ts:321](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L321)

### zoom

• **zoom**: (`scale`: `number`, `zoomOptions?`: `ZoomOptions`) => `[CurrentValues](#CurrentValues)`

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

##### Parameters

| Name           | Type          |
| :------------- | :------------ |
| `scale`        | `number`      |
| `zoomOptions?` | `ZoomOptions` |

##### Returns

`[CurrentValues](#CurrentValues)`

#### Defined in

[types.ts:330](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L330)

### zoomIn

• **zoomIn**: (`zoomOptions?`: `ZoomOptions`) => `[CurrentValues](#CurrentValues)`

Zoom in using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomIn()
panzoom.zoomIn({ animate: false })
```

##### Parameters

| Name           | Type          |
| :------------- | :------------ |
| `zoomOptions?` | `ZoomOptions` |

##### Returns

`[CurrentValues](#CurrentValues)`

#### Defined in

[types.ts:341](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L341)

### zoomOut

• **zoomOut**: (`zoomOptions?`: `ZoomOptions`) => `[CurrentValues](#CurrentValues)`

Zoom out using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomOut()
panzoom.zoomOut({ animate: false })
```

##### Parameters

| Name           | Type          |
| :------------- | :------------ |
| `zoomOptions?` | `ZoomOptions` |

##### Returns

`[CurrentValues](#CurrentValues)`

#### Defined in

[types.ts:352](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L352)

### zoomToPoint

• **zoomToPoint**: (`scale`: `number`, `point`: { `clientX`: `number` ; `clientY`: `number` }, `zoomOptions?`: `ZoomOptions`) => `[CurrentValues](#CurrentValues)`

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a `pointermove` event on the Panzoom element's parent.

```js
panzoom.zoomToPoint(1.2, pointerEvent)
```

##### Parameters

| Name            | Type          |
| :-------------- | :------------ |
| `scale`         | `number`      |
| `point`         | `Object`      |
| `point.clientX` | `number`      |
| `point.clientY` | `number`      |
| `zoomOptions?`  | `ZoomOptions` |

##### Returns

`[CurrentValues](#CurrentValues)`

#### Defined in

[types.ts:363](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L363)

### zoomWithWheel

• **zoomWithWheel**: (`event`: `WheelEvent`, `zoomOptions?`: `ZoomOptions`) => `[CurrentValues](#CurrentValues)`

Zoom the Panzoom element to a focal point using the given WheelEvent

This is a convenience function that may not handle all use cases.
Other cases should handroll solutions using the `zoomToPoint`
method or the `zoom` method's focal option.

**Notes**:

- the focal point zooming pan adjustment is
  not affected by the `disablePan` option.
- animate should not be used when zooming with the wheel,
  and is therefore always disabled.

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

##### Parameters

| Name           | Type          |
| :------------- | :------------ |
| `event`        | `WheelEvent`  |
| `zoomOptions?` | `ZoomOptions` |

##### Returns

`[CurrentValues](#CurrentValues)`

#### Defined in

[types.ts:396](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L396)

## CurrentValues

### isSVG

• `Optional` **isSVG**: `boolean`

#### Defined in

[types.ts:219](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L219)

### scale

• **scale**: `number`

#### Defined in

[types.ts:218](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L218)

### x

• **x**: `number`

#### Defined in

[types.ts:216](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L216)

### y

• **y**: `number`

#### Defined in

[types.ts:217](https://github.com/timmywil/panzoom/blob/8205b07/src/types.ts#L217)

## Events

The following events are available as custom events on the panzoom element using the native [CustomEvent](https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent) API.
Add listeners the same way you would any other event.

```js
elem.addEventListener('panzoomchange', (event) => {
  console.log(event.detail) // => { x: 0, y: 0, scale: 1 }
})
```

### Notes about all events

- The event object passed as an argument to the listener will always have a `detail` object with the following properties:
  - The current `x` value
  - The current `y` value
  - The current `scale`
  - An `originalEvent` property with the original event that triggered the panzoom event, if applicable. For example, the `originalEvent` property for a `panzoomstart` event would be either a `pointerdown`, `touchstart`, or `mousedown` event.
- Events can be silenced when the `silent` option is set to `true`, either globally or when passed to `pan`, any `zoom` method, or `reset`.
- Avoid putting too much logic in these event handlers as it could effect the performance of panning or zooming.

### `"panzoomstart"`

Fired when the user starts a move or pinch zoom gesture on mobile.

### `"panzoomchange"`

Fired whenever there is a pan, zoom, or reset. Note that direct calls to `options.setTransform` do not fire this event.

### `"panzoomzoom"`

Fired whenever the zoom is changed by any Panzoom `zoom` method, directly or internally.

### `"panzoompan"`

Fired whenever the pan is changed by the `pan` method, directly or internally.

### `"panzoomend"`

Fired when the user finishes a move or finishes a pinch zoom gesture on mobile.

### `"panzoomreset"`

Fired whenever reset is called.
