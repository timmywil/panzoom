[panzoom](../README.md) > ["css"](../modules/_css_.md)

# External module: "css"

## Index

### Variables

* [divStyle](_css_.md#divstyle)
* [prefixCache](_css_.md#prefixcache)
* [prefixes](_css_.md#prefixes)

### Functions

* [getPrefixedName](_css_.md#getprefixedname)
* [setStyle](_css_.md#setstyle)
* [setTransform](_css_.md#settransform)
* [setTransformOrigin](_css_.md#settransformorigin)

---

## Variables

<a id="divstyle"></a>

### `<Const>` divStyle

**● divStyle**: *`CSSStyleDeclaration`* =  document.createElement('div').style

*Defined in [css.ts:4](https://github.com/timmywil/panzoom/blob/c5897a6/src/css.ts#L4)*

Proper prefixing for cross-browser compatibility

___
<a id="prefixcache"></a>

### `<Const>` prefixCache

**● prefixCache**: *`object`*

*Defined in [css.ts:6](https://github.com/timmywil/panzoom/blob/c5897a6/src/css.ts#L6)*

#### Type declaration

[key: `string`]: `string`

___
<a id="prefixes"></a>

### `<Const>` prefixes

**● prefixes**: *`string`[]* =  ['webkit', 'moz', 'ms']

*Defined in [css.ts:5](https://github.com/timmywil/panzoom/blob/c5897a6/src/css.ts#L5)*

___

## Functions

<a id="getprefixedname"></a>

###  getPrefixedName

▸ **getPrefixedName**(name: *`string`*): `string`

*Defined in [css.ts:7](https://github.com/timmywil/panzoom/blob/c5897a6/src/css.ts#L7)*

**Parameters:**

| Name | Type |
| ------ | ------ |
| name | `string` |

**Returns:** `string`

___
<a id="setstyle"></a>

###  setStyle

▸ **setStyle**(elem: *`HTMLElement` \| `SVGElement`*, name: *`string`*, value: *`string`*): `void`

*Defined in [css.ts:25](https://github.com/timmywil/panzoom/blob/c5897a6/src/css.ts#L25)*

Set a style using the properly prefixed name

**Parameters:**

| Name | Type |
| ------ | ------ |
| elem | `HTMLElement` \| `SVGElement` |
| name | `string` |
| value | `string` |

**Returns:** `void`

___
<a id="settransform"></a>

###  setTransform

▸ **setTransform**(elem: *`HTMLElement` \| `SVGElement`*, __namedParameters: *`object`*): `void`

*Defined in [css.ts:40](https://github.com/timmywil/panzoom/blob/c5897a6/src/css.ts#L40)*

Set the transform using the proper prefix

**Parameters:**

**elem: `HTMLElement` \| `SVGElement`**

**__namedParameters: `object`**

| Name | Type |
| ------ | ------ |
| scale | `number` |
| x | `number` |
| y | `number` |

**Returns:** `void`

___
<a id="settransformorigin"></a>

###  setTransformOrigin

▸ **setTransformOrigin**(elem: *`HTMLElement` \| `SVGElement`*, isSVG: *`boolean`*): `void`

*Defined in [css.ts:33](https://github.com/timmywil/panzoom/blob/c5897a6/src/css.ts#L33)*

Set the default transform-origin for HTML and SVG SVG transform-origin cannot be changed to 50% 50% in IE9-11 or Edge 13-14+

**Parameters:**

| Name | Type |
| ------ | ------ |
| elem | `HTMLElement` \| `SVGElement` |
| isSVG | `boolean` |

**Returns:** `void`

___

