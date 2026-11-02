import { RolesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';
import { RolesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useRolesDatalistStore = createTableStore(
	`${RolesNamespace}/datalist`,
	{
		apiModule: RolesAPI,
		headers,
	},
);
