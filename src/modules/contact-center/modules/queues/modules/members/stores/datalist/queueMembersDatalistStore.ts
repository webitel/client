import { QueueMembersAPI } from '@webitel/api-services/api';
import type { EngineMemberInQueue } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueMembersNamespace } from '../namespace';
import { headers } from './_internals/headers';

/**
 * Members have their own page and their own url, so unlike the queue card's
 * tabs this table keeps persistence.
 */
export const useQueueMembersDatalistStore =
	createTableStore<EngineMemberInQueue>(`${QueueMembersNamespace}/datalist`, {
		apiModule: QueueMembersAPI,
		headers,
	});
