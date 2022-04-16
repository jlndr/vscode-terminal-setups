import * as vscode from 'vscode';

import type { TerminalConfig } from './types';

export default function openTerminals(terminalsToRun: TerminalConfig[], split = false) {
	// Default location to panel
	let location: vscode.TerminalSplitLocationOptions | vscode.TerminalLocation = vscode.TerminalLocation.Panel;

	for (const t of terminalsToRun) {
		// If we have nested terminals aka splits
		if (Array.isArray(t)) {
			openTerminals(t, true);
		} else {
			const termOpt: vscode.TerminalOptions = {
				name: t.name,
				color: new vscode.ThemeColor(t.color),
				iconPath: new vscode.ThemeIcon(t.icon),
				location: location, // Default to normal terminal panel
			};

			const term = vscode.window.createTerminal(termOpt);

			if (split && location === vscode.TerminalLocation.Panel) {
				location = {
					parentTerminal: term,
				};
			}

			if (t.cmd) {
				term.sendText(t.cmd);
			}

			//HACK Terminals is often unresponsive at first without this
			term.show(true);
		}
	}
}
