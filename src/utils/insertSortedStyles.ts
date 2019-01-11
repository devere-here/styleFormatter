const insertSortedStyles = (styleObj, replaceLine, startLine = 0, indent = 0) => {
  const { propertyArr, objArr } = separateObjectsAndProperties(styleObj)

  let currentLine = insertSortedProperties(propertyArr, objArr, replaceLine, startLine, indent)
  currentLine = insertStyleObjects(objArr, styleObj, currentLine, indent, replaceLine)

  return currentLine
}
