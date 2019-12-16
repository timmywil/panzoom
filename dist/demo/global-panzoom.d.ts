import Panzoom from '../src/panzoom';
declare global {
    interface Window {
        Panzoom: typeof Panzoom;
    }
}
