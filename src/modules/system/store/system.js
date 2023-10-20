import changelogs from '../modules/changelogs/store/changelogs';
import configuration from '../modules/configuration/store/configuration';

export default {
  namespaced: true,
  modules: {
    changelogs,
    configuration,
  },
};
