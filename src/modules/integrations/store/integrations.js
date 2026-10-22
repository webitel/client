import cognitiveProfiles from '../modules/cognitive-profiles/store/cognitive-profiles';
import emailProfiles from '../modules/email-profiles/store/email-profiles';
import importCsv from '../modules/import-csv/store/import-csv';
import storagePolicies from '../modules/storage-policies/store/storage-policies.js';
import triggers from '../modules/triggers/store/triggers';

const modules = {
	cognitiveProfiles,
	emailProfiles,
	importCsv,
	triggers,
	storagePolicies,
};

export default {
	namespaced: true,
	modules,
};
