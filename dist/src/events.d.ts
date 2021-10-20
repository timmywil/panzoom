declare let events: {
    down: string;
    move: string;
    up: string;
};
export { events as eventNames };
export declare function onPointer(event: 'down' | 'move' | 'up', elem: HTMLElement | SVGElement | Document, handler: (event: PointerEvent) => void, eventOpts?: boolean | AddEventListenerOptions): void;
export declare function destroyPointer(event: 'down' | 'move' | 'up', elem: HTMLElement | SVGElement | Document, handler: (event: PointerEvent) => void): void;
