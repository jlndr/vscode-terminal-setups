import * as vscode from 'vscode';

import type { Terminal } from './types';

export default function openTerminals(terminalsToRun: Terminal[]) {
	for (const t of terminalsToRun) {
		const termOpt: vscode.TerminalOptions = {
			name: t.name,
			color: new vscode.ThemeColor(t.color),
			iconPath: new vscode.ThemeIcon(t.icon),
		};

		const term = vscode.window.createTerminal(termOpt);

		if (t.cmd) {
			term.sendText(t.cmd);
		}

		//HACK Terminals is often unresponsive at first without this
		term.show(true);
	}
}
