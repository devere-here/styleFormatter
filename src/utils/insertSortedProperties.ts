const insertSortedProperties = (propertyArr, objArr, replaceLine, startLine, indent) => {
  if (propertyArr.length) {
    propertyArr.sort()
    propertyArr.forEach(line => {
      replaceLine(line, +startLine, indent)
      startLine++
    })

    if (objArr.length) {
      replaceLine('', +startLine, indent)
      startLine++
    }
  }

  return startLine
}
