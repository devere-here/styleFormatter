import * as vscode from 'vscode';
import sortProperties from './commands/sortProperties'

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(sortProperties);
}

// this method is called when your extension is deactivated
export function deactivate() {}
