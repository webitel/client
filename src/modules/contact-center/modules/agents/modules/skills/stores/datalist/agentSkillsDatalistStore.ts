import { AgentSkillsAPI } from '@webitel/api-services/api';
import type { EngineAgentSkill } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { AgentSkillsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useAgentSkillsDatalistStore = createTableStore<EngineAgentSkill>(
	`${AgentSkillsNamespace}/datalist`,
	{
		apiModule: AgentSkillsAPI,
		disablePersistence: true,
		headers,
	},
);
