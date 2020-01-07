import users from './users/users';
import devices from './devices/devices';

const modules = {
    users,
    devices,
};

export default {
    namespaced: true,
    modules
};
