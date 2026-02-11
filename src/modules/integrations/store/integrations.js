import cognitiveProfiles from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';
import importCsv from '../modules/import-csv/store/import-csv';
import singleSignOn from '../modules/single-sign-on/store/single-sign-on';
import storage from '../modules/storage/store/storage';
import storagePolicies from '../modules/storage-policies/store/storage-policies.js';
import triggers from '../modules/triggers/store/triggers';

const modules = {
	storage,
	cognitiveProfiles,
	emailProfiles,
	importCsv,
	triggers,
	singleSignOn,
	storagePolicies,
};

export default {
	namespaced: true,
	modules,
};
