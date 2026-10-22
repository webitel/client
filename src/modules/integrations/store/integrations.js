import cognitiveProfiles from '../modules/cognitive-profiles/store/cognitive-profiles';
import importCsv from '../modules/import-csv/store/import-csv';
import storage from '../modules/storage/store/storage';
import storagePolicies from '../modules/storage-policies/store/storage-policies.js';
import triggers from '../modules/triggers/store/triggers';

const modules = {
	storage,
	cognitiveProfiles,
	importCsv,
	triggers,
	storagePolicies,
};

export default {
	namespaced: true,
	modules,
};
