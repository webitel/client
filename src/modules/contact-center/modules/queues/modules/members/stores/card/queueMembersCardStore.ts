import { QueueMembersAPI } from '@webitel/api-services/api';
import type { EngineMemberInQueue } from '@webitel/api-services/gen/models';
import { queueMemberSchema as standardValidationSchema } from '@webitel/api-services/validations';
import { createCardStore } from '@webitel/ui-datalist/card';

import { QueueMembersNamespace } from '../namespace';

export const useQueueMembersCardStore = createCardStore<EngineMemberInQueue>({
	namespace: `${QueueMembersNamespace}/card`,
	apiModule: QueueMembersAPI,
	standardValidationSchema,
});
