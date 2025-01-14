/**
 * Panzoom for panning and zooming elements using CSS transforms
 * https://github.com/timmywil/panzoom
 *
 * Copyright Timmy Willison and other contributors
 * Released under the MIT license
 * https://github.com/timmywil/panzoom/blob/main/MIT-License.txt
 *
 */
import './polyfills.js';
import type { PanzoomObject, PanzoomOptions } from './types.js';
declare function Panzoom(elem: HTMLElement | SVGElement, options?: Omit<PanzoomOptions, 'force'>): PanzoomObject;
declare namespace Panzoom {
    var defaultOptions: PanzoomOptions;
}
export * from './types.js';
export default Panzoom;
