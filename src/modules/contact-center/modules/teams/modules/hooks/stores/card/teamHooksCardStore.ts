import { TeamHooksAPI } from '@webitel/api-services/api';
import type { EngineTeamHook } from '@webitel/api-services/gen/models';
import { teamHookSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { TeamHooksNamespace } from '../namespace';

export const useTeamHooksCardStore = createCardStore<EngineTeamHook>({
	namespace: `${TeamHooksNamespace}/card`,
	apiModule: TeamHooksAPI,
	standardValidationSchema,
});
