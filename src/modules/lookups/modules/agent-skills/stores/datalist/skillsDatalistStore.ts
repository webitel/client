import { SkillsAPI } from '@webitel/api-services/api';
import type { EngineSkill } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { SkillsNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useSkillsDatalistStore = createTableStore<EngineSkill>(
	`${SkillsNamespace}/datalist`,
	{
		apiModule: SkillsAPI,
		headers,
	},
);
