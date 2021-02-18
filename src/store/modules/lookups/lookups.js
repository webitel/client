import blacklists from './blacklists/blacklists';
import calendars from './calendars/calendars';
import communications from './communications/communications';
import pauseCause from './agent-pause-cause/agent-pause-cause';
import media from './media/media';

const modules = {
  blacklists,
  calendars,
  communications,
  pauseCause,
  media,
};

export default {
  namespaced: true,
  modules,
};
