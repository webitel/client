import { createTableStore } from '@webitel/ui-datalist';
import { OAuthAppsAPI } from '@webitel/api-services/api';
import { SingleSignOnNamespace } from '../namespace';
import { headers } from './_internals/headers';

export const useSingleSignOnDataListStore = createTableStore(
  `${SingleSignOnNamespace}/datalist`,
  {
    apiModule: OAuthAppsAPI,
    headers,
  },
);
