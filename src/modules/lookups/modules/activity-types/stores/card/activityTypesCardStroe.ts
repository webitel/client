import { OnlineSkillsAPI } from '@webitel/api-services/api';
import { onlineSkillSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';
import { ActivityTypesNamespace } from '../namespace';

export const useActivityTypesCardStore = createCardStore({
	namespace: `${ActivityTypesNamespace}/card`,
	apiModule: OnlineSkillsAPI,
	standardValidationSchema,
});
