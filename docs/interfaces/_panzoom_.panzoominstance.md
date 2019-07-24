> **[panzoom](../README.md)**

[Globals](../globals.md) / ["panzoom"](../modules/_panzoom_.md) / [PanzoomInstance](_panzoom_.panzoominstance.md) /

# Interface: PanzoomInstance

## Hierarchy

* **PanzoomInstance**

## Index

### Properties

* [options](_panzoom_.panzoominstance.md#options)
* [pan](_panzoom_.panzoominstance.md#pan)
* [zoom](_panzoom_.panzoominstance.md#zoom)
* [zoomWithWheel](_panzoom_.panzoominstance.md#zoomwithwheel)

## Properties

###  options

• **options**: *[PanzoomOptions](../modules/_panzoom_.md#panzoomoptions)*

*Defined in [panzoom.ts:89](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L89)*

The contructed options for this Panzoom instance

___

###  pan

• **pan**: *function*

*Defined in [panzoom.ts:67](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L67)*

Pan the Panzoom element to the given x and y coordinates

```js
// Translates the element to 50px, 100px
panzoom.pan(50, 100)
// Pans the element right 10px and down 10px from its current position
panzoom.pan(10, 10, { relative: true })
```

#### Type declaration:

▸ (`x`: number | string, `y`: number | string, `panOptions?`: [PanOptions](_panzoom_.panoptions.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number \| string |
`y` | number \| string |
`panOptions?` | [PanOptions](_panzoom_.panoptions.md) |

___

###  zoom

• **zoom**: *function*

*Defined in [panzoom.ts:76](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L76)*

Zoom the Panzoom element to the given scale

```js
panzoom.zoom(2.2)
panzoom.zoom(2.2, { animate: true })
```

#### Type declaration:

▸ (`scale`: number, `zoomOptions?`: [ZoomOptions](_panzoom_.zoomoptions.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`scale` | number |
`zoomOptions?` | [ZoomOptions](_panzoom_.zoomoptions.md) |

___

###  zoomWithWheel

• **zoomWithWheel**: *function*

*Defined in [panzoom.ts:87](https://github.com/timmywil/panzoom/blob/45fed7d/src/panzoom.ts#L87)*

Zoom the Panzoom element to a focal point using the given WheelEvent

```js
elem.parentElement.addEventListener('wheel', function(event) {
  if (!event.shiftKey) return
  panzoom.zoomUsingWheel(event)
})
```

#### Type declaration:

▸ (`event`: `WheelEvent`, `zoomOptions?`: [PanzoomOptions](../modules/_panzoom_.md#panzoomoptions)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | `WheelEvent` |
`zoomOptions?` | [PanzoomOptions](../modules/_panzoom_.md#panzoomoptions) |