import pauseCause from '../modules/agent-pause-cause/store/agent-pause-cause';
import skills from '../modules/agent-skills/store/agent-skills';
import blacklists from '../modules/blacklists/store/blacklists';
import buckets from '../modules/buckets/store/buckets';
import calendars from '../modules/calendars/store/calendars';
import communications from '../modules/communications/store/communications';
import media from '../modules/media/store/media';
import pauseTemplates from '../modules/pause-templates/store/pause-templates.js';
import quickReplies from '../modules/quick-replies/store/quick-replies.js';
import regions from '../modules/regions/store/regions';
import shiftTemplates from '../modules/shift-templates/store/shift-templates.js';
import workingConditions from '../modules/working-conditions/store/working-conditions.js';

const modules = {
	skills,
	buckets,
	blacklists,
	regions,
	calendars,
	communications,
	pauseCause,
	media,
	shiftTemplates,
	pauseTemplates,
	workingConditions,
	quickReplies,
};

export default {
	namespaced: true,
	modules,
};
