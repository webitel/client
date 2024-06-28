import cognitiveProfiles from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';
import importCsv from '../modules/import-csv/store/import-csv';
import singleSignOn from '../modules/single-sign-on/store/single-sign-on';
import storage from '../modules/storage/store/storage';
import triggers from '../modules/triggers/store/triggers';

const modules = {
  storage,
  cognitiveProfiles,
  emailProfiles,
  importCsv,
  triggers,
  singleSignOn,
};

export default {
  namespaced: true,
  modules,
};
