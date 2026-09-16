import changelogs from '../modules/changelogs/store/changelogs';
import globalVariables from '../modules/global-variables/store/global-variables';

export default {
	namespaced: true,
	modules: {
		changelogs,
		globalVariables,
	},
};
