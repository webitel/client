import gateways from '../modules/gateways/store/gateways';
import flow from '../modules/flow/store/flow';
import dialplan from '../modules/dialplan/store/dialplan';
import chatGateways from '../modules/chat-gateways/store/chatGateways';

const modules = {
  flow,
  dialplan,
  gateways,
  chatGateways,
};

export default {
  namespaced: true,
  modules,
};
