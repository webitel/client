import skills from '../modules/agent-skills/store/agent-skills';
import buckets from '../modules/buckets/store/buckets';
import blacklists from '../modules/blacklists/store/blacklists';
import regions from '../modules/regions/store/regions';
import calendars from '../modules/calendars/store/calendars';
import communications from '../modules/communications/store/communications';
import pauseCause from '../modules/agent-pause-cause/store/agent-pause-cause';
import media from '../modules/media/store/media';

const modules = {
  skills,
  buckets,
  blacklists,
  regions,
  calendars,
  communications,
  pauseCause,
  media,
};

export default {
  namespaced: true,
  modules,
};
