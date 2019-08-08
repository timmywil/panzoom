> **[@panzoom/panzoom](../README.md)**

[Globals](../globals.md) / ["pointers"](_pointers_.md) /

# External module: "pointers"

## Index

### Functions

* [addEvent](_pointers_.md#addevent)
* [findEventIndex](_pointers_.md#findeventindex)
* [getDistance](_pointers_.md#getdistance)
* [getMiddle](_pointers_.md#getmiddle)
* [removeEvent](_pointers_.md#removeevent)

## Functions

###  addEvent

▸ **addEvent**(`pointers`: `PointerEvent`[], `event`: `PointerEvent`): *void*

*Defined in [pointers.ts:15](https://github.com/timmywil/panzoom/blob/65a9a10/src/pointers.ts#L15)*

**Parameters:**

Name | Type |
------ | ------ |
`pointers` | `PointerEvent`[] |
`event` | `PointerEvent` |

**Returns:** *void*

___

###  findEventIndex

▸ **findEventIndex**(`pointers`: `PointerEvent`[], `event`: `PointerEvent`): *number*

*Defined in [pointers.ts:5](https://github.com/timmywil/panzoom/blob/65a9a10/src/pointers.ts#L5)*

Utilites for working with multiple pointer events

**Parameters:**

Name | Type |
------ | ------ |
`pointers` | `PointerEvent`[] |
`event` | `PointerEvent` |

**Returns:** *number*

___

###  getDistance

▸ **getDistance**(`pointers`: `PointerEvent`[]): *number*

*Defined in [pointers.ts:55](https://github.com/timmywil/panzoom/blob/65a9a10/src/pointers.ts#L55)*

Calculates the distance between two points
for pinch zooming.
Limits to the first 2

**Parameters:**

Name | Type |
------ | ------ |
`pointers` | `PointerEvent`[] |

**Returns:** *number*

___

###  getMiddle

▸ **getMiddle**(`pointers`: `PointerEvent`[]): *object*

*Defined in [pointers.ts:36](https://github.com/timmywil/panzoom/blob/65a9a10/src/pointers.ts#L36)*

Calculates a center point between
the given pointer events, for panning
with multiple pointers.

**Parameters:**

Name | Type |
------ | ------ |
`pointers` | `PointerEvent`[] |

**Returns:** *object*

___

###  removeEvent

▸ **removeEvent**(`pointers`: `PointerEvent`[], `event`: `PointerEvent`): *void*

*Defined in [pointers.ts:24](https://github.com/timmywil/panzoom/blob/65a9a10/src/pointers.ts#L24)*

**Parameters:**

Name | Type |
------ | ------ |
`pointers` | `PointerEvent`[] |
`event` | `PointerEvent` |

**Returns:** *void*