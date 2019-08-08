export default function shallowClone(obj: any) {
  const clone: any = {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      clone[key] = obj[key]
    }
  }
  return clone
}
