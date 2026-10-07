import skills from '../modules/agent-skills/store/agent-skills';
import blacklists from '../modules/blacklists/store/blacklists';
import communications from '../modules/communications/store/communications';
import media from '../modules/media/store/media';
import quickReplies from '../modules/quick-replies/store/quick-replies.js';
import regions from '../modules/regions/store/regions';
import shiftTemplates from '../modules/shift-templates/store/shift-templates.js';

const modules = {
	skills,
	blacklists,
	regions,
	communications,
	media,
	shiftTemplates,
	quickReplies,
};

export default {
	namespaced: true,
	modules,
};
