import { TriggersAPI } from '@webitel/api-services/api';

import { TriggerEvents } from '../lookups/TriggerEvents.lookup';
import { TriggerObjects } from '../lookups/TriggerObjects.lookup';
import { TriggerTypes } from '../lookups/TriggerTypes.lookup';

/**
 * The shared client returns `type`, `event` and `object` as raw enum values.
 * The form binds them as lookup entries, whose labels are app-local i18n keys.
 */
const get = async ({ itemId }) => {
	const trigger = await TriggersAPI.get({
		itemId,
	});

	return {
		...trigger,
		type: TriggerTypes.find(({ value }) => value === trigger.type),
		event: TriggerEvents.find(({ value }) => value === trigger.event),
		object: TriggerObjects.find(({ value }) => value === trigger.object),
	};
};

export default {
	getList: (params) => TriggersAPI.getList(params),
	get,
	add: (params) => TriggersAPI.add(params),
	patch: (params) => TriggersAPI.patch(params),
	update: (params) => TriggersAPI.update(params),
	delete: (params) => TriggersAPI.delete(params),
	getLookup: (params) => TriggersAPI.getLookup(params),
	start: (params, item) => TriggersAPI.start(params, item),
};
