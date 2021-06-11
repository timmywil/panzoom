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

### Panzoom

▸ **Panzoom**(`elem`, `options?`): [PanzoomObject](#PanzoomObject)

#### Parameters

| Name       | Type                                                  |
| :--------- | :---------------------------------------------------- |
| `elem`     | `HTMLElement` \| `SVGElement`                         |
| `options?` | `Omit`<[PanzoomOptions](#PanzoomOptions), `"force"`\> |

#### Returns

[PanzoomObject](#PanzoomObject)

#### Defined in

[panzoom.ts:58](https://github.com/timmywil/panzoom/blob/22fb0b3/src/panzoom.ts#L58)

## `PanzoomOptions`

Includes `MiscOptions`, `PanOptions`, and `ZoomOptions`

## MiscOptions

These options can be passed to `Panzoom()`, as well as any pan or zoom function. One exception is `force`, which can only be passed to methods like `pan()` or `zoom()`, but not `Panzoom()` or `setOptions()` as it should not be set globally.

### animate

• `Optional` **animate**: `boolean` (Default: **false**)

Whether to animate transitions

#### Defined in

[types.ts:21](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L21)

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

[types.ts:32](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L32)

### duration

• `Optional` **duration**: `number` (Default: **200**)

Duration of the transition (ms)

#### Defined in

[types.ts:34](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L34)

### easing

• `Optional` **easing**: `string` (Default: **"ease-in-out"**)

CSS Easing used for transitions

#### Defined in

[types.ts:36](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L36)

### exclude

• `Optional` **exclude**: `Element`[] (Default: **[]**)

Add elements to this array that should be excluded
from Panzoom handling.
Ancestors of event targets are also checked.
e.g. links and buttons that should not propagate the click event.

#### Defined in

[types.ts:43](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L43)

### excludeClass

• `Optional` **excludeClass**: `string` (Default: **"panzoom-exclude"**)

Add this class to any element within the Panzoom element
that you want to exclude from Panzoom handling. That
element's children will also be excluded.
e.g. links and buttons that should not propagate the click event.

#### Defined in

[types.ts:50](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L50)

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

[types.ts:66](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L66)

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

[types.ts:91](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L91)

### noBind

• `Optional` **noBind**: `boolean`

Skip binding the default Panzoom event listeners

#### Defined in

[types.ts:95](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L95)

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

[types.ts:109](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L109)

### overflow

• `Optional` **overflow**: `string` (Default: **"hidden"**)

The overflow CSS value for the parent. Defaults to 'hidden'

#### Defined in

[types.ts:111](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L111)

### setTransform

• `Optional` **setTransform**: (`elem`: `HTMLElement` \| `SVGElement`, `__namedParameters`: CurrentValues, `_options?`: PanzoomOptions) => `void`

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

Set the transform using the proper prefix

##### Parameters

| Name                | Type                          |
| :------------------ | :---------------------------- |
| `elem`              | `HTMLElement` \| `SVGElement` |
| `__namedParameters` | CurrentValues                 |
| `_options?`         | PanzoomOptions                |

##### Returns

`void`

#### Defined in

[types.ts:129](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L129)

### silent

• `Optional` **silent**: `boolean`

Silence all events

#### Defined in

[types.ts:131](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L131)

### startScale

• `Optional` **startScale**: `number` (Default: **1**)

Scale used to set the beginning transform

#### Defined in

[types.ts:137](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L137)

### startX

• `Optional` **startX**: `number` (Default: **0**)

X Value used to set the beginning transform

#### Defined in

[types.ts:133](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L133)

### startY

• `Optional` **startY**: `number` (Default: **0**)

Y Value used to set the beginning transform

#### Defined in

[types.ts:135](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L135)

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

[types.ts:147](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L147)

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

[types.ts:166](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L166)

### cursor

• `Optional` **cursor**: `string` (Default: **"move"**)

The cursor style to set on the panzoom element

#### Defined in

[types.ts:168](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L168)

### disablePan

• `Optional` **disablePan**: `boolean` (Default: **false**)

Disable panning functionality.
Note: disablePan does not affect focal point zooming or the contain option.
The element will still pan accordingly.

#### Defined in

[types.ts:174](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L174)

### disableXAxis

• `Optional` **disableXAxis**: `boolean` (Default: **false**)

Pan only on the Y axis

#### Defined in

[types.ts:176](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L176)

### disableYAxis

• `Optional` **disableYAxis**: `boolean` (Default: **false**)

Pan only on the X axis

#### Defined in

[types.ts:178](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L178)

### panOnlyWhenZoomed

• `Optional` **panOnlyWhenZoomed**: `boolean` (Default: **false**)

Disable panning while the scale is equal to the starting value

#### Defined in

[types.ts:182](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L182)

### relative

• `Optional` **relative**: `boolean` (Default: **false**)

When passing x and y values to .pan(), treat the values as relative to their current values

#### Defined in

[types.ts:180](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L180)

## ZoomOptions (includes MiscOptions)

### disableZoom

• `Optional` **disableZoom**: `boolean` (Default: **false**)

Disable zooming functionality

#### Defined in

[types.ts:187](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L187)

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

[types.ts:194](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L194)

### maxScale

• `Optional` **maxScale**: `number` (Default: **4**)

The maximum scale when zooming

#### Defined in

[types.ts:198](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L198)

### minScale

• `Optional` **minScale**: `number` (Default: **0.125**)

The minimum scale when zooming

#### Defined in

[types.ts:196](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L196)

### step

• `Optional` **step**: `number` (Default: **0.3**)

The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut

#### Defined in

[types.ts:200](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L200)

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

[types.ts:227](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L227)

### destroy

• **destroy**: () => `void`

Remove all event listeners bound to the the Panzoom element

##### Returns

`void`

#### Defined in

[types.ts:229](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L229)

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

[types.ts:235](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L235)

### getOptions

• **getOptions**: () => PanzoomOptions

Returns a _copy_ of the current options object

##### Returns

PanzoomOptions

#### Defined in

[types.ts:241](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L241)

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

[types.ts:237](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L237)

### getScale

• **getScale**: () => `number`

Get the current scale

##### Returns

`number`

#### Defined in

[types.ts:239](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L239)

### pan

• **pan**: (`x`: `string` \| `number`, `y`: `string` \| `number`, `panOptions?`: PanOptions) => [CurrentValues](#CurrentValues)

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
| `panOptions?` | PanOptions           |

##### Returns

[CurrentValues](#CurrentValues)

#### Defined in

[types.ts:252](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L252)

### reset

• **reset**: (`resetOptions?`: PanzoomOptions) => [CurrentValues](#CurrentValues)

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

| Name            | Type           |
| :-------------- | :------------- |
| `resetOptions?` | PanzoomOptions |

##### Returns

[CurrentValues](#CurrentValues)

#### Defined in

[types.ts:265](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L265)

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

[types.ts:274](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L274)

### setOptions

• **setOptions**: (`options?`: PanzoomOptions) => `void`

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

| Name       | Type           |
| :--------- | :------------- |
| `options?` | PanzoomOptions |

##### Returns

`void`

#### Defined in

[types.ts:287](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L287)

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

[types.ts:289](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L289)

### zoom

• **zoom**: (`scale`: `number`, `zoomOptions?`: ZoomOptions) => [CurrentValues](#CurrentValues)

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

##### Parameters

| Name           | Type        |
| :------------- | :---------- |
| `scale`        | `number`    |
| `zoomOptions?` | ZoomOptions |

##### Returns

[CurrentValues](#CurrentValues)

#### Defined in

[types.ts:298](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L298)

### zoomIn

• **zoomIn**: (`zoomOptions?`: ZoomOptions) => [CurrentValues](#CurrentValues)

Zoom in using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomIn()
panzoom.zoomIn({ animate: false })
```

##### Parameters

| Name           | Type        |
| :------------- | :---------- |
| `zoomOptions?` | ZoomOptions |

##### Returns

[CurrentValues](#CurrentValues)

#### Defined in

[types.ts:309](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L309)

### zoomOut

• **zoomOut**: (`zoomOptions?`: ZoomOptions) => [CurrentValues](#CurrentValues)

Zoom out using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomOut()
panzoom.zoomOut({ animate: false })
```

##### Parameters

| Name           | Type        |
| :------------- | :---------- |
| `zoomOptions?` | ZoomOptions |

##### Returns

[CurrentValues](#CurrentValues)

#### Defined in

[types.ts:320](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L320)

### zoomToPoint

• **zoomToPoint**: (`scale`: `number`, `point`: { `clientX`: `number` ; `clientY`: `number` }, `zoomOptions?`: ZoomOptions) => [CurrentValues](#CurrentValues)

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a `pointermove` event on the Panzoom element's parent.

```js
panzoom.zoomToPoint(1.2, pointerEvent)
```

##### Parameters

| Name            | Type        |
| :-------------- | :---------- |
| `scale`         | `number`    |
| `point`         | `Object`    |
| `point.clientX` | `number`    |
| `point.clientY` | `number`    |
| `zoomOptions?`  | ZoomOptions |

##### Returns

[CurrentValues](#CurrentValues)

#### Defined in

[types.ts:331](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L331)

### zoomWithWheel

• **zoomWithWheel**: (`event`: `WheelEvent`, `zoomOptions?`: ZoomOptions) => [CurrentValues](#CurrentValues)

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

##### Parameters

| Name           | Type         |
| :------------- | :----------- |
| `event`        | `WheelEvent` |
| `zoomOptions?` | ZoomOptions  |

##### Returns

[CurrentValues](#CurrentValues)

#### Defined in

[types.ts:360](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L360)

## CurrentValues

### isSVG

• `Optional` **isSVG**: `boolean`

#### Defined in

[types.ts:211](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L211)

### scale

• **scale**: `number`

#### Defined in

[types.ts:210](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L210)

### x

• **x**: `number`

#### Defined in

[types.ts:208](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L208)

### y

• **y**: `number`

#### Defined in

[types.ts:209](https://github.com/timmywil/panzoom/blob/22fb0b3/src/types.ts#L209)

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
