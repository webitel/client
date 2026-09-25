import { createUserLogsActionFilterConfig } from './actionFilterConfig';
import { createUserLogsDateFilterConfig } from './dateFilterConfig';
import { createUserLogsObjectFilterConfig } from './objectFilterConfig';

export const UserLogsFilterOption = {
	Action: 'action',
	Object: 'object',
	From: 'from',
	To: 'to',
} as const;

export const filterConfigs = {
	[UserLogsFilterOption.Action]: createUserLogsActionFilterConfig(),
	[UserLogsFilterOption.Object]: createUserLogsObjectFilterConfig(),
	[UserLogsFilterOption.From]: createUserLogsDateFilterConfig(
		UserLogsFilterOption.From,
		'from',
	),
	[UserLogsFilterOption.To]: createUserLogsDateFilterConfig(
		UserLogsFilterOption.To,
		'to',
	),
};

export const filtersOptions = Object.values(filterConfigs);
