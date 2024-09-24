import {
  createApiStoreModule,
  createBaseStoreModule,
  createCardStoreModule,
  createTableStoreModule,
} from '@webitel/ui-sdk/store';
import UserTokensAPI from '../api/userTokens.js';
import filters from '../modules/filters/store/filters.store.js';
import headers from './_internals/headers.js';

const resettableItemState = {
  itemInstance: {
    token: '',
    usage: '',
  },
};

const getters = {
  PARENT_ID: (s, g, rootState) => rootState.directory.users.card.itemId,
};

const cardActions = {
  ADD_TOKEN: async (context) => {
    const { token } = await context.dispatch('api/POST_ITEM', { context });
    return context.dispatch('SET_ITEM_PROPERTY', { path: 'token', value: token });
  },
};

const api = createApiStoreModule({
  state: {
    api: UserTokensAPI,
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

const original = table.actions.LOAD_DATA_LIST;

table.actions.LOAD_DATA_LIST = (context) => {
  if (!context.getters.PARENT_ID) return;

  return original(context);
};

const card = createCardStoreModule({
  state: { _resettable: resettableItemState },
  getters,
  actions: cardActions,
  modules: {
    api,
  },
});

const userTokens = createBaseStoreModule({
  modules: {
    table,
    card,
  },
});

export default userTokens;
