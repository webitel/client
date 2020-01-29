import blacklists from './blacklists/blacklists';
import calendars from './calendars/calendars';
import communications from './communications/communications';
import media from './media/media';

const modules = {
    blacklists,
    calendars,
    communications,
    media,
};

export default {
    namespaced: true,
    modules
};
