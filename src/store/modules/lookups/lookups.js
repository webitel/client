import blacklists from './blacklists/blacklists';
import communications from './communications/communications';

const modules = {
    blacklists,
    communications
};

export default {
    namespaced: true,
    modules
};
