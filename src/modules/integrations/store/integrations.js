import storage from '../modules/storage/store/storage';
import cognitiveProfiles
  from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';
import importCsv from '../modules/import-csv/store/import-csv';
import triggers from '../modules/triggers/store/triggers';
import singleSingOn from '../modules/single-sign-on/store/email-profiles';

const modules = {
  storage,
  cognitiveProfiles,
  emailProfiles,
  importCsv,
  triggers,
  singleSingOn,
};

export default {
  namespaced: true,
  modules,
};
