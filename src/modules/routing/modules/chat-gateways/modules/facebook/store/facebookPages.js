import ObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import FacebookPagesAPI from '../api/facebookPages';
import headers from './_internals/headers';

const getters = {
  BASE_URL: (s, g, rootState) => rootState.routing.chatGateways.itemInstance.uri,
};

const actions = {
  LOAD_DATA_LIST: async (context) => {
    const baseUrl = context.getters.BASE_URL;
    const items = await context.dispatch('GET_LIST', { baseUrl });
    context.commit('SET_DATA_LIST', items);
  },
  UPDATE_SUBSCRIPTION_STATE: async (context, { value, item }) => {
    try {
      const baseUrl = context.getters.BASE_URL;
      await FacebookPagesAPI.updateSubscribe({ baseUrl, value, id: item.id });
    } finally {
      await context.dispatch('LOAD_DATA_LIST');
    }
  },
};

const facebookPages = new ObjectStoreModule({ headers })
  .attachAPIModule(FacebookPagesAPI)
  .generateAPIActions()
  .getModule({ getters, actions });

export default facebookPages;
