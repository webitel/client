import CardStoreModule
  from '@webitel/ui-sdk/src/modules/CardStoreModule/store/CardStoreModule';
import TableStoreModule
  from '@webitel/ui-sdk/src/modules/TableStoreModule/store/TableStoreModule';
import ApiStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/ApiStoreModule';
import BaseStoreModule
  from '@webitel/ui-sdk/src/store/BaseStoreModules/BaseStoreModule';
import PermissionsStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import UsersAPI from '../api/users';
import tokens from '../modules/tokens/store/usersTokens';
import headers from './_internals/headers';

const cardState = {
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
  },
};

const tableActions = {
  SET_USER_DND: async (context, { item, value }) => {
    const dnd = value ? 'dnd' : '';
    const changes = { status: dnd };
    try {
      await UsersAPI.patchUserPresence({ id: item.id, changes });
    } catch (err) {
      throw err;
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
};

const cardActions = {
  ADD_VARIABLE_PAIR: (context) => {
    const pair = { key: '', value: '' };
    context.commit('ADD_VARIABLE_PAIR', pair);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  SET_VARIABLE_PROP: (context, { index, prop, value }) => {
    context.commit('SET_VARIABLE_PROP', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  DELETE_VARIABLE_PAIR: (context, index) => {
    context.commit('DELETE_VARIABLE_PAIR', index);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('directory/users/tokens/RESET_STATE', {}, { root: true });
  },
};

const cardMutations = {
  ADD_VARIABLE_PAIR: (state, pair) => {
    state.itemInstance.variables.push(pair);
  },
  SET_VARIABLE_PROP: (state, { index, prop, value }) => {
    state.itemInstance.variables[index][prop] = value;
  },
  DELETE_VARIABLE_PAIR: (state, index) => {
    state.itemInstance.variables.splice(index, 1);
  },
};

const PERMISSIONS_API_URL = '/users';
const permissions = new PermissionsStoreModule()
  .generateAPIActions(PERMISSIONS_API_URL)
  .getModule();

const api = new ApiStoreModule()
  .generateAPIActions(UsersAPI)
  .getModule();

const table = new TableStoreModule({ headers })
  .setChildModules({ api })
  .getModule({ actions: tableActions });

const card = new CardStoreModule()
  .setChildModules({ api })
  .getModule({
    state: cardState,
    actions: cardActions,
    mutations: cardMutations,
  });

const users = new BaseStoreModule()
  .setChildModules({
    table,
    card,
    tokens,
    permissions,
  })
  .getModule();

export default users;
