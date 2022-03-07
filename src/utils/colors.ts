const colors = [
	'terminal.background',
	'terminal.border',
	'terminal.foreground',
	'terminal.ansiBlack',
	'terminal.ansiBlue',
	'terminal.ansiBrightBlack',
	'terminal.ansiBrightBlue',
	'terminal.ansiBrightCyan',
	'terminal.ansiBrightGreen',
	'terminal.ansiBrightMagenta',
	'terminal.ansiBrightRed',
	'terminal.ansiBrightWhite',
	'terminal.ansiBrightYellow',
	'terminal.ansiCyan',
	'terminal.ansiGreen',
	'terminal.ansiMagenta',
	'terminal.ansiRed',
	'terminal.ansiWhite',
	'terminal.ansiYellow',
	'terminal.selectionBackground',
] as const;

export default colors;

export type Color = typeof colors[number];
