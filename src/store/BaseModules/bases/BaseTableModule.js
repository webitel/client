import deepCopy from 'deep-copy';

const state = {
  dataList: [],
  size: 10,
  search: '',
  page: 1,
  isNextPage: false,
};

const actions = {
  LOAD_DATA_LIST: async (context) => {
    const { list = [], next = false } = await context.dispatch('GET_LIST');
    context.commit('SET_DATA_LIST', list);
    context.commit('SET_IS_NEXT', next);
  },
  SET_SIZE: (context, size) => {
    context.commit('SET_SIZE', size);
    context.commit('RESET_PAGE');
  },
  SET_SEARCH: (context, search) => {
    context.commit('SET_SEARCH', search);
    context.commit('RESET_PAGE');
  },
  NEXT_PAGE: (context) => {
    context.commit('INCREMENT_PAGE');
    context.dispatch('LOAD_DATA_LIST');
  },
  PREV_PAGE: (context) => {
    context.commit('DECREMENT_PAGE');
    context.dispatch('LOAD_DATA_LIST');
  },
  PATCH_ITEM_PROPERTY: async (context, { item, index, prop, value }) => {
    await context.commit('PATCH_ITEM_PROPERTY', { index, prop, value });
    const id = item?.id || context.state.dataList[index].id;
    const changes = { [prop]: value };
    try {
      await context.dispatch('PATCH_ITEM', { id, changes });
      context.commit('PATCH_ITEM_PROPERTY', { item, index, prop, value });
    } catch {
      context.dispatch('LOAD_DATA_LIST');
    }
  },
  REMOVE_ITEM: async (context, index) => {
    const id = context.state.dataList[index].id;
    context.commit('REMOVE_ITEM', index);
    try {
      await context.dispatch('DELETE_ITEM', id);
    } catch (err) {
      throw err;
    }
  },
};

const mutations = {
  SET_DATA_LIST: (state, list) => {
    state.dataList = list;
  },
  SET_SIZE: (context, size) => {
    context.size = size;
  },
  SET_SEARCH: (context, search) => {
    context.search = search;
  },
  INCREMENT_PAGE: (state) => {
    state.page++;
  },
  DECREMENT_PAGE: (state) => {
    state.page--;
  },
  RESET_PAGE: (state) => {
    state.page = 1;
  },
  SET_IS_NEXT: (state, next) => {
    state.isNextPage = next;
  },
  PATCH_ITEM_PROPERTY: (state, { index, prop, value }) => {
    state.dataList[index][prop] = value;
  },
  REMOVE_ITEM: (state, index) => {
    state.dataList.splice(index, 1);
  },
};

export default {
  getActions: () => actions,
  getMutations: () => mutations,
  generateState: () => deepCopy(state),
};
