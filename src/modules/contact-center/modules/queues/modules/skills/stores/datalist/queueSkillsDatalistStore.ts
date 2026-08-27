import { QueueSkillsAPI } from '@webitel/api-services/api';
import type { EngineQueueSkill } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueSkillsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useQueueSkillsDatalistStore = createTableStore<EngineQueueSkill>(
	`${QueueSkillsNamespace}/datalist`,
	{
		apiModule: QueueSkillsAPI,
		// every tab on the queue card shares one url — see the hooks store
		disablePersistence: true,
		headers,
	},
);
