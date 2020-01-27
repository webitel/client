import {login} from "../../../api/auth/auth";

const defaultState = () => ({
    domainId: null,
    username: 'srgdemon@webitel.lo',
    password: '12qwaszx',
    certificate: 'wcBMA1HFhJxxpGedAQgAvvdbsaGIkAQI65HLXV2iHOqhxWFft836GzyG3nVk1qvZjxFrk8TPj9BnpLffBM/jluMcP3+NjIEtJiMbgpc/cGq9Vg9Y1d9ENVCGS6rXxkWcy00P/G3344wER1E31/fEGD0WMf7RZpVo+LOcUH8I4LclHbHefFN/HdnV87D1fyUyCdXYDsNULgMj67j9m9zK9yD9XaYW3pewoxrYZqCERzPbkMD2/eQ+EwItjAFmXRqi0x2p5XIeCMzna0HQq0bmuzH5OV1i8YS/ImObxD6s6xfLUFtSbiNrB1NgSqE95tHFbg/DHlp/b5j7x5WwXy8unq2vJ+JXAAi0hbuduLHMaNLgAeNj9afzTVm3xeH0ZOEYyeNKJoCBJYEnzeIhErCd4HrgYeB04Xdf4M7lSYHzVzzWFVK/MoEyMFyPmQqTcS8lYCtRm0y+5R8T23Tg/eJiRkpO4Pvi/PD3+eC/5/0pEgnZKn2AyQRZDTJq6C7jLdId4RXvy4ep1osAOfvgdzYAAgmDG5tXj4P/OfScuHuRab7c9tCiZV35skEbju3D/eAq5BOdzUI54Tm6Tm/ZFXSR81+OUSn29eNBa/qHg8Ed7RGzGVuv/3krqWI38qa+pOBMx1vc335xqzx4jg7z4Pfk0xWx+Fqq9uQKa79KF3Wae+DP4geANDTgSuFbquCz4L/gcuEWJODA5Nuxf9BU5uHBLCuE0tkaezvjlz/2d6z9lpbicfdTyeEeO+Gk0+FKieg9Jlo95voP3A/dJ9Cvw3K5vx26LFEmFPK5Tmp1RdK40tJ+79fA3icUJ6LaB5JppfFGhNwxJX24OQbJyxM6yOjZM6Q+9PWUX2BSpag6sO+SgE3HVMSrpABENUSYunb88NoqNTTueVWFByJI1SsVTo/hsiFHl1IjRHBo1GNaayWxOuStv3YHiF1NFSOfIgYTRLNch2Nf9AWAV/Ps3c2/8JwGuau2hu3EN87z2AM0nSayFGL7SsV3DOjE719GMRRY3bQHYLhyx4e9CyKqnnbutE3l2b0EgSlqY40izK3Z04VdWDBgvYspHjHK2f76fDMcCtdPNmaCnWS57VmHBuEt+yKa5OSgX7xHqqdJvZKbcib9N3niWNSZ2eFAmwA=',
});

const state = {
    ...defaultState()
};

const getters = {
    isAuthenticated(state) {
        return state.username || false;
    },
};

const actions = {
    SET_DOMAIN_ID: (context, domainId) => {
        context.commit('SET_DOMAIN_ID', domainId);
    },

    SET_PROPERTY: (context, {prop, value}) => {
        context.commit('SET_PROPERTY', {prop, value});
    },

    LOGIN: async (context) => {
        await login({
            username: state.username,
            password: state.password,
        });
    },

    REGISTER: async (context) => {
        await login({
            username: state.username,
            password: state.password,
            certificate: state.certificate
        });
    },

    RESET_STATE: (context) => {
        context.commit('RESET_STATE');
    },
};

const mutations = {
    SET_DOMAIN_ID: (state, domainId) => {
        state.domainId = domainId;
    },

    SET_PROPERTY: (state, {prop, value}) => {
        state[prop] = value;
    },

    RESET_STATE: (state) => {
        Object.assign(state, defaultState());
    },
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations,
};
