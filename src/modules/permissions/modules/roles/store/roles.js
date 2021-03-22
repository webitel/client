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
  REMOVE_ROLE_PERMISSION: (context, index) => {
    const value = [...context.state.itemInstance.permissions];
    value.splice(index, 1);
    context.commit('SET_ITEM_PROPERTY', { prop: 'permissions', value });
  },
};


const roles = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(RolesAPI)
  .generateAPIActions()
  .getModule({ actions });

export default roles;
