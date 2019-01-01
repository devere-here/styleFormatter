import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		const { window, WorkspaceEdit, Uri, Position, workspace } = vscode;
		const documentData = window.activeTextEditor.document;

		const extensionIdx = documentData.fileName.lastIndexOf(".");
		const extension = documentData.fileName.slice(extensionIdx + 1);
		const edit = new WorkspaceEdit();
		const uri = Uri.file(documentData.fileName);
		const bracketPairs:object = {}
		const openingBracketStack = []

		if (isStyleExtension(extension)) {
			for (let i = 0; i < documentData.lineCount; i++){
				const line = documentData.lineAt(i).text;
				if (line.includes('{')) {
					openingBracketStack.push(i + 1)
				}
				if (line.includes('}')) {
					bracketPairs[i] = openingBracketStack.pop()
				}
			}
		}

		for (const endLine in bracketPairs){
			const startLine = bracketPairs[endLine]
			let index = startLine
			const lineArray = []

			while (index < endLine){
				const line = documentData.lineAt(+index).text
				if (line) {
					lineArray.push(line)
				}
				index++
			}

			lineArray.sort()
			lineArray.forEach((line, idx) => {
				edit.insert(uri, new Position(startLine + idx, 0), line);
			})

		}

		workspace.applyEdit(edit);
	});

	context.subscriptions.push(disposable);
}

const isStyleExtension = (extension: string) => {
	if (extension === 'css' || extension === 'scss'){
		return true
	}
	return false
}

// this method is called when your extension is deactivated
export function deactivate() {}
