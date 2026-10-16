import chatGateways from '../modules/chat-gateways/store/chatGateways';
import chatplan from '../modules/chatplan/store/chatplan';
import dialplan from '../modules/dialplan/store/dialplan';
import flow from '../modules/flow/store/flow';

const modules = {
	flow,
	dialplan,
	chatplan,
	chatGateways,
};

export default {
	namespaced: true,
	modules,
};
