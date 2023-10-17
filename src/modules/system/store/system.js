import changelogs from '../modules/changelogs/store/changelogs';
import settings from '../modules/settings/store/settings';

export default {
  namespaced: true,
  modules: {
    changelogs,
    settings,
  },
};
