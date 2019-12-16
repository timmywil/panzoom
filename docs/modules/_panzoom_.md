
# External module: "panzoom"

## Index

### Functions

* [Panzoom](_panzoom_.md#panzoom)

### Object literals

* [defaultOptions](_panzoom_.md#const-defaultoptions)

## Functions

###  Panzoom

▸ **Panzoom**(`elem`: HTMLElement | SVGElement, `options?`: Omit‹[PanzoomOptions](_types_.md#panzoomoptions), "force"›): *[PanzoomObject](../interfaces/_types_.panzoomobject.md)*

*Defined in [panzoom.ts:49](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L49)*

**Parameters:**

Name | Type |
------ | ------ |
`elem` | HTMLElement &#124; SVGElement |
`options?` | Omit‹[PanzoomOptions](_types_.md#panzoomoptions), "force"› |

**Returns:** *[PanzoomObject](../interfaces/_types_.panzoomobject.md)*

## Object literals

### `Const` defaultOptions

### ▪ **defaultOptions**: *object*

*Defined in [panzoom.ts:22](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L22)*

###  animate

• **animate**: *false* = false

*Defined in [panzoom.ts:23](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L23)*

###  cursor

• **cursor**: *string* = "move"

*Defined in [panzoom.ts:24](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L24)*

###  disablePan

• **disablePan**: *false* = false

*Defined in [panzoom.ts:25](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L25)*

###  disableXAxis

• **disableXAxis**: *false* = false

*Defined in [panzoom.ts:27](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L27)*

###  disableYAxis

• **disableYAxis**: *false* = false

*Defined in [panzoom.ts:28](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L28)*

###  disableZoom

• **disableZoom**: *false* = false

*Defined in [panzoom.ts:26](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L26)*

###  duration

• **duration**: *number* = 200

*Defined in [panzoom.ts:29](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L29)*

###  easing

• **easing**: *string* = "ease-in-out"

*Defined in [panzoom.ts:30](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L30)*

###  exclude

• **exclude**: *undefined[]* =  []

*Defined in [panzoom.ts:31](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L31)*

###  excludeClass

• **excludeClass**: *string* = "panzoom-exclude"

*Defined in [panzoom.ts:32](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L32)*

###  maxScale

• **maxScale**: *number* = 4

*Defined in [panzoom.ts:37](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L37)*

###  minScale

• **minScale**: *number* = 0.125

*Defined in [panzoom.ts:38](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L38)*

###  overflow

• **overflow**: *string* = "hidden"

*Defined in [panzoom.ts:39](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L39)*

###  panOnlyWhenZoomed

• **panOnlyWhenZoomed**: *false* = false

*Defined in [panzoom.ts:40](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L40)*

###  relative

• **relative**: *false* = false

*Defined in [panzoom.ts:41](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L41)*

###  setTransform

• **setTransform**: *setTransform*

*Defined in [panzoom.ts:42](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L42)*

###  startScale

• **startScale**: *number* = 1

*Defined in [panzoom.ts:45](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L45)*

###  startX

• **startX**: *number* = 0

*Defined in [panzoom.ts:43](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L43)*

###  startY

• **startY**: *number* = 0

*Defined in [panzoom.ts:44](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L44)*

###  step

• **step**: *number* = 0.3

*Defined in [panzoom.ts:46](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L46)*

###  handleStartEvent

▸ **handleStartEvent**(`e`: Event): *void*

*Defined in [panzoom.ts:33](https://github.com/timmywil/panzoom/blob/b082b5a/src/panzoom.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`e` | Event |

**Returns:** *void*
