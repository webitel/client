import chatGateways from '../modules/chat-gateways/store/chatGateways';
import chatplan from '../modules/chatplan/store/chatplan';
import flow from '../modules/flow/store/flow';
import gateways from '../modules/gateways/store/gateways';

const modules = {
	flow,
	gateways,
	chatplan,
	chatGateways,
};

export default {
	namespaced: true,
	modules,
};
