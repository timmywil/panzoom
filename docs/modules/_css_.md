> **[panzoom](../README.md)**

[Globals](../globals.md) / ["css"](_css_.md) /

# External module: "css"

## Index

### Variables

* [divStyle](_css_.md#const-divstyle)
* [prefixCache](_css_.md#const-prefixcache)
* [prefixes](_css_.md#const-prefixes)

### Functions

* [getPrefixedName](_css_.md#getprefixedname)
* [setStyle](_css_.md#setstyle)
* [setTransform](_css_.md#settransform)
* [setTransformOrigin](_css_.md#settransformorigin)

## Variables

### `Const` divStyle

• **divStyle**: *`CSSStyleDeclaration`* =  document.createElement('div').style

*Defined in [css.ts:4](https://github.com/timmywil/panzoom/blob/2260b94/src/css.ts#L4)*

Proper prefixing for cross-browser compatibility

___

### `Const` prefixCache

• **prefixCache**: *object*

*Defined in [css.ts:6](https://github.com/timmywil/panzoom/blob/2260b94/src/css.ts#L6)*

#### Type declaration:

● \[▪ **key**: *string*\]: string

___

### `Const` prefixes

• **prefixes**: *string[]* =  ['webkit', 'moz', 'ms']

*Defined in [css.ts:5](https://github.com/timmywil/panzoom/blob/2260b94/src/css.ts#L5)*

## Functions

###  getPrefixedName

▸ **getPrefixedName**(`name`: string): *string*

*Defined in [css.ts:7](https://github.com/timmywil/panzoom/blob/2260b94/src/css.ts#L7)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |

**Returns:** *string*

___

###  setStyle

▸ **setStyle**(`elem`: `HTMLElement` | `SVGElement`, `name`: string, `value`: string): *void*

*Defined in [css.ts:25](https://github.com/timmywil/panzoom/blob/2260b94/src/css.ts#L25)*

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

▸ **setTransform**(`elem`: `HTMLElement` | `SVGElement`, `__namedParameters`: object): *void*

*Defined in [css.ts:41](https://github.com/timmywil/panzoom/blob/2260b94/src/css.ts#L41)*

Set the transform using the proper prefix

**Parameters:**

▪ **elem**: *`HTMLElement` | `SVGElement`*

▪ **__namedParameters**: *object*

Name | Type |
------ | ------ |
`scale` | number |
`x` | number |
`y` | number |

**Returns:** *void*

___

###  setTransformOrigin

▸ **setTransformOrigin**(`elem`: `HTMLElement` | `SVGElement`): *void*

*Defined in [css.ts:34](https://github.com/timmywil/panzoom/blob/2260b94/src/css.ts#L34)*

Sets the default transform-origin for both HTML and SVG to 0 0
SVG transform-origin cannot be changed to 50% 50% in IE9-11 or Edge 13-14+,
so we default to 0 0 for everything.

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |

**Returns:** *void*