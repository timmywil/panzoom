
# External module: "events"

## Index

### Variables

* [events](_events_.md#let-events)

### Functions

* [destroyPointer](_events_.md#destroypointer)
* [onPointer](_events_.md#onpointer)

## Variables

### `Let` events

• **events**: *object*

*Defined in [events.ts:1](https://github.com/timmywil/panzoom/blob/b082b5a/src/events.ts#L1)*

#### Type declaration:

* **down**: *string*

* **move**: *string*

* **up**: *string*

## Functions

###  destroyPointer

▸ **destroyPointer**(`event`: "down" | "move" | "up", `elem`: HTMLElement | SVGElement | Document, `handler`: function): *void*

*Defined in [events.ts:35](https://github.com/timmywil/panzoom/blob/b082b5a/src/events.ts#L35)*

**Parameters:**

▪ **event**: *"down" | "move" | "up"*

▪ **elem**: *HTMLElement | SVGElement | Document*

▪ **handler**: *function*

▸ (`event`: PointerEvent): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | PointerEvent |

**Returns:** *void*

___

###  onPointer

▸ **onPointer**(`event`: "down" | "move" | "up", `elem`: HTMLElement | SVGElement | Document, `handler`: function, `eventOpts?`: any): *void*

*Defined in [events.ts:22](https://github.com/timmywil/panzoom/blob/b082b5a/src/events.ts#L22)*

**Parameters:**

▪ **event**: *"down" | "move" | "up"*

▪ **elem**: *HTMLElement | SVGElement | Document*

▪ **handler**: *function*

▸ (`event`: PointerEvent): *void*

**Parameters:**

Name | Type |
------ | ------ |
`event` | PointerEvent |

▪`Optional`  **eventOpts**: *any*

**Returns:** *void*
