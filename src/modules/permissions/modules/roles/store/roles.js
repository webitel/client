import RolesAPI from '../api/roles';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const resettableState = {
  itemInstance: {
    name: '',
    description: '',
    permissions: [],
  },
};

const actions = {
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
    permissions.splice(permissions.indexOf(deleted), 1);
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
};


const roles = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(RolesAPI)
  .generateAPIActions()
  .getModule({ actions });

export default roles;
