import {
  createApiStoreModule,
  createBaseStoreModule,
  createTableStoreModule,
} from '@webitel/ui-sdk/store';
import LogsAPI from '../api/logs.js';
import filters from '../modules/filters/store/filters.js';
import headers from './_internals/headers.js';

const getters = {
  PARENT_ID: (s, g, rootState) => rootState.directory.users.card.itemId,
};

const api = createApiStoreModule({
  state: {
    api: LogsAPI,
  },
});

const table = createTableStoreModule({
  state: {
    headers,
  },
  getters,
  modules: {
    api,
    filters,
  },
});

const logs = createBaseStoreModule({
  modules: {
    table,
  },
});

export default logs;
