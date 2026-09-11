import type { EngineQueueSkill } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueSkillsNamespace } from '../namespace';
import { headers } from './_internals/headers';
import { QueueSkillsDatalistAPI } from './_internals/queueSkillsDatalistApi';

export const useQueueSkillsDatalistStore = createTableStore<EngineQueueSkill>(
	`${QueueSkillsNamespace}/datalist`,
	{
		// wraps the api to also ask for `min_capacity` — see the module
		apiModule: QueueSkillsDatalistAPI,
		// every tab on the queue card shares one url — see the hooks store
		disablePersistence: true,
		headers,
	},
);
