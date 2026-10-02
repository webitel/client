import { QueueMembersAPI } from '@webitel/api-services/api';
import type { EngineMemberCommunication } from '@webitel/api-services/gen/models';
import { createTableStore } from '@webitel/ui-datalist';

import { QueueMembersNamespace } from '../namespace';
import { communicationsHeaders } from './_internals/communicationsHeaders';

/** `parentId` is the member; the queue comes as a `queueId` filter, as in crm timeline */
export const getMemberCommunicationsList = ({
	parentId,
	queueId,
	...params
}: Record<string, unknown>) =>
	QueueMembersAPI.getCommunications({
		...params,
		parentId: queueId as string,
		memberId: parentId as string,
	});

/** one member's communications popup; no URL/localStorage persistence */
export const useQueueMemberCommunicationsDatalistStore =
	createTableStore<EngineMemberCommunication>(
		`${QueueMembersNamespace}/communications/datalist`,
		{
			apiModule: {
				getList: getMemberCommunicationsList,
			},
			headers: communicationsHeaders,
			disablePersistence: true,
			// `lazy` table: a next page is appended, not swapped in
			isAppendDataList: true,
		},
	);
