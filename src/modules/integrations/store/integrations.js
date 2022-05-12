import storage from '../modules/storage/store/storage';
import cognitiveProfiles
  from '../modules/cognitive-profiles/store/cognitive-profiles';

const modules = {
  storage,
  cognitiveProfiles,
};

export default {
  namespaced: true,
  modules,
};
