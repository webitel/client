import cognitiveProfiles
  from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';
import importCsv from '../modules/import-csv/store/import-csv';
import storage from '../modules/storage/store/storage';
import triggers from '../modules/triggers/store/triggers';
// Note: commented out because of singleSignOn feature is not ready yet
// import singleSignOn from '../modules/single-sign-on/store/single-sign-on';

const modules = {
  storage,
  cognitiveProfiles,
  emailProfiles,
  importCsv,
  triggers,
  // Note: commented out because of singleSignOn feature is not ready yet
  // singleSignOn,
};

export default {
  namespaced: true,
  modules,
};
