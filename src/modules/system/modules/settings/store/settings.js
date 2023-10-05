import SettingsAPI from '../api/settings';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';

const resettableState = {
  itemInstance: {
  },
};

const actions = {
  LOAD_SETTINGS: async (context, params) => {
    const { items } = await SettingsAPI.getList(params);
    context.commit('SET_SETTINGS', items);
  },
  SET_SETTING_PROPERTY: (context, { index, prop, value }) => {
    context.commit('SET_SETTING_PROPERTY', { index, prop, value });
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
  ADD_SETTING: (context) => {
    const pair = { name: '', value: '' };
    context.commit('ADD_SETTING', pair);
    context.commit('SET_ITEM_PROPERTY', { prop: '_dirty', value: true });
  },
};

const mutations = {
  SET_SETTINGS: (state, items) => {
    state.itemInstance = items;
  },
  SET_SETTING_PROPERTY: (state, { index, prop, value }) => {
    state.itemInstance[index][prop] = value;
  },
  SET_ITEM_PROPERTY: (state, { prop, value }) => {
    state.itemInstance[prop] = value;
  },
  ADD_SETTING: (state, pair) => {
    state.itemInstance.push(pair);
  },
};

const settings = new ObjectStoreModule({ resettableState })
.attachAPIModule(SettingsAPI)
.generateAPIActions()
.getModule({ actions, mutations });

export default settings;
