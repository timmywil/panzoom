> **[@panzoom/panzoom](../README.md)**

[Globals](../globals.md) / ["css"](_css_.md) /

# External module: "css"

## Index

### Variables

* [divStyle](_css_.md#const-divstyle)
* [prefixCache](_css_.md#const-prefixcache)
* [prefixes](_css_.md#const-prefixes)

### Functions

* [getBorder](_css_.md#getborder)
* [getCSSNum](_css_.md#getcssnum)
* [getMargin](_css_.md#getmargin)
* [getPadding](_css_.md#getpadding)
* [getPrefixedName](_css_.md#getprefixedname)
* [setStyle](_css_.md#setstyle)
* [setTransform](_css_.md#settransform)
* [setTransition](_css_.md#settransition)

## Variables

### `Const` divStyle

• **divStyle**: *`CSSStyleDeclaration`* =  document.createElement('div').style

*Defined in [css.ts:6](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L6)*

Proper prefixing for cross-browser compatibility

___

### `Const` prefixCache

• **prefixCache**: *object*

*Defined in [css.ts:8](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L8)*

#### Type declaration:

● \[▪ **key**: *string*\]: string

___

### `Const` prefixes

• **prefixes**: *string[]* =  ['webkit', 'moz', 'ms']

*Defined in [css.ts:7](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L7)*

## Functions

###  getBorder

▸ **getBorder**(`elem`: `HTMLElement` | `SVGElement`, `style?`: `CSSStyleDeclaration`): *object*

*Defined in [css.ts:45](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L45)*

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |
`style?` | `CSSStyleDeclaration` |

**Returns:** *object*

* **bottom**: *number* =  getCSSNum(style, 'borderBottom')

* **left**: *number* =  getCSSNum(style, 'borderLeft')

* **right**: *number* =  getCSSNum(style, 'borderRight')

* **top**: *number* =  getCSSNum(style, 'borderTop')

___

###  getCSSNum

▸ **getCSSNum**(`style`: `CSSStyleDeclaration`, `name`: string): *number*

*Defined in [css.ts:29](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L29)*

Gets a style value expected to be a number

**Parameters:**

Name | Type |
------ | ------ |
`style` | `CSSStyleDeclaration` |
`name` | string |

**Returns:** *number*

___

###  getMargin

▸ **getMargin**(`elem`: `HTMLElement` | `SVGElement`, `style?`: `CSSStyleDeclaration`): *object*

*Defined in [css.ts:57](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L57)*

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |
`style?` | `CSSStyleDeclaration` |

**Returns:** *object*

* **bottom**: *number* =  getCSSNum(style, 'marginBottom')

* **left**: *number* =  getCSSNum(style, 'marginLeft')

* **right**: *number* =  getCSSNum(style, 'marginRight')

* **top**: *number* =  getCSSNum(style, 'marginTop')

___

###  getPadding

▸ **getPadding**(`elem`: `HTMLElement` | `SVGElement`, `style?`: `CSSStyleDeclaration`): *object*

*Defined in [css.ts:33](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L33)*

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |
`style?` | `CSSStyleDeclaration` |

**Returns:** *object*

* **bottom**: *number* =  getCSSNum(style, 'paddingBottom')

* **left**: *number* =  getCSSNum(style, 'paddingLeft')

* **right**: *number* =  getCSSNum(style, 'paddingRight')

* **top**: *number* =  getCSSNum(style, 'paddingTop')

___

###  getPrefixedName

▸ **getPrefixedName**(`name`: string): *string*

*Defined in [css.ts:9](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L9)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *string*

___

###  setStyle

▸ **setStyle**(`elem`: `HTMLElement` | `SVGElement`, `name`: string, `value`: string): *void*

*Defined in [css.ts:72](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L72)*

Set a style using the properly prefixed name

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |
`name` | string |
`value` | string |

**Returns:** *void*

___

###  setTransform

▸ **setTransform**(`elem`: `HTMLElement` | `SVGElement`, `__namedParameters`: object, `options`: [PanzoomOptions](_types_.md#panzoomoptions)): *void*

*Defined in [css.ts:89](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L89)*

Set the transform using the proper prefix

**Parameters:**

▪ **elem**: *`HTMLElement` | `SVGElement`*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`scale` | number |
`x` | number |
`y` | number |

▪`Default value`  **options**: *[PanzoomOptions](_types_.md#panzoomoptions)*=  {}

**Returns:** *void*

___

###  setTransition

▸ **setTransition**(`elem`: `HTMLElement` | `SVGElement`, `options`: [PanzoomOptions](_types_.md#panzoomoptions)): *void*

*Defined in [css.ts:80](https://github.com/timmywil/panzoom/blob/65a9a10/src/css.ts#L80)*

Constructs the transition from panzoom options
and takes care of prefixing the transition and transform

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |
`options` | [PanzoomOptions](_types_.md#panzoomoptions) |

**Returns:** *void*