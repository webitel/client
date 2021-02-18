import proxy from '../../../utils/editProxy';

export class DefaultNestedListModule {
  constructor(defaultState) {
    this.state = {
      dataList: [],
      itemId: null,
      parentId: 0,
      ...defaultState(),
    };

    this.actions = {
      SET_ITEM_ID: (context, id) => {
        if (id !== 'new') context.commit('SET_ITEM_ID', id);
      },

      LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
      },

      LOAD_ITEM: async (context) => {
        if (typeof context.state.itemId === 'number') {
          const item = await context.dispatch('GET_ITEM');
          context.commit('SET_ITEM', proxy(item));
        }
      },

      SET_ITEM_PROPERTY: (context, payload) => {
        context.commit('SET_ITEM_PROPERTY', payload);
      },

      ADD_ITEM: async (context) => {
        if (typeof context.state.itemId !== 'number') {
          await context.dispatch('POST_ITEM');
        }
        context.dispatch('LOAD_DATA_LIST');
      },

      UPDATE_ITEM: async (context) => {
        if (context.state.itemInstance._dirty) {
          await context.dispatch('UPD_ITEM');
        }
        context.dispatch('LOAD_DATA_LIST');
      },

      REMOVE_ITEM: async (context, index) => {
        context.commit('REMOVE_ITEM', index);
        try {
          await context.dispatch('DELETE_ITEM', index);
        } catch {
        }
        context.dispatch('LOAD_DATA_LIST');
      },

      RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
      },
    };

    this.mutations = {
      SET_ITEM_ID: (state, id) => {
        state.itemId = id;
      },

      SET_DATA_LIST: (state, list) => {
        state.dataList = list;
      },

      SET_ITEM_PROPERTY: (state, { prop, value }) => {
        state.itemInstance[prop] = value;
      },

      SET_ITEM: (state, item) => {
        state.itemInstance = item;
      },

      REMOVE_ITEM: (state, index) => {
        state.dataList.splice(index, 1);
      },

      RESET_ITEM_STATE: (state) => {
        Object.assign(state, defaultState());
      },
    };
  }
}
