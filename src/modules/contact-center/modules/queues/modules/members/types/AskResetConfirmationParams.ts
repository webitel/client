import type { ActionOptions } from './ActionOptions';

export type AskResetConfirmationParams = {
	quantity: number;
	callback: () => unknown;
	scope: ActionOptions;
};
