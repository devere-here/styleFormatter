import * as vscode from 'vscode'

let sortProperties = vscode.commands.registerCommand('extension.sortProperties', () => {
  const { window, workspace, WorkspaceEdit } = vscode
  const documentData = window.activeTextEditor.document

  const styleObj = createNestedStyleObject(documentData)

  const edit = new WorkspaceEdit()
  const replaceLine = replaceLineWrapper(documentData.fileName, edit)

  const editObj = someFunc(styleObj, documentData.fileName, 0, 0, edit, replaceLine)

  let { newStartLine } = editObj

  for (let i = newStartLine; i < documentData.lineCount; i++) {
    replaceLine('', i, 0)
  }

  workspace.applyEdit(edit)

});

const isStyleExtension = (extension: string) => {
	if (extension === 'css' || extension === 'scss'){
		return true
	}
	return false
}

const createNestedStyleObject = (documentData: Object) => {

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

const someFunc = (styleObj, fileName, startLine, indent, edit, replaceLine) => {

  const stringArr = []
  const objArr = []

  for (const key in styleObj) {
    if (key && typeof styleObj[key] === 'string') {
      stringArr.push(key)
    } else if (typeof styleObj[key] === 'object') {
      objArr.push(key)
    }
  }

  if (stringArr.length) {
    stringArr.sort()
    stringArr.forEach((line, idx) => {
      replaceLine(line, +startLine, indent)
      startLine++
    })

    if (objArr.length) {
      replaceLine('', +startLine, indent)
      startLine++
    }
  }

  objArr.forEach(objKey => {
    replaceLine(objKey, +startLine, indent)
    const editObj = someFunc(styleObj[objKey], fileName, ++startLine, indent + 2, edit, replaceLine)

    let { newStartLine } = editObj

    startLine = newStartLine
    replaceLine('}', +startLine, indent)
    startLine++
  })

  return { edit, newStartLine: startLine }
}

const replaceLineWrapper = (fileName, edit) => (text, lineNumber, indent) => {
  const { Position, Range, Uri } = vscode
  const uri = Uri.file(fileName)
  const newLine = insertIndent(text, indent)
  const start = new Position(+lineNumber, 0)
  const end = new Position(+lineNumber, 140)

  edit.replace(uri, new Range(start, end), newLine)
}

const insertIndent = (text, indent) => {
  let str = ''

  for (let i = 0; i < indent; i++){
    str += ' '
  }

  return str.concat(text)
}

export default sortProperties
