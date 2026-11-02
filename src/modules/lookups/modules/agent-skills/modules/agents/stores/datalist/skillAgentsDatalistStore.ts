import { SkillAgentsAPI } from '@webitel/api-services/api';
import type { EngineSkillAgentItem } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { SkillAgentsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useSkillAgentsDatalistStore =
	createTableStore<EngineSkillAgentItem>(`${SkillAgentsNamespace}/datalist`, {
		apiModule: SkillAgentsAPI,
		disablePersistence: true,
		headers,
	});
