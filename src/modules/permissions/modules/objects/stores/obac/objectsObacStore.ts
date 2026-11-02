import { ObjectClassesAPI } from '@webitel/api-services/api';
import {
	createPermissionsStore,
	headersWithCreate,
} from '@webitel/ui-datalist/permissions';

import { ObjectsNamespace } from '../namespace';

/** [Claude] OBAC of an object class: the usual acl, plus the "create" rule */
export const useObjectsObacStore = createPermissionsStore(
	`${ObjectsNamespace}/obac`,
	{
		apiModule: ObjectClassesAPI,
		headers: headersWithCreate,
	},
);
