import { CurrentValues, PanzoomOptions } from './types';
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
