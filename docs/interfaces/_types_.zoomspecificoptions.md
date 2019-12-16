
# Interface: ZoomSpecificOptions

## Hierarchy

* **ZoomSpecificOptions**

## Index

### Properties

* [disableZoom](_types_.zoomspecificoptions.md#optional-disablezoom)
* [focal](_types_.zoomspecificoptions.md#optional-focal)
* [maxScale](_types_.zoomspecificoptions.md#optional-maxscale)
* [minScale](_types_.zoomspecificoptions.md#optional-minscale)
* [step](_types_.zoomspecificoptions.md#optional-step)

## Properties

### `Optional` disableZoom

• **disableZoom**? : *boolean*

*Defined in [types.ts:151](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L151)*

Disable zooming functionality

___

### `Optional` focal

• **focal**? : *object*

*Defined in [types.ts:158](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L158)*

Zoom to the given point on the panzoom element.
This point is expected to be relative to
the panzoom element's dimensions and is unrelated
to the parent dimensions.

#### Type declaration:

* **x**: *number*

* **y**: *number*

___

### `Optional` maxScale

• **maxScale**? : *number*

*Defined in [types.ts:162](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L162)*

The maximum scale when zooming

___

### `Optional` minScale

• **minScale**? : *number*

*Defined in [types.ts:160](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L160)*

The minimum scale when zooming

___

### `Optional` step

• **step**? : *number*

*Defined in [types.ts:164](https://github.com/timmywil/panzoom/blob/b082b5a/src/types.ts#L164)*

The step affects zoom calculation when zooming with a mouse wheel, when pinch zooming, or when using zoomIn/zoomOut
