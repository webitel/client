import chatGateways from '../modules/chat-gateways/store/chatGateways';
import chatplan from '../modules/chatplan/store/chatplan';
import gateways from '../modules/gateways/store/gateways';

const modules = {
	gateways,
	chatplan,
	chatGateways,
};

export default {
	namespaced: true,
	modules,
};
