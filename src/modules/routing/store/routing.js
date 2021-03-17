import gateways from '../modules/gateways/store/gateways';
import flow from '../modules/flow/store/flow';
import dialplan from '../modules/dialplan/store/dialplan';

const modules = {
  flow,
  dialplan,
  gateways,
};

export default {
  namespaced: true,
  modules,
};
