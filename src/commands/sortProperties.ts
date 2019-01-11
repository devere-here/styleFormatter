import * as vscode from 'vscode'

let sortProperties = vscode.commands.registerCommand('extension.sortProperties', () => {
  const { window, workspace, WorkspaceEdit } = vscode
  const documentData = window.activeTextEditor.document
  const edit = new WorkspaceEdit()

  console.log('createSortedStyleObject', createSortedStyleObject)

  const styleObj = createSortedStyleObject(documentData)
  const replaceLine = replaceLineWrapper(documentData.fileName, edit)
  const currentLine = insertSortedStyles(styleObj, replaceLine)

  deleteExtraLines(currentLine, documentData.lineCount, replaceLine)

  workspace.applyEdit(edit)
});

// const isStyleExtension = (extension: string) => {
// 	if (extension === 'css' || extension === 'scss'){
// 		return true
// 	}
// 	return false
// }

// const createSortedStyleObject = (documentData: Object) => {

//   const extensionIdx = documentData.fileName.lastIndexOf(".")
//   const extension = documentData.fileName.slice(extensionIdx + 1)
//   const currentStack = []

//   if (isStyleExtension(extension)) {
//     let currentObj = {}
//     currentStack[0] = currentObj

//     for (let i = 0; i < documentData.lineCount; i++) {
//       let line = documentData.lineAt(i).text
//       line = line.trim()
//       if (line.includes('{')) {
//         currentStack[0][line] = {}
//         currentStack.unshift(currentStack[0][line])
//         currentObj = currentStack[0]
//       }
//       else if (line.includes('}')) {
//         currentStack.shift()
//       }
//       else {
//         currentObj[line] = ''
//       }
//     }
//   }

//   return currentStack[0]
// }

// const insertSortedStyles = (styleObj, replaceLine, startLine = 0, indent = 0) => {
//   const { propertyArr, objArr } = separateObjectsAndProperties(styleObj)

//   let currentLine = insertSortedProperties(propertyArr, objArr, replaceLine, startLine, indent)
//   currentLine = insertStyleObjects(objArr, styleObj, currentLine, indent, replaceLine)

//   return currentLine
// }



// const replaceLineWrapper = (fileName, edit) => (text, lineNumber, indent) => {
//   const { Position, Range, Uri } = vscode
//   const uri = Uri.file(fileName)
//   const newLine = insertIndent(text, indent)
//   const start = new Position(+lineNumber, 0)
//   const end = new Position(+lineNumber, 140)

//   edit.replace(uri, new Range(start, end), newLine)
// }



// const insertIndent = (text, indent) => {
//   let str = ''

//   for (let i = 0; i < indent; i++){
//     str += ' '
//   }

//   return str.concat(text)
// }



// const deleteExtraLines = (currentLine, lineCount, replaceLine) => {
//   for (let i = currentLine; i < lineCount; i++) {
//     replaceLine('', i, 0)
//   }
// }

// const separateObjectsAndProperties = (styleObj) => {
//   const propertyArr = []
//   const objArr = []

//   for (const key in styleObj) {
//     if (key && typeof styleObj[key] === 'string') {
//       propertyArr.push(key)
//     } else if (typeof styleObj[key] === 'object') {
//       objArr.push(key)
//     }
//   }

//   return {
//     propertyArr,
//     objArr
//   }
// }

// const insertSortedProperties = (propertyArr, objArr, replaceLine, startLine, indent) => {
//   if (propertyArr.length) {
//     propertyArr.sort()
//     propertyArr.forEach(line => {
//       replaceLine(line, +startLine, indent)
//       startLine++
//     })

//     if (objArr.length) {
//       replaceLine('', +startLine, indent)
//       startLine++
//     }
//   }

//   return startLine
// }

// const insertStyleObjects = (objArr, styleObj, currentLine, indent, replaceLine, fileName, edit) => {
//   objArr.forEach(objKey => {
//     replaceLine(objKey, +currentLine, indent)
//     const newStartLine = insertSortedStyles(styleObj[objKey], replaceLine, ++currentLine, indent + 2)

//     currentLine = newStartLine
//     replaceLine('}', +currentLine, indent)
//     currentLine++
//   })

//   return currentLine
// }

export default sortProperties
