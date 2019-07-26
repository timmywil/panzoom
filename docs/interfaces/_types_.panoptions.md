> **[panzoom](../README.md)**

[Globals](../globals.md) / ["types"](../modules/_types_.md) / [PanOptions](_types_.panoptions.md) /

# Interface: PanOptions

## Hierarchy

* **PanOptions**

## Index

### Properties

* [cursor](_types_.panoptions.md#optional-cursor)
* [disablePan](_types_.panoptions.md#optional-disablepan)
* [disableXAxis](_types_.panoptions.md#optional-disablexaxis)
* [disableYAxis](_types_.panoptions.md#optional-disableyaxis)
* [relative](_types_.panoptions.md#optional-relative)
* [skipUpdate](_types_.panoptions.md#optional-skipupdate)

## Properties

### `Optional` cursor

• **cursor**? : *string*

*Defined in [types.ts:13](https://github.com/timmywil/panzoom/blob/2260b94/src/types.ts#L13)*

The cursor style to set on the panzoom element

___

### `Optional` disablePan

• **disablePan**? : *boolean*

*Defined in [types.ts:5](https://github.com/timmywil/panzoom/blob/2260b94/src/types.ts#L5)*

Disable panning functionality. Note: disablePan also disables focal point zooming

___

### `Optional` disableXAxis

• **disableXAxis**? : *boolean*

*Defined in [types.ts:7](https://github.com/timmywil/panzoom/blob/2260b94/src/types.ts#L7)*

Pan only on the Y axis

___

### `Optional` disableYAxis

• **disableYAxis**? : *boolean*

*Defined in [types.ts:9](https://github.com/timmywil/panzoom/blob/2260b94/src/types.ts#L9)*

Pan only on the X axis

___

### `Optional` relative

• **relative**? : *boolean*

*Defined in [types.ts:11](https://github.com/timmywil/panzoom/blob/2260b94/src/types.ts#L11)*

When passing x and y values to .pan(), treat the values as relative to their current values

___

### `Optional` skipUpdate

• **skipUpdate**? : *boolean*

*Defined in [types.ts:18](https://github.com/timmywil/panzoom/blob/2260b94/src/types.ts#L18)*

Set relevant Panzoom internal values without
actually updating the transform