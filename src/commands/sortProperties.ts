import * as vscode from 'vscode'
import { createSortedStyleObject } from './utils/createSortedStyleObject'
import { replaceLineWrapper } from './utils/replaceLineWrapper'
import { insertSortedStyles } from './utils/insertSortedStyles'
import { deleteExtraLines } from './utils/deleteExtraLines'

let sortProperties = vscode.commands.registerCommand('extension.sortProperties', () => {
  const { window, workspace, WorkspaceEdit } = vscode
  const documentData = window.activeTextEditor.document
  const edit = new WorkspaceEdit()

  const styleObj = createSortedStyleObject(documentData)
  const replaceLine = replaceLineWrapper(documentData.fileName, edit)
  const currentLine = insertSortedStyles(styleObj, replaceLine)

  deleteExtraLines(currentLine, documentData.lineCount, replaceLine)

  workspace.applyEdit(edit)
});

export default sortProperties
