import AgentSkillAPI from '../../../../api/contact-center/agents/agentSkills';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    skill: '',
    capacity: 10,
    enabled: true,
  },
});
const defaultModule = new DefaultNestedModule(null, defaultItemState);

const state = {
  ...defaultModule.state,
};

const getters = {};

const actions = {
  ...defaultModule.actions,
  GET_LIST: (context) => {
    return AgentSkillAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return AgentSkillAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return AgentSkillAPI.add(context.state);
  },
  PATCH_ITEM: (context, { id, changes }) => {
    return AgentSkillAPI.patch({ parentId: context.state.parentId, id, changes });
  },
  UPD_ITEM: (context) => {
    return AgentSkillAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return AgentSkillAPI.delete({ parentId: context.state.parentId, id });
  },
  CHANGE_STATE: (context, payload) => context.dispatch('PATCH_ITEM_PROPERTY', { prop: 'enabled', ...payload }),
};

const mutations = {
  ...defaultModule.mutations,
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
