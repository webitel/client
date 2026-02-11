import ApiFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import BaseFilterSchema from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import QueryFiltersStoreModule from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import FlowsAPI from '../../../api/flow';

const state = {
	search: new BaseFilterSchema(),
	type: new BaseFilterSchema({
		value: [
			EngineRoutingSchemaType.Chat,
			EngineRoutingSchemaType.Voice,
			EngineRoutingSchemaType.Service,
			EngineRoutingSchemaType.Processing,
		],
		defaultValue: [
			EngineRoutingSchemaType.Chat,
			EngineRoutingSchemaType.Voice,
			EngineRoutingSchemaType.Service,
			EngineRoutingSchemaType.Processing,
		],
	}),
	tags: new ApiFilterSchema({
		value: [],
		defaultValue: [],
		API: FlowsAPI.getFlowTags,
		locale: {
			label: [
				'vocabulary.tag',
				2,
			],
		},
		storedProp: 'name',
	}),
};

export default new QueryFiltersStoreModule({
	state,
}).getModule();
