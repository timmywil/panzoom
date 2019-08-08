> **[@panzoom/panzoom](../README.md)**

[Globals](../globals.md) / ["types"](../modules/_types_.md) / [PanzoomObject](_types_.panzoomobject.md) /

# Interface: PanzoomObject

## Hierarchy

* **PanzoomObject**

## Index

### Properties

* [getOptions](_types_.panzoomobject.md#getoptions)
* [getPan](_types_.panzoomobject.md#getpan)
* [getScale](_types_.panzoomobject.md#getscale)
* [pan](_types_.panzoomobject.md#pan)
* [reset](_types_.panzoomobject.md#reset)
* [setOptions](_types_.panzoomobject.md#setoptions)
* [setStyle](_types_.panzoomobject.md#setstyle)
* [zoom](_types_.panzoomobject.md#zoom)
* [zoomIn](_types_.panzoomobject.md#zoomin)
* [zoomOut](_types_.panzoomobject.md#zoomout)
* [zoomToPoint](_types_.panzoomobject.md#zoomtopoint)
* [zoomWithWheel](_types_.panzoomobject.md#zoomwithwheel)

## Properties

###  getOptions

• **getOptions**: *function*

*Defined in [types.ts:113](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L113)*

Returns a copy of the current options object

#### Type declaration:

▸ (): *[PanzoomOptions](../modules/_types_.md#panzoomoptions)*

___

###  getPan

• **getPan**: *function*

*Defined in [types.ts:109](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L109)*

Get the current x/y translation

#### Type declaration:

▸ (): *object*

* **x**: *number*

* **y**: *number*

___

###  getScale

• **getScale**: *function*

*Defined in [types.ts:111](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L111)*

Get the current scale

#### Type declaration:

▸ (): *number*

___

###  pan

• **pan**: *function*

*Defined in [types.ts:124](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L124)*

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100)
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true })
```

#### Type declaration:

▸ (`x`: number | string, `y`: number | string, `panOptions?`: [PanOptions](../modules/_types_.md#panoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number \| string |
`y` | number \| string |
`panOptions?` | [PanOptions](../modules/_types_.md#panoptions) |

___

###  reset

• **reset**: *function*

*Defined in [types.ts:126](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L126)*

Reset the pan and zoom to startX, startY, and startScale

#### Type declaration:

▸ (`options?`: [PanzoomOptions](../modules/_types_.md#panzoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PanzoomOptions](../modules/_types_.md#panzoomoptions) |

___

###  setOptions

• **setOptions**: *function*

*Defined in [types.ts:128](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L128)*

Change options for the Panzoom instance

#### Type declaration:

▸ (`options?`: [PanzoomOptions](../modules/_types_.md#panzoomoptions)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PanzoomOptions](../modules/_types_.md#panzoomoptions) |

___

###  setStyle

• **setStyle**: *`setStyle`*

*Defined in [types.ts:130](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L130)*

A convenience method for setting prefixed styles on the Panzoom element

___

###  zoom

• **zoom**: *function*

*Defined in [types.ts:139](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L139)*

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

#### Type declaration:

▸ (`scale`: number, `zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |
`zoomOptions?` | [ZoomOptions](../modules/_types_.md#zoomoptions) |

___

###  zoomIn

• **zoomIn**: *function*

*Defined in [types.ts:143](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L143)*

Zoom in using the predetermined increment set in options

#### Type declaration:

▸ (`zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`zoomOptions?` | [ZoomOptions](../modules/_types_.md#zoomoptions) |

___

###  zoomOut

• **zoomOut**: *function*

*Defined in [types.ts:147](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L147)*

Zoom out using the predetermined increment set in options

#### Type declaration:

▸ (`zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`zoomOptions?` | [ZoomOptions](../modules/_types_.md#zoomoptions) |

___

###  zoomToPoint

• **zoomToPoint**: *function*

*Defined in [types.ts:154](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L154)*

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a pointer event on the Panzoom element.

#### Type declaration:

▸ (`scale`: number, `point`: object, `zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

▪ **scale**: *number*

▪ **point**: *object*

Name | Type |
------ | ------ |
`clientX` | number |
`clientY` | number |

▪`Optional`  **zoomOptions**: *[ZoomOptions](../modules/_types_.md#zoomoptions)*

___

###  zoomWithWheel

• **zoomWithWheel**: *function*

*Defined in [types.ts:183](https://github.com/timmywil/panzoom/blob/308448a/src/types.ts#L183)*

Zoom the Panzoom element to a focal point using the given WheelEvent

`disablePan` will prevent the focal point adjustment and will only zoom.

`zoomWithWheel` normally uses `deltaY` to determine the scale,
but will fall back to `deltaX` in case the shift modifier is used with
the wheel event. On a mac, that usually translates to horizontal scrolling,
but this method assumes the desired behavior is zooming.

This is a convenience function that may not handle all use cases.
Other cases should handroll solutions using the `zoomToPoint`
method or the `zoom` method's focal option.

```js
// Bind to mousewheel
elem.parentElement.addEventListener('wheel', panzoom.zoomUsingWheel)
// Bind to shift+mousewheel
elem.parentElement.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomUsingWheel(event)
})
```

#### Type declaration:

▸ (`event`: `WheelEvent`, `zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | `WheelEvent` |
`zoomOptions?` | [ZoomOptions](../modules/_types_.md#zoomoptions) |