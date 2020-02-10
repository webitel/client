import {login, register} from "../../../api/auth/auth";

const defaultState = () => ({
    username: 'adm@demo.webitel.com',
    password: '12Qwaszx',
    certificate: '' +
        'wcBMA1HFhJxxpGedAQgAv043lk3UG6PTFgHI/g25GQVe60f6B3gq3lHaRI3WQFEhDhMEdD9eiYUrTKd6NAitrPkdGOLKJLCk6YjilEFq8/tTEZZwMYbRAtodoUs6lVX76t6BDFSbpc1RlcH9w+nWDORbdcW9S+o3iVo0TP4+4rwyMkQS9rdpEPlJkip8sm5vyu1KQVbXogA+diruKoCc3jt1VqSa0jAjPibuiVFbPI9jNmSYcDqAQbdVcVKm7Px0eLMkbKw49K+RMur52vhsYfgVeLa3aO16So92CeCfGkZNBFi+GdBu/81svwMYj+rgSCjYYAueRgFApMqratsz4RhK0kCbtsDgKK8ZWlYWNtLgAeNcNuCVDbL2w+E7quHq7+OUaGGyv5HUkeJfRFXA4L7gPuB44Td34CrldBT5Zd3RIub/MjOD7qp34XWVDdUJM1WmVYjoCsyYrj/g5+Lolm0k4Pzi8oASiOCM55+WsEhhu/oZr+C7qiy3d38dCqOc+uI2Q1B+Mqw/fCnXja1aXkrHNXEHB9Wg9aQ8a/fnlheD66NsQHTBa7CuB0PEp1vGeGnc9eRYUra8lCw4enxzKejvnrQ/wiJYQic9u0ptBG/+siteaCmK2duJZNx9n+oYuWpLBl2YCSAcy5H04MnkRvv0oCqaG6ElV4fQWeCBJOAr450cULGim2dF4LLiHlD9+uAR4bmH4MLk6Toldgb8sGatJrOYHZK27+N6WwyaNtznxOImRnIr4QAD4aZY4f/t6PeEBRr0TD7E3ufgQo9SLElv/YnN5wuK6PAEcAFOtqrO2TFO5LLhdXg9oIYBfd7H/uHeOFzblVJLAzM2dMbW5ISJdbfxaK4un9gDknjJYKJg+WGJWPOE4x0+NGIuOONAJi8UAF2UtsE+3nQX7vgAJvMeygzjptTDQEqooMDNQFjpmfZhWmOXdcVFRhxQzoduJmrmp4ICB9sWf0zlbjOi372fb+Ho+z42crgR/PmQF2iV0OqLjH/fJutL+V3x2XBUk4yiwAzhKLokIWhqOnb6gAg1rwlXmEqKrKR9Ll2x6tUVBOt14RzCrgatkz5VzxwPUGP0OVaESogc9fHIY29d3gbkoX7KsoAeKcMaDcAUNs4ZJeIDrN9p4U2FAA=='
        + '',
});

const state = {
    ...defaultState()
};

const getters = {};

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
        await register({
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
