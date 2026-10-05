import { TeamHooksAPI } from '@webitel/api-services/api';
import type { EngineTeamHook } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { TeamHooksNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useTeamHooksDatalistStore = createTableStore<EngineTeamHook>(
	`${TeamHooksNamespace}/datalist`,
	{
		apiModule: TeamHooksAPI,
		disablePersistence: true,
		headers,
	},
);
