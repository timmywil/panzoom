import type { CurrentValues, PanzoomOptions } from './types';
/**
 * Gets a style value expected to be a number
 */
export declare function getCSSNum(name: string, style: CSSStyleDeclaration): number;
/**
 * Set a style using the properly prefixed name
 */
export declare function setStyle(elem: HTMLElement | SVGElement, name: string, value: string): void;
/**
 * Constructs the transition from panzoom options
 * and takes care of prefixing the transition and transform
 */
export declare function setTransition(elem: HTMLElement | SVGElement, options: PanzoomOptions): void;
/**
 * Set the transform using the proper prefix
 *
 * Override the transform setter.
 * This is exposed mostly so the user could
 * set other parts of a transform
 * aside from scale and translate.
 * Default is defined in src/css.ts.
 *
 * ```js
 * // This example always sets a rotation
 * // when setting the scale and translation
 * const panzoom = Panzoom(elem, {
 *   setTransform: (elem, { scale, x, y }) => {
 *     panzoom.setStyle('transform', `rotate(0.5turn) scale(${scale}) translate(${x}px, ${y}px)`)
 *   }
 * })
 * ```
 */
export declare function setTransform(elem: HTMLElement | SVGElement, { x, y, scale, isSVG }: CurrentValues, _options?: PanzoomOptions): void;
/**
 * Dimensions used in containment and focal point zooming
 */
export declare function getDimensions(elem: HTMLElement | SVGElement): {
    elem: {
        style: CSSStyleDeclaration;
        width: number;
        height: number;
        top: number;
        bottom: number;
        left: number;
        right: number;
        margin: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        border: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
    };
    parent: {
        style: CSSStyleDeclaration;
        width: number;
        height: number;
        top: number;
        bottom: number;
        left: number;
        right: number;
        padding: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
        border: {
            left: number;
            right: number;
            top: number;
            bottom: number;
        };
    };
};
