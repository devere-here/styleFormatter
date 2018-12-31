// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
		console.log('Congratulations, your extension "styleformatter" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('extension.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		const { window } = vscode;
		const documentData = window.activeTextEditor.document;

		const extensionIdx = documentData.fileName.lastIndexOf(".");
		const extension = documentData.fileName.slice(extensionIdx + 1);
		const bracketPairs:object = {}
		const openingBracketStack = []

		if (isStyleExtension(extension)) {
			for (let i = 0; i < documentData.lineCount; i++){
				const line = documentData.lineAt(i).text;
				if (line.includes('{')) {
					openingBracketStack.push(i + 1)
				}
				if (line.includes('}')) {
					bracketPairs[i + 1] = openingBracketStack.pop()
				}
			}
		}

		for (const endLine in bracketPairs){
			console.log('startLine is', bracketPairs[endLine])
			console.log('endline is', endLine)
		}

		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World!');
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
