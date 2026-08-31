import { QueueSkillsAPI } from '@webitel/api-services/api';
import type { EngineQueueSkill } from '@webitel/api-services/gen/models';
import { queueSkillSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { QueueSkillsNamespace } from '../namespace';

export const useQueueSkillsCardStore = createCardStore<EngineQueueSkill>({
	namespace: `${QueueSkillsNamespace}/card`,
	apiModule: QueueSkillsAPI,
	standardValidationSchema,
});
