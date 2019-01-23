interface propertyArr {
  [index: number]: string,
  length: number,
  sort: function,
  forEach: function,
}

export interface objArr {
  [index: number]: object,
  length: number,
  forEach: function,
}

export const insertSortedProperties = (
  propertyArr: propertyArr,
  objArr: objArr,
  replaceLine: function,
  startLine: number,
  indent: number
  ) => {
  if (propertyArr.length) {
    propertyArr.sort()
    propertyArr.forEach((line: string) => {
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
