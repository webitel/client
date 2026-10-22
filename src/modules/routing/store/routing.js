import chatGateways from '../modules/chat-gateways/store/chatGateways';
import chatplan from '../modules/chatplan/store/chatplan';
import dialplan from '../modules/dialplan/store/dialplan';
import gateways from '../modules/gateways/store/gateways';

const modules = {
	dialplan,
	gateways,
	chatplan,
	chatGateways,
};

export default {
	namespaced: true,
	modules,
};
