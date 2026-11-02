import { SkillsAPI } from '@webitel/api-services/api';
import type { EngineSkill } from '@webitel/api-services/gen/models';
import { skillSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { SkillsNamespace } from '../namespace';

export const useSkillsCardStore = createCardStore<EngineSkill>({
	namespace: `${SkillsNamespace}/card`,
	apiModule: SkillsAPI,
	standardValidationSchema,
});
