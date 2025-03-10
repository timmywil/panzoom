# Panzoom

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
<script src="https://unpkg.com/@panzoom/panzoom@4.6.0/dist/panzoom.min.js"></script>
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

# Documentation

## Panzoom()

> **Panzoom**(`elem`, `options`?): `[PanzoomObject](#PanzoomObject)`

Defined in: [panzoom.ts:60](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/panzoom.ts#L60)

## Parameters

### elem

`HTMLElement` | `SVGElement`

### options?

`[PanzoomGlobalOptions](#PanzoomGlobalOptions)`

## Returns

`[PanzoomObject](#PanzoomObject)`

## `PanzoomOptions`

Includes `MiscOptions`, `PanOptions`, and `ZoomOptions`

## MiscOptions

These options can be passed to `Panzoom()`, as well as any pan or zoom function. One exception is `force`, which can only be passed to methods like `pan()` or `zoom()`, but not `Panzoom()` or `setOptions()` as it should not be set globally.

Defined in: [types.ts:19](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L19)

## Indexable

\[`key`: `string`\]: `any`

## Properties

### animate?

> `optional` **animate**: `boolean` (Default: **false**)

Defined in: [types.ts:21](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L21)

Whether to animate transitions

---

### canvas?

> `optional` **canvas**: `boolean` (Default: **false**)

Defined in: [types.ts:32](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L32)

This option treats the Panzoom element's parent
as a canvas. Effectively, Panzoom binds the
down handler to the parent instead of the Panzoom
element, so that pointer events anywhere on the "canvas"
moves its children. See issue #472.

**Note**: setting this option to `true` also changes
where the `cursor` style is applied (i.e. the parent).

---

### duration?

> `optional` **duration**: `number` (Default: **200**)

Defined in: [types.ts:34](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L34)

Duration of the transition (ms)

---

### easing?

> `optional` **easing**: `string` (Default: **"ease-in-out"**)

Defined in: [types.ts:36](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L36)

CSS Easing used for transitions

---

### exclude?

> `optional` **exclude**: `Element`[] (Default: **[]**)

Defined in: [types.ts:43](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L43)

Add elements to this array that should be excluded
from Panzoom handling.
Ancestors of event targets are also checked.
e.g. links and buttons that should not propagate the click event.

---

### excludeClass?

> `optional` **excludeClass**: `string` (Default: **"panzoom-exclude"**)

Defined in: [types.ts:50](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L50)

Add this class to any element within the Panzoom element
that you want to exclude from Panzoom handling. That
element's children will also be excluded.
e.g. links and buttons that should not propagate the click event.

---

### force?

> `optional` **force**: `boolean`

Defined in: [types.ts:66](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L66)

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

### handleStartEvent()?

> `optional` **handleStartEvent**: (`event`) => `void` (Default: \*\*(e: Event) => {

    e.preventDefault()
    e.stopPropagation()

}\*\*)

Defined in: [types.ts:91](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L91)

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

#### Parameters

##### event

`Event`

#### Returns

`void`

---

### noBind?

> `optional` **noBind**: `boolean`

Defined in: [types.ts:95](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L95)

Skip binding the default Panzoom event listeners

---

### origin?

> `optional` **origin**: `string`

Defined in: [types.ts:109](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L109)

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

### overflow?

> `optional` **overflow**: `string` (Default: **"hidden"**)

Defined in: [types.ts:111](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L111)

The overflow CSS value for the parent. Defaults to 'hidden'

---

### pinchAndPan?

> `optional` **pinchAndPan**: `boolean` (Default: **false**)

Defined in: [types.ts:124](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L124)

Set to true to enable panning during pinch zoom.
Note: this is zooming to a point and panning in the same
frame. In other words, the zoom has not yet painted and
therefore the pan is working with old dimensions.
Essentially, it may be best to avoid using this option
when using contain.

Related issues:
https://github.com/timmywil/panzoom/issues/512
https://github.com/timmywil/panzoom/issues/606

---

### setTransform()?

> `optional` **setTransform**: (`elem`, `__namedParameters`, `_options`?) => `void`

Defined in: [types.ts:128](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L128)

Set the transform using the proper prefix.

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

#### Parameters

##### elem

`HTMLElement` | `SVGElement`

##### \_\_namedParameters

`CurrentValues`

##### \_options?

`PanzoomOptions`

#### Returns

`void`

---

### silent?

> `optional` **silent**: `boolean`

Defined in: [types.ts:130](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L130)

Silence all events

---

### startScale?

> `optional` **startScale**: `number` (Default: **1**)

Defined in: [types.ts:136](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L136)

Scale used to set the beginning transform

---

### startX?

> `optional` **startX**: `number` (Default: **0**)

Defined in: [types.ts:132](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L132)

X Value used to set the beginning transform

---

### startY?

> `optional` **startY**: `number` (Default: **0**)

Defined in: [types.ts:134](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L134)

Y Value used to set the beginning transform

---

### touchAction?

> `optional` **touchAction**: `string` (Default: **"none"**)

Defined in: [types.ts:146](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L146)

This value is used to set touch-action on both the
Panzoom element and its parent.
It is needed because that the native scroll on mobile
interferes with panning and pinch zooming.
Set this to empty string to re-enable scrolling
on mobile, but note that both scrolling and panning
cannot work at the same time.

## PanOptions (includes MiscOptions)

Defined in: [types.ts:151](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L151)

## Properties

### contain?

> `optional` **contain**: `"inside"` \| `"outside"`

Defined in: [types.ts:165](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L165)

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

### cursor?

> `optional` **cursor**: `string` (Default: **"move"**)

Defined in: [types.ts:167](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L167)

The cursor style to set on the panzoom element

---

### disablePan?

> `optional` **disablePan**: `boolean` (Default: **false**)

Defined in: [types.ts:173](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L173)

Disable panning functionality.
Note: disablePan does not affect focal point zooming or the contain option.
The element will still pan accordingly.

---

### disableXAxis?

> `optional` **disableXAxis**: `boolean` (Default: **false**)

Defined in: [types.ts:175](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L175)

Pan only on the Y axis

---

### disableYAxis?

> `optional` **disableYAxis**: `boolean` (Default: **false**)

Defined in: [types.ts:177](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L177)

Pan only on the X axis

---

### panOnlyWhenZoomed?

> `optional` **panOnlyWhenZoomed**: `boolean` (Default: **false**)

Defined in: [types.ts:181](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L181)

Disable panning while the scale is equal to the starting value

---

### relative?

> `optional` **relative**: `boolean` (Default: **false**)

Defined in: [types.ts:179](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L179)

When passing x and y values to .pan(), treat the values as relative to their current values

---

### roundPixels?

> `optional` **roundPixels**: `boolean`

Defined in: [types.ts:190](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L190)

Round x and y values to whole numbers.
This can help prevent images and text from looking blurry,
but the higher the scale, the more it becomes
necessary to use fractional pixels.
Use your own judgment on how much to limit
zooming in when using this option.

## ZoomOptions (includes MiscOptions)

Defined in: [types.ts:193](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L193)

## Properties

### disableZoom?

> `optional` **disableZoom**: `boolean` (Default: **false**)

Defined in: [types.ts:195](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L195)

Disable zooming functionality

---

### focal?

> `optional` **focal**: `object`

Defined in: [types.ts:202](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L202)

Zoom to the given point on the panzoom element.
This point is expected to be relative to
the panzoom element's dimensions and is unrelated
to the parent dimensions.

#### x

> **x**: `number`

#### y

> **y**: `number`

---

### maxScale?

> `optional` **maxScale**: `number` (Default: **4**)

Defined in: [types.ts:206](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L206)

The maximum scale when zooming

---

### minScale?

> `optional` **minScale**: `number` (Default: **0.125**)

Defined in: [types.ts:204](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L204)

The minimum scale when zooming

---

### step?

> `optional` **step**: `number` (Default: **0.3**)

Defined in: [types.ts:208](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L208)

The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut

## PanzoomObject

These methods are available after initializing Panzoom.

Defined in: [types.ts:225](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L225)

## Properties

### bind()

> **bind**: () => `void`

Defined in: [types.ts:238](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L238)

Bind the default down, move, and up event listeners to the Panzoom element.
This does not normally need to be called.
It gets called by default when creating a new Panzoom object,
but can be skipped with the `noBind` option.

```js
const panzoom = Panzoom(elem, { noBind: true })
// ...
panzoom.bind()
```

#### Returns

`void`

---

### destroy()

> **destroy**: () => `void`

Defined in: [types.ts:240](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L240)

Remove all event listeners bound to the the Panzoom element

#### Returns

`void`

---

### eventNames

> **eventNames**: `object`

Defined in: [types.ts:246](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L246)

This object exposes the event names used by Panzoom,
depending on the current browser's support for
Pointer or Touch events.

#### down

> **down**: `string`

#### move

> **move**: `string`

#### up

> **up**: `string`

---

### getOptions()

> **getOptions**: () => `PanzoomOptions`

Defined in: [types.ts:252](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L252)

Returns a _copy_ of the current options object

#### Returns

`PanzoomOptions`

---

### getPan()

> **getPan**: () => `object`

Defined in: [types.ts:248](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L248)

Get the current x/y translation

#### Returns

`object`

##### x

> **x**: `number`

##### y

> **y**: `number`

---

### getScale()

> **getScale**: () => `number`

Defined in: [types.ts:250](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L250)

Get the current scale

#### Returns

`number`

---

### handleDown()

> **handleDown**: (`event`) => `void`

Defined in: [types.ts:274](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L274)

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

#### Parameters

##### event

`PointerEvent`

#### Returns

`void`

---

### handleMove()

> **handleMove**: (`event`) => `void`

Defined in: [types.ts:275](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L275)

#### Parameters

##### event

`PointerEvent`

#### Returns

`void`

---

### handleUp()

> **handleUp**: (`event`) => `void`

Defined in: [types.ts:276](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L276)

#### Parameters

##### event

`PointerEvent`

#### Returns

`void`

---

### pan()

> **pan**: (`x`, `y`, `panOptions`?) => `[CurrentValues](#CurrentValues)`

Defined in: [types.ts:287](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L287)

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100)
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true })
```

#### Parameters

##### x

`string` | `number`

##### y

`string` | `number`

##### panOptions?

`PanOptions`

#### Returns

`[CurrentValues](#CurrentValues)`

---

### reset()

> **reset**: (`resetOptions`?) => `[CurrentValues](#CurrentValues)`

Defined in: [types.ts:300](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L300)

Reset the pan and zoom to startX, startY, and startScale.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.
Reset ignores the `disablePan`, `disableZoom`, and `panOnlyWhenZoomed` options.
Pass `{ force: false }` to override.

```js
panzoom.reset()
panzoom.reset({ animate: false })
```

#### Parameters

##### resetOptions?

`PanzoomOptions`

#### Returns

`[CurrentValues](#CurrentValues)`

---

### resetStyle()

> **resetStyle**: () => `void`

Defined in: [types.ts:309](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L309)

Reset the styles set on the Panzoom element
and its parent (such as overflow, cursor, etc.)

```js
panzoom.resetStyle()
```

#### Returns

`void`

---

### setOptions()

> **setOptions**: (`options`?) => `void`

Defined in: [types.ts:322](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L322)

Change any number of options on a Panzoom instance.
Setting some options will have side-effects.
For instance, changing the cursor option
will also set the cursor style.

```js
const panzoom = Panzoom(elem, { cursor: 'move' })
// ...
panzoom.setOptions({ cursor: 'default' })
```

#### Parameters

##### options?

`PanzoomGlobalOptions`

#### Returns

`void`

---

### setStyle()

> **setStyle**: (`name`, `value`) => `void`

Defined in: [types.ts:324](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L324)

A convenience method for setting prefixed styles on the Panzoom element

#### Parameters

##### name

`string`

##### value

`string`

#### Returns

`void`

---

### zoom()

> **zoom**: (`scale`, `zoomOptions`?) => `[CurrentValues](#CurrentValues)`

Defined in: [types.ts:333](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L333)

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

#### Parameters

##### scale

`number`

##### zoomOptions?

`ZoomOptions`

#### Returns

`[CurrentValues](#CurrentValues)`

---

### zoomIn()

> **zoomIn**: (`zoomOptions`?) => `[CurrentValues](#CurrentValues)`

Defined in: [types.ts:344](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L344)

Zoom in using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomIn()
panzoom.zoomIn({ animate: false })
```

#### Parameters

##### zoomOptions?

`ZoomOptions`

#### Returns

`[CurrentValues](#CurrentValues)`

---

### zoomOut()

> **zoomOut**: (`zoomOptions`?) => `[CurrentValues](#CurrentValues)`

Defined in: [types.ts:355](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L355)

Zoom out using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomOut()
panzoom.zoomOut({ animate: false })
```

#### Parameters

##### zoomOptions?

`ZoomOptions`

#### Returns

`[CurrentValues](#CurrentValues)`

---

### zoomToPoint()

> **zoomToPoint**: (`scale`, `point`, `zoomOptions`?) => `[CurrentValues](#CurrentValues)`

Defined in: [types.ts:366](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L366)

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a `pointermove` event on the Panzoom element's parent.

```js
panzoom.zoomToPoint(1.2, pointerEvent)
```

#### Parameters

##### scale

`number`

##### point

###### clientX

`number`

###### clientY

`number`

##### zoomOptions?

`ZoomOptions`

#### Returns

`[CurrentValues](#CurrentValues)`

---

### zoomWithWheel()

> **zoomWithWheel**: (`event`, `zoomOptions`?) => `[CurrentValues](#CurrentValues)`

Defined in: [types.ts:399](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L399)

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

#### Parameters

##### event

`WheelEvent`

##### zoomOptions?

`ZoomOptions`

#### Returns

`[CurrentValues](#CurrentValues)`

## $1

Defined in: [types.ts:218](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L218)

## Properties

### isSVG?

> `optional` **isSVG**: `boolean`

Defined in: [types.ts:222](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L222)

---

### scale

> **scale**: `number`

Defined in: [types.ts:221](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L221)

---

### x

> **x**: `number`

Defined in: [types.ts:219](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L219)

---

### y

> **y**: `number`

Defined in: [types.ts:220](https://github.com/m-kawafuji/panzoom/blob/e6354291163689eb81f16ed3bc852ed292271283/src/types.ts#L220)

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
