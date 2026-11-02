import { CommunicationsAPI } from '@webitel/api-services/api';
import type { EngineCommunicationType } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { CommunicationTypesNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useCommunicationTypesDatalistStore =
	createTableStore<EngineCommunicationType>(
		`${CommunicationTypesNamespace}/datalist`,
		{
			apiModule: CommunicationsAPI,
			headers,
		},
	);
