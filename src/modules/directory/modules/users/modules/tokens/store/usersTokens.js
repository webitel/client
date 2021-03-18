import UserTokensAPI from '../api/userTokens';
import NestedObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/NestedObjectStoreModule';

const resettableItemState = {
  itemInstance: {
    token: '',
    usage: '',
  },
};

const actions = {
  ADD_TOKEN: async (context) => {
    try {
      const { token } = await context.dispatch('POST_ITEM');
      await context.dispatch('LOAD_DATA_LIST');
      context.commit('SET_TOKEN', token);
    } catch (err) {
      throw err;
    }
  },
};

const mutations = {
  SET_TOKEN: async (state, token) => {
    state.itemInstance.token = token;
  },
};

const userTokens = new NestedObjectStoreModule(null, resettableItemState)
  .attachAPIModule(UserTokensAPI)
  .generateAPIActions()
  .getModule({ actions, mutations });

export default userTokens;
