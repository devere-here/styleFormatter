import * as vscode from 'vscode';

let sortProperties = vscode.commands.registerCommand('extension.sortProperties', () => {
  const { window } = vscode;
  const documentData = window.activeTextEditor.document;

  const extensionIdx = documentData.fileName.lastIndexOf(".");
  const extension = documentData.fileName.slice(extensionIdx + 1);

  if (isStyleExtension(extension)) {
    let currentObj = {};
    const currentStack = [];
    currentStack[0] = currentObj;

    for (let i = 0; i < documentData.lineCount; i++) {
      const line = documentData.lineAt(i).text;
      if (line.includes('{')) {
        currentStack[0][line] = {};
        currentStack.unshift(currentStack[0][line]);
        currentObj = currentStack[0];
      }
      else if (line.includes('}')) {
        currentStack.shift();
      }
      else {
        currentObj[line] = ''
      }
    }

    console.log('currentStack[0] is', currentStack[0]);
    console.log('topicGroup is', currentStack[0]['.topicGroup {:'])
  }

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

export default sortProperties
