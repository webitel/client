import tokens from '../modules/tokens/store/usersTokens';
import UsersAPI from '../api/users';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule';

const resettableState = {
  itemInstance: {
    name: '',
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

const actions = {
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
  SET_USER_DND: async (context, { item, value }) => {
    const dnd = value ? 'dnd' : '';
    const changes = { status: dnd };
    try {
      await context.dispatch('PATCH_ITEM', { id: item.id, changes });
    } catch (err) {
      throw err;
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('directory/users/tokens/RESET_STATE', {}, { root: true });
  },
};

const mutations = {
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

const users = new ObjectStoreModule({ resettableState })
  .attachAPIModule(UsersAPI)
  .generateAPIActions()
  .setChildModules({ tokens, permissions })
  .getModule({ actions, mutations });

export default users;
