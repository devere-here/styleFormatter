import { isStyleExtension } from './isStyleExtension'

interface document {
  fileName: string,
  lineCount: number,
  lineAt: function,
}

interface styleObjStack {
  [index: number]: currentObj,
  shift: function,
  unshift: function
}

export interface styleObj {
  [index: string]: string | object,
}

export const createSortedStyleObject = (documentData: document) => {

  const extensionIdx:number = documentData.fileName.lastIndexOf(".")
  const extension:string = documentData.fileName.slice(extensionIdx + 1)
  const currentStack:styleObjStack = []

  if (isStyleExtension(extension)) {
    let currentObj:styleObj = {}
    currentStack[0] = currentObj

    for (let i = 0; i < documentData.lineCount; i++) {
      let line:string = documentData.lineAt(i).text
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
