import * as vscode from 'vscode'

let sortProperties = vscode.commands.registerCommand('extension.sortProperties', () => {
  const { window, workspace, WorkspaceEdit } = vscode
  const documentData = window.activeTextEditor.document

  const styleObj = createNestedStyleObject(documentData)

  let edit = new WorkspaceEdit()
  edit = someFunc(styleObj, documentData.fileName, 0, 0, edit)

  workspace.applyEdit(edit)

  // const { workspace, WorkspaceEdit } = vscode;
  // const edit = new WorkspaceEdit();

  // for (const endLine in bracketPairs) {
  //   const startLine = bracketPairs[endLine]
  //   let index = startLine
  //   const lineArray = []

  //   while (index < endLine) {
  //     const line = documentData.lineAt(+index).text
  //     if (line) {
  //       lineArray.push(line)
  //     }
  //     index++
  //   }

  //   lineArray.sort()

  //   const { Position, Range, Uri } = vscode
  //   const uri = Uri.file(documentData.fileName)

  //   lineArray.forEach((line, idx) => {
  //     const start = new Position(+startLine + idx, 0)
  //     const end = new Position(+startLine + idx, 140)
  //     edit.replace(uri, new Range(start, end), line);
  //   })

 // }

  // workspace.applyEdit(edit);
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
      const line = documentData.lineAt(i).text
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

const someFunc = (styleObj, fileName, startLine, indent, edit) => {

  const { Position, Range, Uri } = vscode
  const uri = Uri.file(fileName)

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
      const start = new Position(+startLine, indent)
      const end = new Position(+startLine, 140)
      edit.replace(uri, new Range(start, end), line)
      console.log(startLine, ' - ', line)
      startLine++
    })
    const p1 = new Position(+startLine, indent)
    const p2 = new Position(+startLine, 140)
    edit.replace(uri, new Range(p1, p2), '')
    startLine++
  }

  objArr.forEach(objKey => {
    const start = new Position(+startLine, indent)
    const end = new Position(+startLine, 140)
    edit.replace(uri, new Range(start, end), objKey)
    console.log(startLine, ' - ', objKey)
    someFunc(styleObj[objKey], fileName, startLine + 1, 0, edit)
  })
  // startLine++
  // const p3 = new Position(+startLine, indent)
  // const p4 = new Position(+startLine, 140)
  // edit.replace(uri, new Range(p3, p4), '}')
  return edit
}

export default sortProperties
