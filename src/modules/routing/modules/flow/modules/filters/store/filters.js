import BaseFilterSchema
  from '@webitel/ui-sdk/src/modules/QueryFilters/classes/BaseFilterSchema';
import QueryFiltersStoreModule
  from '@webitel/ui-sdk/src/modules/QueryFilters/store/QueryFiltersStoreModule';
import { EngineRoutingSchemaType } from 'webitel-sdk';

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
};

export default new QueryFiltersStoreModule({ state }).getModule();
