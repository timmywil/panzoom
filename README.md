
<a name="readmemd"></a>

> **[](#readmemd)**

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

1\. What is `transform-origin` and why is it added to the panzoom element?

- The `transform-origin` is the origin from which transforms are applied. Panzoom ensures the defaults are set to what it expects to calculate focal point zooming.
- HTML elements default to '50% 50%'.
- SVG elements default to '0 0'.

2\. I am using Panzoom with an `<object>` tag. It zooms but does not pan. [example](https://codepen.io/timmywil/pen/qNpykA)

Object elements can eat up events, making it so they never reach Panzoom. To fix this, disable pointer events (`pointer-events: none`) on the `<object>` tag and call Panzoom using a wrapper.

3\. My links aren't working! How do I enable an anchor within a panzoom element?

Add class `options.clickable` (default is `"clickable"`) to whatever element you want to be clickable. This will add a listener that calls `event.stopImmediatePropagation()` to prevent the event from reaching panzoom. You could also do this yourself.

<a name="globalsmd"></a>

> **[](#readmemd)**

# 

## 

### 




<a name="interfaces_types_currentvaluesmd"></a>

> **[](#readmemd)**

# Interface: CurrentValues

## Hierarchy

* **CurrentValues**

## 

### Properties

* [scale](#scale)
* [x](#x)
* [y](#y)

## Properties

###  scale

• **scale**: *number*

*Defined in [types.ts:108](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L108)*

___

###  x

• **x**: *number*

*Defined in [types.ts:106](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L106)*

___

###  y

• **y**: *number*

*Defined in [types.ts:107](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L107)*

<a name="interfaces_types_miscoptionsmd"></a>

> **[](#readmemd)**

# Interface: MiscOptions

## Hierarchy

* **MiscOptions**

## able

* \[ **key**: *string*\]: any

Pass through any options like data

## 

### Properties

* [animate](#optional-animate)
* [clickableClass](#optional-clickableclass)
* [duration](#optional-duration)
* [easing](#optional-easing)
* [origin](#optional-origin)
* [setTransform](#optional-settransform)
* [startScale](#optional-startscale)
* [startX](#optional-startx)
* [startY](#optional-starty)

## Properties

### `Optional` animate

• **animate**? : *boolean*

*Defined in [types.ts:5](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L5)*

Whether to animate transitions

___

### `Optional` clickableClass

• **clickableClass**? : *string*

*Defined in [types.ts:10](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L10)*

Add this class to any element within the panzoom element
that you want to be clickable and not initiate the drag

___

### `Optional` duration

• **duration**? : *number*

*Defined in [types.ts:12](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L12)*

Duration of the transition (ms)

___

### `Optional` easing

• **easing**? : *string*

*Defined in [types.ts:14](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L14)*

CSS Easing used for transitions

___

### `Optional` origin

• **origin**? : *string*

*Defined in [types.ts:28](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L28)*

**Change this at your own risk.**
The `transform-origin` is the origin from which transforms are applied.
Default: `'50% 50%'` for HTML and `'0 0'` for SVG.
The defaults are set because changing the `transform-origin` on
SVG elements doesn't work in IE.

Changing this should work with many things, but
it will break focal point zooming, which assumes the
defaults are set to do the more complicated calculations.

And again, changing this for SVG in IE doesn't work at all.

___

### `Optional` setTransform

• **setTransform**? : *`setTransform`*

*Defined in [types.ts:45](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L45)*

Override the transform setter
This is exposed mostly so the user could
set other parts of a transform
aside from scale and translate.

```js
// This example always sets a rotation
// when setting the scale and translation
Panzoom(elem, {
  setTransform: (elem, { scale, x, y }) => {
    setStyle(elem, 'transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
  }
})
```

___

### `Optional` startScale

• **startScale**? : *number*

*Defined in [types.ts:49](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L49)*

___

### `Optional` startX

• **startX**? : *number*

*Defined in [types.ts:47](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L47)*

Values used to set the beginning transform

___

### `Optional` startY

• **startY**? : *number*

*Defined in [types.ts:48](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L48)*

<a name="interfaces_types_panoptionsmd"></a>

> **[](#readmemd)**

# Interface: PanOptions

## Hierarchy

* **PanOptions**

## 

### Properties

* [contain](#optional-contain)
* [cursor](#optional-cursor)
* [disablePan](#optional-disablepan)
* [disableXAxis](#optional-disablexaxis)
* [disableYAxis](#optional-disableyaxis)
* [panOnlyWhenZoomed](#optional-panonlywhenzoomed)
* [relative](#optional-relative)

## Properties

### `Optional` contain

• **contain**? : *"inside" | "outside"*

*Defined in [types.ts:66](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L66)*

Contain the panzoom element either
inside or outside the parent.
Inside: The panzoom element is smaller
  than its parent and cannot be panned
  to the outside.
Outside: The panzoom element is larger
  than its parent and cannot be panned
  to the inside. In other words, no
  empty space around the element will be shown.

___

### `Optional` cursor

• **cursor**? : *string*

*Defined in [types.ts:68](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L68)*

The cursor style to set on the panzoom element

___

### `Optional` disablePan

• **disablePan**? : *boolean*

*Defined in [types.ts:70](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L70)*

Disable panning functionality. Note: disablePan also disables focal point zooming

___

### `Optional` disableXAxis

• **disableXAxis**? : *boolean*

*Defined in [types.ts:72](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L72)*

Pan only on the Y axis

___

### `Optional` disableYAxis

• **disableYAxis**? : *boolean*

*Defined in [types.ts:74](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L74)*

Pan only on the X axis

___

### `Optional` panOnlyWhenZoomed

• **panOnlyWhenZoomed**? : *boolean*

*Defined in [types.ts:78](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L78)*

Disable panning while the scale is equal to the starting value

___

### `Optional` relative

• **relative**? : *boolean*

*Defined in [types.ts:76](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L76)*

When passing x and y values to .pan(), treat the values as relative to their current values

<a name="interfaces_types_panzoomobjectmd"></a>

> **[](#readmemd)**

# Interface: PanzoomObject

## Hierarchy

* **PanzoomObject**

## 

### Properties

* [getOptions](#getoptions)
* [getPan](#getpan)
* [getScale](#getscale)
* [pan](#pan)
* [reset](#reset)
* [setOptions](#setoptions)
* [setStyle](#setstyle)
* [zoom](#zoom)
* [zoomIn](#zoomin)
* [zoomOut](#zoomout)
* [zoomToPoint](#zoomtopoint)
* [zoomWithWheel](#zoomwithwheel)

## Properties

###  getOptions

• **getOptions**: *function*

*Defined in [types.ts:117](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L117)*

Returns a copy of the current options object

#### Type declaration:

▸ (): *[PanzoomOptions](#panzoomoptions)*

___

###  getPan

• **getPan**: *function*

*Defined in [types.ts:113](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L113)*

Get the current x/y translation

#### Type declaration:

▸ (): *object*

* **x**: *number*

* **y**: *number*

___

###  getScale

• **getScale**: *function*

*Defined in [types.ts:115](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L115)*

Get the current scale

#### Type declaration:

▸ (): *number*

___

###  pan

• **pan**: *function*

*Defined in [types.ts:128](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L128)*

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100)
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true })
```

#### Type declaration:

▸ (`x`: number | string, `y`: number | string, `panOptions?`: [PanOptions](#interfaces_types_panoptionsmd)): *[CurrentValues](#interfaces_types_currentvaluesmd)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number \| string |
`y` | number \| string |
`panOptions?` | [PanOptions](#interfaces_types_panoptionsmd) |

___

###  reset

• **reset**: *function*

*Defined in [types.ts:130](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L130)*

Reset the pan and zoom to startX, startY, and startScale

#### Type declaration:

▸ (`options?`: [PanzoomOptions](#panzoomoptions)): *[CurrentValues](#interfaces_types_currentvaluesmd)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PanzoomOptions](#panzoomoptions) |

___

###  setOptions

• **setOptions**: *function*

*Defined in [types.ts:132](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L132)*

Change options for the Panzoom instance

#### Type declaration:

▸ (`options?`: [PanzoomOptions](#panzoomoptions)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PanzoomOptions](#panzoomoptions) |

___

###  setStyle

• **setStyle**: *`setStyle`*

*Defined in [types.ts:134](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L134)*

A convenience method for setting prefixed styles on the Panzoom element

___

###  zoom

• **zoom**: *function*

*Defined in [types.ts:143](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L143)*

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

#### Type declaration:

▸ (`scale`: number, `zoomOptions?`: [ZoomOptions](#interfaces_types_zoomoptionsmd)): *[CurrentValues](#interfaces_types_currentvaluesmd)*

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |
`zoomOptions?` | [ZoomOptions](#interfaces_types_zoomoptionsmd) |

___

###  zoomIn

• **zoomIn**: *function*

*Defined in [types.ts:147](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L147)*

Zoom in using the predetermined increment set in options

#### Type declaration:

▸ (`zoomOptions?`: [ZoomOptions](#interfaces_types_zoomoptionsmd)): *[CurrentValues](#interfaces_types_currentvaluesmd)*

**Parameters:**

Name | Type |
------ | ------ |
`zoomOptions?` | [ZoomOptions](#interfaces_types_zoomoptionsmd) |

___

###  zoomOut

• **zoomOut**: *function*

*Defined in [types.ts:151](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L151)*

Zoom out using the predetermined increment set in options

#### Type declaration:

▸ (`zoomOptions?`: [ZoomOptions](#interfaces_types_zoomoptionsmd)): *[CurrentValues](#interfaces_types_currentvaluesmd)*

**Parameters:**

Name | Type |
------ | ------ |
`zoomOptions?` | [ZoomOptions](#interfaces_types_zoomoptionsmd) |

___

###  zoomToPoint

• **zoomToPoint**: *function*

*Defined in [types.ts:158](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L158)*

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a pointer event on the Panzoom element.

#### Type declaration:

▸ (`scale`: number, `point`: object, `zoomOptions?`: [ZoomOptions](#interfaces_types_zoomoptionsmd)): *[CurrentValues](#interfaces_types_currentvaluesmd)*

**Parameters:**

▪ **scale**: *number*

▪ **point**: *object*

Name | Type |
------ | ------ |
`clientX` | number |
`clientY` | number |

▪`Optional`  **zoomOptions**: *[ZoomOptions](#interfaces_types_zoomoptionsmd)*

___

###  zoomWithWheel

• **zoomWithWheel**: *function*

*Defined in [types.ts:187](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L187)*

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
elem.parentElement.addEventListener('wheel', panzoom.zoomUsingWheel)
// Bind to shift+mousewheel
elem.parentElement.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomUsingWheel(event)
})
```

#### Type declaration:

▸ (`event`: `WheelEvent`, `zoomOptions?`: [ZoomOptions](#interfaces_types_zoomoptionsmd)): *[CurrentValues](#interfaces_types_currentvaluesmd)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | `WheelEvent` |
`zoomOptions?` | [ZoomOptions](#interfaces_types_zoomoptionsmd) |

<a name="interfaces_types_zoomoptionsmd"></a>

> **[](#readmemd)**

# Interface: ZoomOptions

## Hierarchy

* **ZoomOptions**

## 

### Properties

* [disableZoom](#optional-disablezoom)
* [focal](#optional-focal)
* [maxScale](#optional-maxscale)
* [minScale](#optional-minscale)
* [step](#optional-step)

## Properties

### `Optional` disableZoom

• **disableZoom**? : *boolean*

*Defined in [types.ts:83](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L83)*

Disable zooming functionality

___

### `Optional` focal

• **focal**? : *object*

*Defined in [types.ts:90](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L90)*

Zoom to the given point on the panzoom element.
This point is expected to be relative to
the panzoom element's dimensions and is unrelated
to the parent dimensions.

#### Type declaration:

* **x**: *number*

* **y**: *number*

___

### `Optional` maxScale

• **maxScale**? : *number*

*Defined in [types.ts:94](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L94)*

The maximum scale when zooming

___

### `Optional` minScale

• **minScale**? : *number*

*Defined in [types.ts:92](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L92)*

The minimum scale when zooming

___

### `Optional` step

• **step**? : *number*

*Defined in [types.ts:96](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L96)*

The step affects the rate of zooming with a mouse wheel, pinching, or range element

<a name="modules_panzoom_md"></a>

> **[](#readmemd)**

# 

## 

### Functions

* [Panzoom](#panzoom)

### Object literals

* [defaultOptions](#const-defaultoptions)

## Functions

###  Panzoom

▸ **Panzoom**(`elem`: `HTMLElement` | `SVGElement`, `options?`: [PanzoomOptions](#panzoomoptions)): *[PanzoomObject](#interfaces_types_panzoomobjectmd)*

*Defined in [panzoom.ts:37](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L37)*

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |
`options?` | [PanzoomOptions](#panzoomoptions) |

**Returns:** *[PanzoomObject](#interfaces_types_panzoomobjectmd)*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [panzoom.ts:17](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L17)*

###  animate

• **animate**: *false* = false

*Defined in [panzoom.ts:18](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L18)*

###  clickableClass

• **clickableClass**: *string* = "clickable"

*Defined in [panzoom.ts:19](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L19)*

###  cursor

• **cursor**: *string* = "move"

*Defined in [panzoom.ts:20](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L20)*

###  disablePan

• **disablePan**: *false* = false

*Defined in [panzoom.ts:21](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L21)*

###  disableXAxis

• **disableXAxis**: *false* = false

*Defined in [panzoom.ts:23](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L23)*

###  disableYAxis

• **disableYAxis**: *false* = false

*Defined in [panzoom.ts:24](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L24)*

###  disableZoom

• **disableZoom**: *false* = false

*Defined in [panzoom.ts:22](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L22)*

###  duration

• **duration**: *number* = 200

*Defined in [panzoom.ts:25](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L25)*

###  easing

• **easing**: *string* = "ease-in-out"

*Defined in [panzoom.ts:26](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L26)*

###  maxScale

• **maxScale**: *number* = 4

*Defined in [panzoom.ts:27](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L27)*

###  minScale

• **minScale**: *number* = 0.125

*Defined in [panzoom.ts:28](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L28)*

###  relative

• **relative**: *false* = false

*Defined in [panzoom.ts:29](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L29)*

###  setTransform

• **setTransform**: *`setTransform`*

*Defined in [panzoom.ts:30](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L30)*

###  startScale

• **startScale**: *number* = 1

*Defined in [panzoom.ts:33](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L33)*

###  startX

• **startX**: *number* = 0

*Defined in [panzoom.ts:31](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L31)*

###  startY

• **startY**: *number* = 0

*Defined in [panzoom.ts:32](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L32)*

###  step

• **step**: *number* = 0.3

*Defined in [panzoom.ts:34](https://github.com/timmywil/panzoom/blob/a91a9a0/src/panzoom.ts#L34)*

<a name="modules_types_md"></a>

> **[](#readmemd)**

# 

## 

### Interfaces

* [CurrentValues](#interfaces_types_currentvaluesmd)
* [MiscOptions](#interfaces_types_miscoptionsmd)
* [PanOptions](#interfaces_types_panoptionsmd)
* [PanzoomObject](#interfaces_types_panzoomobjectmd)
* [ZoomOptions](#interfaces_types_zoomoptionsmd)

### Type aliases

* [PanOnlyOptions](#panonlyoptions)
* [PanzoomOptions](#panzoomoptions)
* [ZoomOnlyOptions](#zoomonlyoptions)

## Type aliases

###  PanOnlyOptions

Ƭ **PanOnlyOptions**: *[MiscOptions](#interfaces_types_miscoptionsmd) & [PanOptions](#interfaces_types_panoptionsmd)*

*Defined in [types.ts:99](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L99)*

___

###  PanzoomOptions

Ƭ **PanzoomOptions**: *[PanOptions](#interfaces_types_panoptionsmd) & [ZoomOptions](#interfaces_types_zoomoptionsmd) & [MiscOptions](#interfaces_types_miscoptionsmd)*

*Defined in [types.ts:103](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L103)*

___

###  ZoomOnlyOptions

Ƭ **ZoomOnlyOptions**: *[MiscOptions](#interfaces_types_miscoptionsmd) & [ZoomOptions](#interfaces_types_zoomoptionsmd)*

*Defined in [types.ts:101](https://github.com/timmywil/panzoom/blob/a91a9a0/src/types.ts#L101)*
