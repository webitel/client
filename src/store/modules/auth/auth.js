import {login} from "../../../api/auth/auth";

const defaultState = () => ({
    domainId: null,
    username: 'srgdemon@webitel.lo',
    password: '12qwaszx',
    certificate: 'wcBMA1HFhJxxpGedAQgALQ5DMZpjTudS7hL+qVO2N1YgYqOXQRmdhXGzbGZjKudztEua1KmNB7rRYQZUWN6evslMcZV+KItxJxHsPBcQw3W+abQlXbkutMru1daCZGYioE8h3g/7aVB7EafuoAhjckSIzWdDTQvP1PsBUN8bqYuR6cl/H6ERTspktooWCBYx46C3U2VazFrkBr5qYvz18lVecMMVnbleqDwgMegFtw+cqmSKz6TndtjQhRsrtjrKLYWL+xsbtGRNublPtO9s9Xi3HB78CJrsdzh3keB19N6yE789oXxWfDdXyP1yDPXnm87ueCHHOnzJ9h5yimyXRxfcx7jdETlGzXsVQ4BMa9LgAeMSL2+uLcecU+EG0eFCZOM3IwO/oCJyG+LUysB74MvgTeAP4Ruh4LHkrjxg5nKsCQbO8XCNkNsNG+AY4tE0Ne7gT+IzOKFq4KjnPMsdYzPucxJypXNgXDFgZ+swfS7UiTa4xAVyGe4eZXnYeDNDnPQNUUV7vILpQIYHk2/7N75cyDwTTWFKbcT9xqfvTi5w/8GLwBcDA1p/HWyqweIBukvjQnwXSqK8pRE5gIa13qqVD+O8oa94eGskbqSqFw4dY4hRCsZaRx1Ty3Hg0eAS4PPhj9zgj+SFcuOxCaEcI5UZmf4bYAjG4+Z+apasN+4S4r9LJP/hMWzhuDfhVqPo5Z0uXfd0s2bHKCEyiNAg66nnI88dkHeHz1/Sfns1f7dBQBa40o/dFTMdYwMP0jVj9RAf88Qp5yCKJUoks3JUD43a6CXvWTWyBa/LMyT7ADsgHz8KESzHcX1jLiMnsWiUBXCXHiICyMr2iKlDvFDGnjBmqm6/8rDN6nEyhIP+RKIAFKDhde3EWAgVmoamiw6ijO65QuJaGVVzUD1Ouswthlu1qm4UlMQTOTGeINFxdZsEwT9HVlbEF69CXehF7oJdhSu5bqt1NI2ngcFplsGQfDw+y4+yzqMwLTi69RLjNyQy9xq/rr8IdL9B8ocr4FsAlySqovKRujibD2yS42P1meTSECie6iXH4yFf1I1C5zWq4jls5N7h4wgA',

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
