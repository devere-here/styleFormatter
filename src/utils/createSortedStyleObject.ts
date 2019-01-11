const createSortedStyleObject = (documentData: Object) => {

  const extensionIdx = documentData.fileName.lastIndexOf(".")
  const extension = documentData.fileName.slice(extensionIdx + 1)
  const currentStack = []

  if (isStyleExtension(extension)) {
    let currentObj = {}
    currentStack[0] = currentObj

    for (let i = 0; i < documentData.lineCount; i++) {
      let line = documentData.lineAt(i).text
      line = line.trim()
      if (line.includes('{')) {
        currentStack[0][line] = {}
        currentStack.unshift(currentStack[0][line])
        currentObj = currentStack[0]
      }
      else if (line.includes('}')) {
        currentStack.shift()
      }
      else {
        currentObj[line] = ''
      }
    }
  }

  return currentStack[0]
}
