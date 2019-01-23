import { styleObj } from './createSortedStyleObject'

export const separateObjectsAndProperties = (styleObj: styleObj) => {
  const propertyArr = []
  const objArr = []

  for (const key in styleObj) {
    if (key && typeof styleObj[key] === 'string') {
      propertyArr.push(key)
    } else if (typeof styleObj[key] === 'object') {
      objArr.push(key)
    }
  }

  return {
    propertyArr,
    objArr
  }
}
