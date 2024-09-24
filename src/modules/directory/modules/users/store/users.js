import {
  createApiStoreModule,
  createBaseStoreModule,
  createCardStoreModule,
  createTableStoreModule,
} from '@webitel/ui-sdk/store';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import UsersAPI from '../api/users';
import Users2faAPI from '../api/users-2fa.js';
import filters from '../modules/filters/store/filters.store.js';
import logs from '../modules/logs/store/logs.js';
import tokens from '../modules/tokens/store/usersTokens.js';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    email: '',
    username: '',
    password: '',
    extension: '',
    roles: [],
    device: {},
    license: [],
    devices: [],
    presence: {
      status: '',
      note: '',
    },
    variables: [],
    totpUrl: '',
    contact: {},
  },
};

const tableActions = {
  SET_USER_DND: async (context, { item, value }) => {
    const dnd = value ? 'dnd' : '';
    const changes = { status: dnd };
    try {
      await UsersAPI.patchUserPresence({
        id: item.id,
        changes,
      });
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
};

const cardGetters = {
  IS_DISPLAY_QR_CODE: (state, getters, rootState, rootGetters) =>
    rootGetters['userinfo/IS_CHANGE_USER_PASSWORD_ALLOW'] && !!state.itemInstance.totpUrl,
};

const cardActions = {
  REGENERATE_2FA_URL: async (context) => {
    await Users2faAPI.generate({
      id: context.state.itemId,
    });
    await context.dispatch('LOAD_ITEM');
  },
};

const PERMISSIONS_API_URL = '/users';
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const api = createApiStoreModule({
  state: {
    api: UsersAPI,
  },
});

const table = createTableStoreModule({
  state: {
    headers,
  },
  actions: tableActions,
  modules: {
    filters,
    api,
  },
});

const card = createCardStoreModule({
  state: { _resettable: resettableState },
  getters: cardGetters,
  actions: cardActions,
  modules: {
    api,
    tokens,
    logs,
  },
});

const users = createBaseStoreModule({
  modules: {
    table,
    card,
  },
});

export default users;
