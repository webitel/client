import skills from './agent-skills/agent-skills';
import buckets from './buckets/buckets';
import blacklists from './blacklists/blacklists';
import regions from './regions/regions';
import calendars from './calendars/calendars';
import communications from './communications/communications';
import pauseCause from './agent-pause-cause/agent-pause-cause';
import media from './media/media';

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
