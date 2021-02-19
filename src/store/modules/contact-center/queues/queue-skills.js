import {
  addQueueSkill,
  deleteQueueSkill,
  getQueueSkill,
  getQueueSkillsList,
  patchQueueSkill,
  updateQueueSkill,
} from '../../../../api/contact-center/queues/queueSkills';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    skill: {},
    lvl: 0,
    minCapacity: 0,
    maxCapacity: 10,
    buckets: [],
    enabled: true,
  },
});

const defaultNestedModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultNestedModule.state,
};

const getters = {
  GET_ITEM_BUCKETS: (state) => (id) => {
    const item = state.dataList.filter(item => item.id === id)[0];
    return item.buckets;
  },
};

const actions = {
  ...defaultNestedModule.actions,
  GET_LIST: (context) => {
    return getQueueSkillsList(context.state);
  },
  GET_ITEM: (context) => {
    return getQueueSkill(context.state);
  },
  POST_ITEM: (context) => {
    return addQueueSkill(context.state);
  },
  PATCH_ITEM: (context, { id, changes }) => {
    return patchQueueSkill({ parentId: context.state.parentId, id, changes });
  },
  UPD_ITEM: (context) => {
    return updateQueueSkill(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return deleteQueueSkill({ parentId: context.state.parentId, id });
  },
  CHANGE_STATE: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'enabled', ...payload }),
};

const mutations = {
  ...defaultNestedModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};