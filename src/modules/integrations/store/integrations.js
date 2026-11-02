import importCsv from '../modules/import-csv/store/import-csv';
import storagePolicies from '../modules/storage-policies/store/storage-policies.js';

const modules = {
	importCsv,
	storagePolicies,
};

export default {
	namespaced: true,
	modules,
};
