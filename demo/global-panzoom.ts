import Panzoom from '../src/panzoom'

console.log('This is a demo version of Panzoom for testing.')
console.log('It exposes a global (window.Panzoom) and should not be used in production.')

declare global {
  interface Window {
    Panzoom: typeof Panzoom
  }
}
window.Panzoom = Panzoom
