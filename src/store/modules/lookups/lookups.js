import blacklists from './blacklists/blacklists';
import calendars from './calendars/calendars';
import communications from './communications/communications';

const modules = {
    blacklists,
    calendars,
    communications,
};

export default {
    namespaced: true,
    modules
};
