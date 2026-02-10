import { SpecialGlobalAction } from '@webitel/ui-sdk/modules/Userinfo'

import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import PermissionsStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/PermissionsStoreModule/PermissionsStoreModule';
import UsersAPI from '../api/users';
import Users2faAPI from '../api/users-2fa.js';
import logs from '../modules/logs/store/logs';
import tokens from '../modules/tokens/store/usersTokens';
import headers from './_internals/headers';
import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';


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
    chatName: '',
    forcePasswordChange: false,
  },
};

const getters = {
  IS_DISPLAY_QR_CODE: (state, getters, rootState, rootGetters) => {
    const userinfoStore = useUserinfoStore();

    return userinfoStore.hasSpecialGlobalActionAccess(SpecialGlobalAction.ChangeUserPassword) && !!state.itemInstance.totpUrl
  }
};

const actions = {
  ADD_VARIABLE_PAIR: (context) => {
    const pair = { key: '', value: '' };
    context.commit('ADD_VARIABLE_PAIR', pair);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  SET_VARIABLE_PROP: (context, { index, prop, value }) => {
    context.commit('SET_VARIABLE_PROP', {
      index,
      prop,
      value,
    });
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  DELETE_VARIABLE_PAIR: (context, index) => {
    context.commit('DELETE_VARIABLE_PAIR', index);
    context.commit('SET_ITEM_PROPERTY', {
      prop: '_dirty',
      value: true,
    });
  },
  SET_USER_DND: async (context, { item, value }) => {
    const dnd = value ? 'dnd' : '';
    const changes = { status: dnd };
    try {
      await UsersAPI.patchUserPresence({
        id: item.id,
        changes,
      });
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
  REGENERATE_2FA_URL: async (context) => {
    try {
      await Users2faAPI.generate({
        id: context.state.itemId,
      });
      await context.dispatch('LOAD_ITEM');
    } catch (err) {
      throw err;
    }
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

const users = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(UsersAPI)
  .generateAPIActions()
  .setChildModules({ tokens, logs, permissions })
  .getModule({ getters, actions, mutations });

export default users;
