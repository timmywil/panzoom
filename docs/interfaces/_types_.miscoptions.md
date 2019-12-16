
# Interface: MiscOptions

## Hierarchy

* **MiscOptions**

## Indexable

* \[ **key**: *string*\]: any

Pass through any options like data

## Index

### Properties

* [animate](_types_.miscoptions.md#optional-animate)
* [duration](_types_.miscoptions.md#optional-duration)
* [easing](_types_.miscoptions.md#optional-easing)
* [exclude](_types_.miscoptions.md#optional-exclude)
* [excludeClass](_types_.miscoptions.md#optional-excludeclass)
* [force](_types_.miscoptions.md#optional-force)
* [handleStartEvent](_types_.miscoptions.md#optional-handlestartevent)
* [origin](_types_.miscoptions.md#optional-origin)
* [overflow](_types_.miscoptions.md#optional-overflow)
* [setTransform](_types_.miscoptions.md#optional-settransform)
* [silent](_types_.miscoptions.md#optional-silent)
* [startScale](_types_.miscoptions.md#optional-startscale)
* [startX](_types_.miscoptions.md#optional-startx)
* [startY](_types_.miscoptions.md#optional-starty)

## Properties

### `Optional` animate

• **animate**? : *boolean*

*Defined in [types.ts:13](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L13)*

Whether to animate transitions

___

### `Optional` duration

• **duration**? : *number*

*Defined in [types.ts:15](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L15)*

Duration of the transition (ms)

___

### `Optional` easing

• **easing**? : *string*

*Defined in [types.ts:17](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L17)*

CSS Easing used for transitions

___

### `Optional` exclude

• **exclude**? : *Element[]*

*Defined in [types.ts:24](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L24)*

Add elements to this array that should be excluded
from Panzoom handling.
Ancestors of event targets are also checked.
e.g. links and buttons that should not propagate the click event.

___

### `Optional` excludeClass

• **excludeClass**? : *string*

*Defined in [types.ts:31](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L31)*

Add this class to any element within the Panzoom element
that you want to exclude from Panzoom handling. That
element's children will also be excluded.
e.g. links and buttons that should not propagate the click event.

___

### `Optional` force

• **force**? : *boolean*

*Defined in [types.ts:47](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L47)*

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

___

### `Optional` handleStartEvent

• **handleStartEvent**? : *function*

*Defined in [types.ts:71](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L71)*

On the first pointer event, when panning starts,
the default Panzoom behavior is to call
`event.preventDefault()` and `event.stopPropagation()`
on that event. The former is almost certainly a necesity,
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
// Do nothing (this probably breaks things on mobile tho)
Panzoom(elem, {
  handleStartEvent: () => {}
})
```

#### Type declaration:

▸ (`event`: Event): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | Event |

___

### `Optional` origin

• **origin**? : *string*

*Defined in [types.ts:85](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L85)*

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

### `Optional` overflow

• **overflow**? : *string*

*Defined in [types.ts:87](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L87)*

The overflow CSS value for the parent. Defaults to 'hidden'

___

### `Optional` setTransform

• **setTransform**? : *setTransform*

*Defined in [types.ts:105](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L105)*

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

___

### `Optional` silent

• **silent**? : *boolean*

*Defined in [types.ts:107](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L107)*

Silence all events

___

### `Optional` startScale

• **startScale**? : *number*

*Defined in [types.ts:113](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L113)*

Scale used to set the beginning transform

___

### `Optional` startX

• **startX**? : *number*

*Defined in [types.ts:109](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L109)*

X Value used to set the beginning transform

___

### `Optional` startY

• **startY**? : *number*

*Defined in [types.ts:111](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L111)*

Y Value used to set the beginning transform
