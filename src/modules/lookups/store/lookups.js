import media from '../modules/media/store/media';
import quickReplies from '../modules/quick-replies/store/quick-replies.js';

const modules = {
	media,
	quickReplies,
};

export default {
	namespaced: true,
	modules,
};
