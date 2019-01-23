import * as vscode from 'vscode'
import { insertIndent } from './insertIndent'

interface editObject {
  replace: function,
}

export const replaceLineWrapper = (fileName: string, edit: editObject) => (text: string, lineNumber: string, indent: number) => {
  const { Position, Range, Uri } = vscode
  const uri = Uri.file(fileName)
  const newLine = insertIndent(text, indent)
  const start = new Position(+lineNumber, 0)
  const end = new Position(+lineNumber, 140)

  edit.replace(uri, new Range(start, end), newLine)
}
