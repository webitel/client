const defaultState = () => ({
    domainId: 0,
    name: '',
    username: '',
    account: '',
    userId: 0,
    scope: [],
    roles: [],
    license: [],
    language: localStorage.getItem('lang'),
});

const mapNav = [
    {navName: 'license', apiName: 'license'},
    {navName: 'users', apiName: 'users'},
    {navName: 'devices', apiName: 'devices'},
    {navName: 'flow', apiName: 'acr_routing'},
    {navName: 'dialplan', apiName: 'acr_routing'},
    {navName: 'chatplan', apiName: 'acr_routing'},
    {navName: 'gateways', apiName: 'gateways'},
    {navName: 'blacklist', apiName: 'cc_list'},
    {navName: 'calendars', apiName: 'calendars'},
    {navName: 'communications', apiName: 'communications'},
    {navName: 'media', apiName: 'media_file'},
    {navName: 'agent-skills', apiName: 'cc_agent_skill'},
    {navName: 'agents', apiName: 'cc_agent'},
    {navName: 'teams', apiName: 'cc_team'},
    {navName: 'resources', apiName: 'cc_resource'},
    {navName: 'resource-groups', apiName: 'cc_resource_group'},
    {navName: 'queues', apiName: 'cc_queue'},
    {navName: 'buckets', apiName: 'cc_bucket'},
    {navName: 'tokens', apiName: 'tokens'},
    {navName: 'storage', apiName: 'storage_profile'},
    {navName: 'triggers', apiName: 'triggers'},
    {navName: 'adfs', apiName: 'adfs'},
    {navName: 'widgets', apiName: 'widgets'},
    {navName: 'call-tracking', apiName: 'call-tracking'},
    {navName: 'roles', apiName: 'roles'},
    {navName: 'objects', apiName: 'objects'},
]

const state = {
    ...defaultState()
};

const getters = {

};

const actions = {
    SET_SESSION: (context, session) => {
        context.dispatch('RESET_STATE');
        context.commit('SET_SESSION', session);
        context.commit('SET_SCOPE', session);
    },

    SET_DOMAIN_ID: (context, domainId) => {
        context.commit('SET_DOMAIN_ID', domainId);
    },

    RESET_STATE: (context) => {
        context.commit('RESET_STATE');
    },
};

const mutations = {
    SET_SESSION: (state, session) => {
        state.domainId = session.dc;
        state.account = session.preferredUsername;
        state.roles = session.roles;
        state.userId = session.userId;
        state.license = session.license;
        state.username = session.username;
        state.name = session.name;
    },

    SET_SCOPE: (state, session) => {
        state.scope = session.scope.map(item => {
            return {
                ...item,
                navItem: mapNav.filter(navItem => {
                    return navItem.apiName === item.class;
                })
            }
        });
    },

    SET_DOMAIN_ID: (state, domainId) => {
        state.domainId = domainId;
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
