import gateways from './gateways/gateways';
import flow from './flow/flow';
import dialplan from './dialplan/dialplan';

const modules = {
    flow,
    dialplan,
    gateways
};

export default {
    namespaced: true,
    modules
};
