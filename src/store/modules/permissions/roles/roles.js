import RolesAPI from '../../../../api/permissions/roles/roles';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

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


const roles = new DefaultModule(resettableState)
  .attachAPIModule(RolesAPI)
  .generateAPIActions()
  .getModule({ actions });

export default roles;
