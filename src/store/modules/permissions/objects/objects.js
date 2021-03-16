import obac from './modules/obac/object-obac';
import rbac from './modules/rbac/object-rbac';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';
import ObjectsAPI from '../../../../api/permissions/objects/objects';

const actions = {
  TOGGLE_OBJECT_OBAC: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'obac', ...payload }),
  TOGGLE_OBJECT_RBAC: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'rbac', ...payload }),

  RESET_ITEM_STATE: (context) => {
    context.commit('RESET_ITEM_STATE');
    context.dispatch('permissions/objects/obac/RESET_ITEM_STATE', {}, { root: true });
    context.dispatch('permissions/objects/rbac/RESET_ITEM_STATE', {}, { root: true });
  },
};

const objects = new DefaultModule()
  .attachAPIModule(ObjectsAPI)
  .generateAPIActions()
  .setChildModules({ obac, rbac })
  .getModule({ actions });

export default objects;
