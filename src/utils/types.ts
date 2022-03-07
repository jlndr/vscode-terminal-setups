import * as vscode from 'vscode';

import type { Icon } from './icons';
import type { Color } from './colors';

export interface Terminal {
	cmd: string;
	color: Color;
	icon: Icon;
	name: string;
}

export interface Setup {
	name: string;
	default: boolean;
	terminals: Terminal[];
}

export interface QuickPickItem extends vscode.QuickPickItem {
	idx: number;
}
