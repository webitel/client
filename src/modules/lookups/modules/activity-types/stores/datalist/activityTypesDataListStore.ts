import { OnlineSkillsAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';
import { ActivityTypesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useActivityTypesDataListStore = createTableStore(
	`${ActivityTypesNamespace}/datalist`,
	{
		apiModule: OnlineSkillsAPI,
		headers,
	},
);
