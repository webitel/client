import UserTokensAPI from '../../../../api/directory/users/userTokens';
import DefaultNestedModule from '../../../BaseModules/defaults/DefaultNestedModule';

const resettableItemState = {
  itemInstance: {
    token: '',
    usage: '',
  },
};

const actions = {
  ADD_TOKEN: async (context) => {
    try {
      let resp = await context.dispatch('POST_ITEM');
      await context.dispatch('LOAD_DATA_LIST');
      context.commit('SET_TOKEN', resp.token);
    } catch (err) {
      throw err;
    }
  },
  LOAD_DATA_LIST: async (context) => {
    if (context.state.parentId) {
      const response = await context.dispatch('GET_LIST');
      context.commit('SET_DATA_LIST', response.list);
      context.commit('SET_IS_NEXT', response.next);
    }
  },
};

const mutations = {
  SET_TOKEN: async (state, token) => {
    state.itemInstance.token = token;
  },
};

const userTokens = new DefaultNestedModule(null, resettableItemState)
  .attachAPIModule(UserTokensAPI)
  .generateAPIActions()
  .getModule({ actions, mutations });

export default userTokens;
