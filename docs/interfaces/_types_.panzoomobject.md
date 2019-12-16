
# Interface: PanzoomObject

## Hierarchy

* **PanzoomObject**

## Index

### Properties

* [destroy](_types_.panzoomobject.md#destroy)
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

###  destroy

• **destroy**: *function*

*Defined in [types.ts:179](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L179)*

Remove all event listeners bind to the the Panzoom element

#### Type declaration:

▸ (): *void*

___

###  getOptions

• **getOptions**: *function*

*Defined in [types.ts:185](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L185)*

Returns a _copy_ of the current options object

#### Type declaration:

▸ (): *[PanzoomOptions](../modules/_types_.md#panzoomoptions)*

___

###  getPan

• **getPan**: *function*

*Defined in [types.ts:181](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L181)*

Get the current x/y translation

#### Type declaration:

▸ (): *object*

* **x**: *number*

* **y**: *number*

___

###  getScale

• **getScale**: *function*

*Defined in [types.ts:183](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L183)*

Get the current scale

#### Type declaration:

▸ (): *number*

___

###  pan

• **pan**: *function*

*Defined in [types.ts:196](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L196)*

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
`x` | number &#124; string |
`y` | number &#124; string |
`panOptions?` | [PanOptions](../modules/_types_.md#panoptions) |

___

###  reset

• **reset**: *function*

*Defined in [types.ts:207](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L207)*

Reset the pan and zoom to startX, startY, and startScale.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.reset()
panzoom.reset({ animate: false })
```

#### Type declaration:

▸ (`resetOptions?`: [PanzoomOptions](../modules/_types_.md#panzoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`resetOptions?` | [PanzoomOptions](../modules/_types_.md#panzoomoptions) |

___

###  setOptions

• **setOptions**: *function*

*Defined in [types.ts:209](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L209)*

Change options for the Panzoom instance

#### Type declaration:

▸ (`options?`: [PanzoomOptions](../modules/_types_.md#panzoomoptions)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`options?` | [PanzoomOptions](../modules/_types_.md#panzoomoptions) |

___

###  setStyle

• **setStyle**: *function*

*Defined in [types.ts:211](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L211)*

A convenience method for setting prefixed styles on the Panzoom element

#### Type declaration:

▸ (`name`: string, `value`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`value` | string |

___

###  zoom

• **zoom**: *function*

*Defined in [types.ts:220](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L220)*

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

*Defined in [types.ts:231](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L231)*

Zoom in using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomIn()
panzoom.zoomIn({ animate: false })
```

#### Type declaration:

▸ (`zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`zoomOptions?` | [ZoomOptions](../modules/_types_.md#zoomoptions) |

___

###  zoomOut

• **zoomOut**: *function*

*Defined in [types.ts:242](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L242)*

Zoom out using the predetermined increment set in options.
Animates by default, ignoring the global option.
Pass `{ animate: false }` to override.

```js
panzoom.zoomOut()
panzoom.zoomOut({ animate: false })
```

#### Type declaration:

▸ (`zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`zoomOptions?` | [ZoomOptions](../modules/_types_.md#zoomoptions) |

___

###  zoomToPoint

• **zoomToPoint**: *function*

*Defined in [types.ts:253](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L253)*

Zoom the Panzoom element to a focal point using
the given pointer/touch/mouse event or constructed point.
The clientX/clientY values should be calculated
the same way as a `pointermove` event on the Panzoom element's parent.

```js
panzoom.zoomToPoint(1.2, pointerEvent)
```

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

*Defined in [types.ts:282](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L282)*

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
elem.parentElement.addEventListener('wheel', panzoom.zoomWithWheel)
// Bind to shift+mousewheel
elem.parentElement.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomWithWheel(event)
})
```

#### Type declaration:

▸ (`event`: WheelEvent, `zoomOptions?`: [ZoomOptions](../modules/_types_.md#zoomoptions)): *[CurrentValues](_types_.currentvalues.md)*

**Parameters:**

Name | Type |
------ | ------ |
`event` | WheelEvent |
`zoomOptions?` | [ZoomOptions](../modules/_types_.md#zoomoptions) |
