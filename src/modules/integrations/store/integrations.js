import storage from '../modules/storage/store/storage';
import cognitiveProfiles
  from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';

const modules = {
  storage,
  cognitiveProfiles,
  emailProfiles,
};

export default {
  namespaced: true,
  modules,
};
