import chatGateways from '../modules/chat-gateways/store/chatGateways';
import gateways from '../modules/gateways/store/gateways';

const modules = {
	gateways,
	chatGateways,
};

export default {
	namespaced: true,
	modules,
};
