> **[panzoom](../README.md)**

[Globals](../globals.md) / ["types"](../modules/_types_.md) / [PanzoomObject](_types_.panzoomobject.md) /

# Interface: PanzoomObject

## Hierarchy

* **PanzoomObject**

## Index

### Properties

* [getPan](_types_.panzoomobject.md#getpan)
* [getScale](_types_.panzoomobject.md#getscale)
* [options](_types_.panzoomobject.md#options)
* [pan](_types_.panzoomobject.md#pan)
* [reset](_types_.panzoomobject.md#reset)
* [setOptions](_types_.panzoomobject.md#setoptions)
* [setStyle](_types_.panzoomobject.md#setstyle)
* [zoom](_types_.panzoomobject.md#zoom)
* [zoomWithWheel](_types_.panzoomobject.md#zoomwithwheel)

## Properties

###  getPan

• **getPan**: *function*

*Defined in [types.ts:66](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L66)*

Get the current x/y translation

#### Type declaration:

▸ (): *object*

* **x**: *number*

* **y**: *number*

___

###  getScale

• **getScale**: *function*

*Defined in [types.ts:68](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L68)*

Get the current scale

#### Type declaration:

▸ (): *number*

___

###  options

• **options**: *[PanzoomOptions](../modules/_types_.md#panzoomoptions)*

*Defined in [types.ts:110](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L110)*

The contructed options for this Panzoom instance

___

###  pan

• **pan**: *function*

*Defined in [types.ts:79](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L79)*

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100)
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true })
```

#### Type declaration:

▸ (`x`: number | string, `y`: number | string, `panOptions?`: [PanOptions](_types_.panoptions.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number \| string |
`y` | number \| string |
`panOptions?` | [PanOptions](_types_.panoptions.md) |

___

###  reset

• **reset**: *function*

*Defined in [types.ts:114](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L114)*

Reset the pan and zoom to 0

#### Type declaration:

▸ (): *void*

___

###  setOptions

• **setOptions**: *function*

*Defined in [types.ts:112](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L112)*

Change options for the Panzoom instance

#### Type declaration:

▸ (`options?`: [PanzoomOptions](../modules/_types_.md#panzoomoptions)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PanzoomOptions](../modules/_types_.md#panzoomoptions) |

___

###  setStyle

• **setStyle**: *[setStyle](../modules/_css_.md#setstyle)*

*Defined in [types.ts:116](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L116)*

A convenience method for setting prefixed styles on the Panzoom element

___

###  zoom

• **zoom**: *function*

*Defined in [types.ts:88](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L88)*

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

#### Type declaration:

▸ (`scale`: number, `zoomOptions?`: [ZoomOptions](_types_.zoomoptions.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |
`zoomOptions?` | [ZoomOptions](_types_.zoomoptions.md) |

___

###  zoomWithWheel

• **zoomWithWheel**: *function*

*Defined in [types.ts:108](https://github.com/timmywil/panzoom/blob/37fd043/src/types.ts#L108)*

Zoom the Panzoom element to a focal point using the given WheelEvent

`disablePan` will prevent the focal point adjustment and will only zoom.

`zoomWithWheel` normally uses `deltaY` to determine the scale,
but will fall back to `deltaX` in case the shift modifier is used with
the wheel event. On a mac, that usually translates to horizontal scrolling,
but this method assumes the desired behavior is zooming.

This is a convenience function that may not handle all use cases.

```js
elem.parentElement.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomUsingWheel(event)
})
```

#### Type declaration:

▸ (`event`: `WheelEvent`): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | `WheelEvent` |