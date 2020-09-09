/**
 * Ensures panzoom can be loaded in node,
 * where there is no window.
 * This allows loading in SSR, but Panzoom
 * should still only be initialized on the front-end.
 */
const assert = require('assert')
const Panzoom = require('../dist/panzoom')

assert(Panzoom)
