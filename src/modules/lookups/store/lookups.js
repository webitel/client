import skills from '../modules/agent-skills/store/agent-skills';
import blacklists from '../modules/blacklists/store/blacklists';
import communications from '../modules/communications/store/communications';
import media from '../modules/media/store/media';
import quickReplies from '../modules/quick-replies/store/quick-replies.js';

const modules = {
	skills,
	blacklists,
	communications,
	media,
	quickReplies,
};

export default {
	namespaced: true,
	modules,
};
