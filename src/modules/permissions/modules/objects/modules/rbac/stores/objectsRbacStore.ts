import { ObjectClassesAPI } from '@webitel/api-services/api';
import { createTableStore } from '@webitel/ui-datalist';

import { ObjectsNamespace } from '../../../stores/namespace';
import { headers } from './_internals/headers';

/** [Claude] RBAC rows are addressed by their grantor, so they are patched by the tab itself, not by the store */
export const useObjectsRbacStore = createTableStore(
	`${ObjectsNamespace}/rbac`,
	{
		apiModule: {
			getList: ObjectClassesAPI.getRbacList,
		},
		headers,
		disablePersistence: true,
	},
);
