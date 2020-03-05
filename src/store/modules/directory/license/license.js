import {getLicenseList, updateLicense} from "../../../../api/directory/license/license";
import {DefaultModule} from "../../defaults/DefaultModule";

const defaultState = () => {
    return {
        key: 'wcBMA1HFhJxxpGedAQgAvvdbsaGIkAQI65HLXV2iHOqhxWFft836GzyG3nVk1qvZjxFrk8TPj9BnpLffBM/jluMcP3+NjIEtJiMbgpc/cGq9Vg9Y1d9ENVCGS6rXxkWcy00P/G3344wER1E31/fEGD0WMf7RZpVo+LOcUH8I4LclHbHefFN/HdnV87D1fyUyCdXYDsNULgMj67j9m9zK9yD9XaYW3pewoxrYZqCERzPbkMD2/eQ+EwItjAFmXRqi0x2p5XIeCMzna0HQq0bmuzH5OV1i8YS/ImObxD6s6xfLUFtSbiNrB1NgSqE95tHFbg/DHlp/b5j7x5WwXy8unq2vJ+JXAAi0hbuduLHMaNLgAeNj9afzTVm3xeH0ZOEYyeNKJoCBJYEnzeIhErCd4HrgYeB04Xdf4M7lSYHzVzzWFVK/MoEyMFyPmQqTcS8lYCtRm0y+5R8T23Tg/eJiRkpO4Pvi/PD3+eC/5/0pEgnZKn2AyQRZDTJq6C7jLdId4RXvy4ep1osAOfvgdzYAAgmDG5tXj4P/OfScuHuRab7c9tCiZV35skEbju3D/eAq5BOdzUI54Tm6Tm/ZFXSR81+OUSn29eNBa/qHg8Ed7RGzGVuv/3krqWI38qa+pOBMx1vc335xqzx4jg7z4Pfk0xWx+Fqq9uQKa79KF3Wae+DP4geANDTgSuFbquCz4L/gcuEWJODA5Nuxf9BU5uHBLCuE0tkaezvjlz/2d6z9lpbicfdTyeEeO+Gk0+FKieg9Jlo95voP3A/dJ9Cvw3K5vx26LFEmFPK5Tmp1RdK40tJ+79fA3icUJ6LaB5JppfFGhNwxJX24OQbJyxM6yOjZM6Q+9PWUX2BSpag6sO+SgE3HVMSrpABENUSYunb88NoqNTTueVWFByJI1SsVTo/hsiFHl1IjRHBo1GNaayWxOuStv3YHiF1NFSOfIgYTRLNch2Nf9AWAV/Ps3c2/8JwGuau2hu3EN87z2AM0nSayFGL7SsV3DOjE719GMRRY3bQHYLhyx4e9CyKqnnbutE3l2b0EgSlqY40izK3Z04VdWDBgvYspHjHK2f76fDMcCtdPNmaCnWS57VmHBuEt+yKa5OSgX7xHqqdJvZKbcib9N3niWNSZ2eFAmwA=',
    };
};

const defaultModule = new DefaultModule(defaultState);

const state = {
    ...defaultModule.state,
};

const getters = {};

const actions = {
    GET_LIST: async () => {
        return await getLicenseList(state.page, state.size, state.search);
    },

    UPD_ITEM: async () => {
        return await updateLicense(state.key);
    },

    LOAD_DATA_LIST: async (context) => {
        const response = await context.dispatch('GET_LIST');
        context.dispatch('RESET_ITEM_STATE');
        context.commit('SET_DATA_LIST', response);
    },

    SET_SIZE: (context, size) => {
        context.commit('SET_SIZE', size);
    },

    SET_SEARCH: (context, search) => {
        context.commit('SET_SEARCH', search);
    },

    NEXT_PAGE: (context) => {
        if (state.isNextPage) {
            context.commit('INCREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    PREV_PAGE: (context) => {
        if (state.page) {
            context.commit('DECREMENT_PAGE');
            context.dispatch('LOAD_DATA_LIST');
        }
    },

    SET_KEY_PROPERTY: (context, value) => {
        context.commit('SET_KEY_PROPERTY', value);
    },

    UPDATE_ITEM: async (context) => {
        await context.dispatch('UPD_ITEM');
        context.dispatch('LOAD_DATA_LIST');
    },

    RESET_ITEM_STATE: async (context) => {
        context.commit('RESET_ITEM_STATE');
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
