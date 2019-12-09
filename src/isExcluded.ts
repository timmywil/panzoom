import { PanzoomOptions } from './types'

export default function isExcluded(elem: Element, options: PanzoomOptions) {
  for (let cur = elem; cur != null; cur = cur.parentElement) {
    if (cur.classList.contains(options.excludeClass) || options.exclude.indexOf(cur) > -1) {
      return true
    }
  }
  return false
}
