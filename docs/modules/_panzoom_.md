> **[panzoom](../README.md)**

[Globals](../globals.md) / ["panzoom"](_panzoom_.md) /

# External module: "panzoom"

## Index

### Interfaces

* [PanOptions](../interfaces/_panzoom_.panoptions.md)
* [PanzoomInstance](../interfaces/_panzoom_.panzoominstance.md)
* [ZoomOptions](../interfaces/_panzoom_.zoomoptions.md)

### Type aliases

* [PanzoomOptions](_panzoom_.md#panzoomoptions)

### Functions

* [Panzoom](_panzoom_.md#panzoom)

### Object literals

* [defaultOptions](_panzoom_.md#const-defaultoptions)

## Type aliases

###  PanzoomOptions

Ƭ **PanzoomOptions**: *[PanOptions](../interfaces/_panzoom_.panoptions.md) & [ZoomOptions](../interfaces/_panzoom_.zoomoptions.md) & object*

*Defined in [panzoom.ts:34](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L34)*

## Functions

###  Panzoom

▸ **Panzoom**(`elem`: `HTMLElement` | `SVGElement`, `options?`: [PanzoomOptions](_panzoom_.md#panzoomoptions)): *[PanzoomInstance](../interfaces/_panzoom_.panzoominstance.md)*

*Defined in [panzoom.ts:92](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L92)*

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |
`options?` | [PanzoomOptions](_panzoom_.md#panzoomoptions) |

**Returns:** *[PanzoomInstance](../interfaces/_panzoom_.panzoominstance.md)*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [panzoom.ts:44](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L44)*

###  animate

• **animate**: *false* = false

*Defined in [panzoom.ts:48](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L48)*

###  cursor

• **cursor**: *string* = "move"

*Defined in [panzoom.ts:53](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L53)*

###  disablePan

• **disablePan**: *false* = false

*Defined in [panzoom.ts:45](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L45)*

###  disableZoom

• **disableZoom**: *false* = false

*Defined in [panzoom.ts:46](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L46)*

###  easing

• **easing**: *string* = "ease-in-out"

*Defined in [panzoom.ts:47](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L47)*

###  maxScale

• **maxScale**: *number* = 4

*Defined in [panzoom.ts:50](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L50)*

###  minScale

• **minScale**: *number* = 0.125

*Defined in [panzoom.ts:49](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L49)*

###  relative

• **relative**: *false* = false

*Defined in [panzoom.ts:52](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L52)*

###  step

• **step**: *number* = 0.005

*Defined in [panzoom.ts:51](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L51)*