> **[@panzoom/panzoom](../README.md)**

[Globals](../globals.md) / ["types"](../modules/_types_.md) / [MiscOptions](_types_.miscoptions.md) /

# Interface: MiscOptions

## Hierarchy

* **MiscOptions**

## Indexable

● \[▪ **key**: *string*\]: any

Pass through any options like data

## Index

### Properties

* [animate](_types_.miscoptions.md#optional-animate)
* [clickableClass](_types_.miscoptions.md#optional-clickableclass)
* [duration](_types_.miscoptions.md#optional-duration)
* [easing](_types_.miscoptions.md#optional-easing)
* [origin](_types_.miscoptions.md#optional-origin)
* [setTransform](_types_.miscoptions.md#optional-settransform)
* [startScale](_types_.miscoptions.md#optional-startscale)
* [startX](_types_.miscoptions.md#optional-startx)
* [startY](_types_.miscoptions.md#optional-starty)

## Properties

### `Optional` animate

• **animate**? : *boolean*

*Defined in [types.ts:5](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L5)*

Whether to animate transitions

___

### `Optional` clickableClass

• **clickableClass**? : *string*

*Defined in [types.ts:10](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L10)*

Add this class to any element within the panzoom element
that you want to be clickable and not initiate the drag

___

### `Optional` duration

• **duration**? : *number*

*Defined in [types.ts:12](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L12)*

Duration of the transition (ms)

___

### `Optional` easing

• **easing**? : *string*

*Defined in [types.ts:14](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L14)*

CSS Easing used for transitions

___

### `Optional` origin

• **origin**? : *string*

*Defined in [types.ts:28](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L28)*

**Change this at your own risk.**
The `transform-origin` is the origin from which transforms are applied.
Default: `'50% 50%'` for HTML and `'0 0'` for SVG.
The defaults are set because changing the `transform-origin` on
SVG elements doesn't work in IE.

Changing this should work with most things, but
it will break focal point zooming, which assumes the
defaults are set to do the more complicated calculations.

And again, changing this for SVG in IE doesn't work at all.

___

### `Optional` setTransform

• **setTransform**? : *[setTransform](../modules/_css_.md#settransform)*

*Defined in [types.ts:45](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L45)*

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

*Defined in [types.ts:49](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L49)*

___

### `Optional` startX

• **startX**? : *number*

*Defined in [types.ts:47](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L47)*

Values used to set the beginning transform

___

### `Optional` startY

• **startY**? : *number*

*Defined in [types.ts:48](https://github.com/timmywil/panzoom/blob/a7078e8/src/types.ts#L48)*