import logs from '../modules/logs/store/logs';
import tokens from '../modules/tokens/store/usersTokens';

export default {
	namespaced: true,
	modules: {
		tokens,
		logs,
	},
};
