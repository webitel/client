import importCsv from '../modules/import-csv/store/import-csv';
import storagePolicies from '../modules/storage-policies/store/storage-policies.js';
import triggers from '../modules/triggers/store/triggers';

const modules = {
	importCsv,
	triggers,
	storagePolicies,
};

export default {
	namespaced: true,
	modules,
};
