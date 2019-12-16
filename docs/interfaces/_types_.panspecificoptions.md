
# Interface: PanSpecificOptions

## Hierarchy

* **PanSpecificOptions**

## Index

### Properties

* [contain](_types_.panspecificoptions.md#optional-contain)
* [cursor](_types_.panspecificoptions.md#optional-cursor)
* [disablePan](_types_.panspecificoptions.md#optional-disablepan)
* [disableXAxis](_types_.panspecificoptions.md#optional-disablexaxis)
* [disableYAxis](_types_.panspecificoptions.md#optional-disableyaxis)
* [panOnlyWhenZoomed](_types_.panspecificoptions.md#optional-panonlywhenzoomed)
* [relative](_types_.panspecificoptions.md#optional-relative)

## Properties

### `Optional` contain

• **contain**? : *"inside" | "outside"*

*Defined in [types.ts:130](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L130)*

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

*Defined in [types.ts:132](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L132)*

The cursor style to set on the panzoom element

___

### `Optional` disablePan

• **disablePan**? : *boolean*

*Defined in [types.ts:138](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L138)*

Disable panning functionality.
Note: disablePan does not affect focal point zooming or the constrain option.
  The element will still pan accordingly.

___

### `Optional` disableXAxis

• **disableXAxis**? : *boolean*

*Defined in [types.ts:140](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L140)*

Pan only on the Y axis

___

### `Optional` disableYAxis

• **disableYAxis**? : *boolean*

*Defined in [types.ts:142](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L142)*

Pan only on the X axis

___

### `Optional` panOnlyWhenZoomed

• **panOnlyWhenZoomed**? : *boolean*

*Defined in [types.ts:146](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L146)*

Disable panning while the scale is equal to the starting value

___

### `Optional` relative

• **relative**? : *boolean*

*Defined in [types.ts:144](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L144)*

When passing x and y values to .pan(), treat the values as relative to their current values
