import skills from '../modules/agent-skills/store/agent-skills';
import blacklists from '../modules/blacklists/store/blacklists';
import communications from '../modules/communications/store/communications';
import media from '../modules/media/store/media';
import regions from '../modules/regions/store/regions';

const modules = {
	skills,
	blacklists,
	regions,
	communications,
	media,
};

export default {
	namespaced: true,
	modules,
};
