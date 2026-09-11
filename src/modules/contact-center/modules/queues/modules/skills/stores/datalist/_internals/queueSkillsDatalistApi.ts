import { QueueSkillsAPI } from '@webitel/api-services/api';
import type { EngineQueueSkill } from '@webitel/api-services/gen/models';

interface GetListParams {
	fields?: string[];
	[key: string]: unknown;
}

/** the capacity column sorts on `max_capacity`, so nothing asked for the min — WTEL-10299 */
const withMinCapacityField = (fields: string[] = []) =>
	fields.includes('max_capacity') && !fields.includes('min_capacity')
		? [
				...fields,
				'min_capacity',
			]
		: fields;

/** the wire omits a capacity at its proto3 default; 0 beats a blank side of the dash */
const withCapacityDefaults = (item: EngineQueueSkill): EngineQueueSkill => ({
	minCapacity: 0,
	maxCapacity: 0,
	...item,
});

/** `fields` is derived from the shown headers, one per header — one short of "min - max" */
export const QueueSkillsDatalistAPI = {
	...QueueSkillsAPI,
	getList: async (params: GetListParams) => {
		const { items, next } = await QueueSkillsAPI.getList({
			...params,
			fields: withMinCapacityField(params.fields),
		});

		return {
			items: (items as EngineQueueSkill[]).map(withCapacityDefaults),
			next,
		};
	},
};
