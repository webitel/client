import deepCopy from 'deep-copy';
import ApplicationsAccess from '@webitel/ui-sdk/src/modules/Userinfo/classes/ApplicationsAccess';
import RolesAPI from '../api/roles';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    permissions: [],
    metadata: {
      access: new ApplicationsAccess().getAccess(),
    },
  },
};

const actions = {
  GET_ITEM: (context) => RolesAPI.get({ ...context.state, query: { fields: '*,metadata.access' } }),
  ADD_ROLE_PERMISSION: (context, permission) => {
    const value = context.state.itemInstance.permissions.concat(permission);
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value });
  },
  UPDATE_ROLE_PERMISSION: (context, { index, permission }) => {
    const value = [...context.state.itemInstance.permissions];
    value.splice(index, 1, permission);
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value });
  },
  DELETE_ROLE_PERMISSION: (context, deleted) => {
    let action = 'DELETE_SINGLE_PERMISSION';
    if (Array.isArray(deleted)) {
      if (deleted.length) action = 'DELETE_BULK_PERMISSIONS';
      else action = 'DELETE_ALL_PERMISSIONS';
    }
    return context.dispatch(action, deleted);
  },
  DELETE_SINGLE_PERMISSION: (context, deleted) => {
    const permissions = [...context.state.itemInstance.permissions];
    const itemIndex = permissions.map((item) => item.id).indexOf(deleted.id);
    permissions.splice(itemIndex, 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value: permissions });
  },
  DELETE_BULK_PERMISSIONS: (context, deleted) => {
    const permissions = context.state.itemInstance.permissions
      .filter((perm) => !deleted.some((delPerm) => delPerm.id === perm.id));
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value: permissions });
  },
  DELETE_ALL_PERMISSIONS: (context) => {
    const permissions = [];
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value: permissions });
  },
  UPDATE_APPLICATION_ACCESS: (context, { app, value }) => {
    const access = deepCopy(context.state.itemInstance.metadata.access);
    access[app]._enabled = value;
    context.commit('SET_METADATA_PROPERTY', { prop: 'access', value: access });
  },
  UPDATE_APPLICATION_SECTION_ACCESS: (context, { app, section, value }) => {
    const access = deepCopy(context.state.itemInstance.metadata.access);
    access[app][section]._enabled = value;
    context.commit('SET_METADATA_PROPERTY', { prop: 'access', value: access });
  },
};

const mutations = {
  SET_METADATA_PROPERTY: (state, { prop, value }) => {
    state.itemInstance.metadata = { ...state.itemInstance.metadata, [prop]: value };
  },
};

const roles = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(RolesAPI)
  .generateAPIActions()
  .getModule({ actions, mutations });

export default roles;
