import { insertSortedProperties } from './insertSortedProperties'
import { separateObjectsAndProperties } from './separateObjectsAndProperties'
import { insertStyleObjects } from './insertStyleObjects'

import { styleObj } from './createSortedStyleObject'

export const insertSortedStyles = (styleObj:styleObj, replaceLine:function, startLine:number = 0, indent:number = 0) => {
  const { propertyArr, objArr } = separateObjectsAndProperties(styleObj)

  let currentLine = insertSortedProperties(propertyArr, objArr, replaceLine, startLine, indent)
  currentLine = insertStyleObjects(objArr, styleObj, currentLine, indent, replaceLine)

  return currentLine
}
