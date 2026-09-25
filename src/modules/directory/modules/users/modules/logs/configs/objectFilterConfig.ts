import { ChangelogsAPI } from '@webitel/api-services/api';
import type { BaseFilterConfig } from '@webitel/ui-datalist/filters';

import UserLogsObjectFilterValueField from '../components/filters/user-logs-object-filter-value-field.vue';

export interface UserLogsObjectFilterConfig extends BaseFilterConfig {
	searchRecords: (params: Record<string, unknown>) => Promise<{
		items: unknown[];
		next?: boolean;
	}>;
}

export const createUserLogsObjectFilterConfig =
	(): UserLogsObjectFilterConfig => ({
		name: 'object',
		valueInputComponent: UserLogsObjectFilterValueField,
		valuePreviewComponent: UserLogsObjectFilterValueField,
		notDeletable: false,
		showFilterName: false,
		searchRecords: (params) =>
			ChangelogsAPI.getObjectsList({
				...params,
				includeExisting: true,
			}),
	});
