import type { BaseFilterConfig } from '@webitel/ui-datalist/filters';

import UserLogsActionFilterValueField from '../components/filters/user-logs-action-filter-value-field.vue';

export const createUserLogsActionFilterConfig = (): BaseFilterConfig => ({
	name: 'action',
	valueInputComponent: UserLogsActionFilterValueField,
	valuePreviewComponent: UserLogsActionFilterValueField,
	notDeletable: false,
	showFilterName: false,
});
