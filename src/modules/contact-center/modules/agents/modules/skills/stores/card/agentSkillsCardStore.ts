import { AgentSkillsAPI } from '@webitel/api-services/api';
import type { EngineAgentSkill } from '@webitel/api-services/gen/models';
import { agentSkillSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { AgentSkillsNamespace } from '../namespace';

export const useAgentSkillsCardStore = createCardStore<EngineAgentSkill>({
	namespace: `${AgentSkillsNamespace}/card`,
	apiModule: AgentSkillsAPI,
	standardValidationSchema,
});
