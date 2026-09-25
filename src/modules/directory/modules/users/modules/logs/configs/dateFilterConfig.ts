import type { BaseFilterConfig } from '@webitel/ui-datalist/filters';

import UserLogsDateFilterValueField from '../components/filters/user-logs-date-filter-value-field.vue';

export interface UserLogsDateFilterConfig extends BaseFilterConfig {
	bound: 'from' | 'to';
}

export const createUserLogsDateFilterConfig = (
	name: string,
	bound: 'from' | 'to',
): UserLogsDateFilterConfig => ({
	name,
	bound,
	valueInputComponent: UserLogsDateFilterValueField,
	valuePreviewComponent: UserLogsDateFilterValueField,
	notDeletable: false,
	showFilterName: false,
});
