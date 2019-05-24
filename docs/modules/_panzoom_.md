[panzoom](../README.md) > ["panzoom"](../modules/_panzoom_.md)

# External module: "panzoom"

## Index

### Interfaces

* [PanOptions](../interfaces/_panzoom_.panoptions.md)
* [ZoomOptions](../interfaces/_panzoom_.zoomoptions.md)

### Type aliases

* [PanzoomOptions](_panzoom_.md#panzoomoptions)

### Functions

* [Panzoom](_panzoom_.md#panzoom)

### Object literals

* [defaultOptions](_panzoom_.md#defaultoptions)

---

## Type aliases

<a id="panzoomoptions"></a>

###  PanzoomOptions

**Ƭ PanzoomOptions**: *[PanOptions](../interfaces/_panzoom_.panoptions.md) & [ZoomOptions](../interfaces/_panzoom_.zoomoptions.md) & `object`*

*Defined in [panzoom.ts:34](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L34)*

___

## Functions

<a id="panzoom"></a>

###  Panzoom

▸ **Panzoom**(elem: *`HTMLElement` \| `SVGElement`*, options?: *[PanzoomOptions](_panzoom_.md#panzoomoptions)*): `object`

*Defined in [panzoom.ts:56](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L56)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| elem | `HTMLElement` \| `SVGElement` |
| `Optional` options | [PanzoomOptions](_panzoom_.md#panzoomoptions) |

**Returns:** `object`

___

## Object literals

<a id="defaultoptions"></a>

### `<Const>` defaultOptions

**defaultOptions**: *`object`*

*Defined in [panzoom.ts:44](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L44)*

<a id="defaultoptions.animate"></a>

####  animate

**● animate**: *`false`* = false

*Defined in [panzoom.ts:48](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L48)*

___
<a id="defaultoptions.cursor"></a>

####  cursor

**● cursor**: *`string`* = "move"

*Defined in [panzoom.ts:53](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L53)*

___
<a id="defaultoptions.disablepan"></a>

####  disablePan

**● disablePan**: *`false`* = false

*Defined in [panzoom.ts:45](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L45)*

___
<a id="defaultoptions.disablezoom"></a>

####  disableZoom

**● disableZoom**: *`false`* = false

*Defined in [panzoom.ts:46](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L46)*

___
<a id="defaultoptions.easing"></a>

####  easing

**● easing**: *`string`* = "ease-in-out"

*Defined in [panzoom.ts:47](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L47)*

___
<a id="defaultoptions.maxscale"></a>

####  maxScale

**● maxScale**: *`number`* = 4

*Defined in [panzoom.ts:50](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L50)*

___
<a id="defaultoptions.minscale"></a>

####  minScale

**● minScale**: *`number`* = 0.125

*Defined in [panzoom.ts:49](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L49)*

___
<a id="defaultoptions.relative"></a>

####  relative

**● relative**: *`false`* = false

*Defined in [panzoom.ts:52](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L52)*

___
<a id="defaultoptions.step"></a>

####  step

**● step**: *`number`* = 0.005

*Defined in [panzoom.ts:51](https://github.com/timmywil/panzoom/blob/c5897a6/src/panzoom.ts#L51)*

___

___

