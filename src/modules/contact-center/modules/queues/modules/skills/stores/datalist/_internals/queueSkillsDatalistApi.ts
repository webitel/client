import { QueueSkillsAPI } from '@webitel/api-services/api';
import type { EngineQueueSkill } from '@webitel/api-services/gen/models';

interface GetListParams {
	fields?: string[];
	[key: string]: unknown;
}

/**
 * The capacity column renders "min - max", but a header carries a single api
 * field — `max_capacity`, which the column also sorts on. Left alone,
 * `min_capacity` is never requested, so every row reads "0 - max".
 */
const withMinCapacityField = (fields: string[] = []) =>
	fields.includes('max_capacity') && !fields.includes('min_capacity')
		? [
				...fields,
				'min_capacity',
			]
		: fields;

/**
 * The wire drops either capacity at its proto3 default, so a real 0 arrives as
 * an absent field. Filled here rather than in the template, which would
 * otherwise render a blank on one side of the dash.
 */
const withCapacityDefaults = (item: EngineQueueSkill): EngineQueueSkill => ({
	minCapacity: 0,
	maxCapacity: 0,
	...item,
});

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
