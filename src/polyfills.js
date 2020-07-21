/* eslint-disable no-var */
if (typeof window !== 'undefined') {
  // Support: IE11 only
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach
  }
  // Support: IE11 only
  // CustomEvent is an object instead of a constructor
  if (typeof window.CustomEvent !== 'function') {
    window.CustomEvent = function CustomEvent(event, params) {
      params = params || { bubbles: false, cancelable: false, detail: null }
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail)
      return evt
    }
  }
}
