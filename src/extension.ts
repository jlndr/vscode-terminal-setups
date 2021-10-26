// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import { openSetup } from './cmd';

// TODO Add Create/Edit setup?
const CMDS = [
	{
		command: 'terminal-setups.openTerminalSetup',
		cmd: openSetup,
	},
];

export function activate(context: vscode.ExtensionContext) {
	for (const c of CMDS) {
		context.subscriptions.push(vscode.commands.registerCommand(c.command, c.cmd));
	}
}

export function deactivate() {}
