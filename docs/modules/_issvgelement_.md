> **[@panzoom/core](../README.md)**

[Globals](../globals.md) / ["isSVGElement"](_issvgelement_.md) /

# External module: "isSVGElement"

## Index

### Variables

* [rsvg](_issvgelement_.md#const-rsvg)

### Functions

* [isSVGElement](_issvgelement_.md#issvgelement)

## Variables

### `Const` rsvg

• **rsvg**: *`RegExp`* =  /^http:[\w\.\/]+svg$/

*Defined in [isSVGElement.ts:5](https://github.com/timmywil/panzoom/blob/54eb41a/src/isSVGElement.ts#L5)*

Determine if an element is SVG by checking the namespace
Exception: the <svg> element itself should be treated like HTML

## Functions

###  isSVGElement

▸ **isSVGElement**(`elem`: `HTMLElement` | `SVGElement`): *boolean*

*Defined in [isSVGElement.ts:6](https://github.com/timmywil/panzoom/blob/54eb41a/src/isSVGElement.ts#L6)*

**Parameters:**

Name | Type |
------ | ------ |
`elem` | `HTMLElement` \| `SVGElement` |

**Returns:** *boolean*