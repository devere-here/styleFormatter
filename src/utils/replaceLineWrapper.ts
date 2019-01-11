import * as vscode from 'vscode'

const replaceLineWrapper = (fileName, edit) => (text, lineNumber, indent) => {
  const { Position, Range, Uri } = vscode
  const uri = Uri.file(fileName)
  const newLine = insertIndent(text, indent)
  const start = new Position(+lineNumber, 0)
  const end = new Position(+lineNumber, 140)

  edit.replace(uri, new Range(start, end), newLine)
}
