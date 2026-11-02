import media from '../modules/media/store/media';
import quickReplies from '../modules/quick-replies/store/quick-replies.js';
import regions from '../modules/regions/store/regions';

const modules = {
	regions,
	media,
	quickReplies,
};

export default {
	namespaced: true,
	modules,
};
