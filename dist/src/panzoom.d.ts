/**
 * Panzoom for panning and zooming elements using CSS transforms
 * https://github.com/timmywil/panzoom
 *
 * Copyright Timmy Willison and other contributors
 * Released under the MIT license
 * https://github.com/timmywil/panzoom/blob/master/MIT-License.txt
 *
 */
import './polyfills';
import { PanzoomObject, PanzoomOptions } from './types';
declare function Panzoom(elem: HTMLElement | SVGElement, options?: Omit<PanzoomOptions, 'force'>): PanzoomObject;
declare namespace Panzoom {
    var defaultOptions: PanzoomOptions;
}
export { PanzoomObject, PanzoomOptions };
export default Panzoom;
