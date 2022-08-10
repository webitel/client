import storage from '../modules/storage/store/storage';
import cognitiveProfiles
  from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';
import importCsv from '../modules/import-csv/store/import-csv';

const modules = {
  storage,
  cognitiveProfiles,
  emailProfiles,
  importCsv,
};

export default {
  namespaced: true,
  modules,
};
