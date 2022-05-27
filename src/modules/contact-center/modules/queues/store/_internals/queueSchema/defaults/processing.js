import deepmerge from 'deepmerge';

const processing = (processing = {}) => (deepmerge({
  enabled: false,
  formSchema: {},
  sec: 30,
  processingRenewalSec: 15,
}, processing));

export default processing;
