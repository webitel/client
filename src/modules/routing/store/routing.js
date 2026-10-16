import chatplan from '../modules/chatplan/store/chatplan';
import dialplan from '../modules/dialplan/store/dialplan';
import flow from '../modules/flow/store/flow';
import gateways from '../modules/gateways/store/gateways';

const modules = {
	flow,
	dialplan,
	gateways,
	chatplan,
};

export default {
	namespaced: true,
	modules,
};
