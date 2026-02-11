import changelogs from '../modules/changelogs/store/changelogs';
import configuration from '../modules/configuration/store/configuration';
import globalVariables from '../modules/global-variables/store/global-variables';

export default {
	namespaced: true,
	modules: {
		changelogs,
		configuration,
		globalVariables,
	},
};
