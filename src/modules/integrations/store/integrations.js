import storage from '../modules/storage/store/storage';
import cognitiveProfiles
  from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';
import importCsv from '../modules/import-csv/store/import-csv';
import triggers from '../modules/triggers/store/triggers';
import singleSignOn from '../modules/single-sign-on/store/single-sign-on';

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
