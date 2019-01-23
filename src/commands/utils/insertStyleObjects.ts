import { insertSortedStyles } from './insertSortedStyles'
import { styleObj } from './createSortedStyleObject'
import { objArr } from './insertSortedProperties'

export const insertStyleObjects = (objArr: objArr, styleObj: styleObj, currentLine: number, indent: number, replaceLine: function) => {
  objArr.forEach((objKey: number) => {
    replaceLine(objKey, +currentLine, indent)
    const newStartLine = insertSortedStyles(styleObj[objKey], replaceLine, ++currentLine, indent + 2)

    currentLine = newStartLine
    replaceLine('}', +currentLine, indent)
    currentLine++
  })

  return currentLine
}
