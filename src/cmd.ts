import * as vscode from 'vscode';

interface Terminal {
	cmd: string;
	color: string;
	icon: string;
	name: string;
}

interface Setup {
	name: string;
	terminals: Terminal[];
}

interface QuickPickItem extends vscode.QuickPickItem {
	idx: number;
}

const openSetup = async () => {
	//TODO Change from 'settings.json'
	const setups = vscode.workspace.getConfiguration('terminalSetups').get<Setup[]>('setups');

	if (!setups) {
		return;
	} else {
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

		const chosenSetup = await vscode.window.showQuickPick(quickPickItems);
		if (!chosenSetup) {
			return;
		}

		const terminalsToRun = setups[chosenSetup.idx].terminals;

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
};

export { openSetup };
