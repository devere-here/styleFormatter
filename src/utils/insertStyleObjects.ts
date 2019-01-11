const insertStyleObjects = (objArr, styleObj, currentLine, indent, replaceLine) => {
  objArr.forEach(objKey => {
    replaceLine(objKey, +currentLine, indent)
    const newStartLine = insertSortedStyles(styleObj[objKey], replaceLine, ++currentLine, indent + 2)

    currentLine = newStartLine
    replaceLine('}', +currentLine, indent)
    currentLine++
  })

  return currentLine
}