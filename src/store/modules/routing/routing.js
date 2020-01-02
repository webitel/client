import gateways from './gateways';
import flow from './flow';
import dialplan from './dialplan';

const modules = {
    flow,
    dialplan,
    gateways
};

export default {
    namespaced: true,
    modules
};
