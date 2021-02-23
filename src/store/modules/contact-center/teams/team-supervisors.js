import TeamSupervisorsAPI from '../../../../api/contact-center/teams/teamSupervisors';
import { DefaultNestedModule } from '../../defaults/DefaultNestedModule';

const defaultItemState = () => ({
  itemId: 0,
  itemInstance: {
    agent: {},
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
    return TeamSupervisorsAPI.getList(context.state);
  },
  GET_ITEM: (context) => {
    return TeamSupervisorsAPI.get(context.state);
  },
  POST_ITEM: (context) => {
    return TeamSupervisorsAPI.add(context.state);
  },
  UPD_ITEM: (context) => {
    return TeamSupervisorsAPI.update(context.state);
  },
  DELETE_ITEM: (context, id) => {
    return TeamSupervisorsAPI.delete({ parentId: context.state.parentId, id });
  },
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
