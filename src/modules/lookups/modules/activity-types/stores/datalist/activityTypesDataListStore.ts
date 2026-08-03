import { ActivityTypesAPI } from '@webitel/api-services/api';
import { ActivityTypesNamespace } from '../namespace';
import { createTableStore } from '@webitel/ui-datalist';
import { headers } from './_internals/headers';

export const useActivityTypesDataListStore = createTableStore(
  `${ActivityTypesNamespace}/datalist`,
  {
    apiModule: ActivityTypesAPI,
    headers
  }
);
