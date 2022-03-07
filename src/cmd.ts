import * as vscode from 'vscode';
import openTerminals from './utils/openTerminals';

import type { QuickPickItem, Setup } from './utils/types';

const openSetup = async () => {
	//TODO Change from 'settings.json'
	const setups = vscode.workspace.getConfiguration('terminalSetups').get<Setup[]>('setups');
	if (!setups) return;
	if (!setups.length) return;

	const quickPickItems: QuickPickItem[] = setups.map((s, idx) => {
		let item = {
			idx,
			label: s.name,
		} as QuickPickItem;

		let desc = 'Terminals: ';

		for (const [i, t] of s.terminals.entries()) {
			desc += `${t.name}${i < s.terminals.length - 1 ? ', ' : ''}`;
		}

		item.description = desc || undefined;

		return item;
	});

	let terminalsToRun = setups[0].terminals;

	if (setups.length > 1) {
		const chosenSetup: QuickPickItem | undefined = await vscode.window.showQuickPick(quickPickItems);
		if (!chosenSetup) {
			return;
		}

		terminalsToRun = setups[chosenSetup.idx].terminals;
	}

	openTerminals(terminalsToRun);
};

const openDefaultSetup = async () => {
	const setups = vscode.workspace.getConfiguration('terminalSetups').get<Setup[]>('setups');
	if (!setups) return;
	if (!setups.length) return;

	const defaultSetups = setups.filter((s) => s.default);

	const defaultSetup = defaultSetups?.length ? defaultSetups[0] : setups[0];
	if (!defaultSetup) return;

	const terminalsToRun = defaultSetup.terminals;

	openTerminals(terminalsToRun);
};

export { openSetup, openDefaultSetup };
