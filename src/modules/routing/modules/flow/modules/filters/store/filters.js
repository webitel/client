import ApiFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/ApiFilterSchema';
import { EngineRoutingSchemaType } from 'webitel-sdk';
import BaseFilterSchema from '../../../../../../_shared/filters/store/BaseFilterSchema';
import FiltersStoreModule
  from '../../../../../../_shared/filters/store/FiltersStoreModule';
import FlowsAPI from '../../../api/flow';

const state = {
  page: new BaseFilterSchema({
    value: 1,
    defaultValue: 1,
  }),
  size: new BaseFilterSchema({
    value: 10,
    defaultValue: 10,
  }),
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
    // if only 1 checkbox is selected, returned value is string
    restore: (value) => (Array.isArray(value) ? value : [value]),
  }),
  tags: new ApiFilterSchema({
    value: [],
    defaultValue: [],
    API: FlowsAPI.getFlowTags,
    locale: { label: ['vocabulary.tag', 2] },
    storedProp: 'name',
  }),
};

export default new FiltersStoreModule().getModule({ state });
