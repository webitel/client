import Vue from 'vue';
import instance from '@/api/instance';

const BASE_URL = '/objects';

export function getObjects() {
    Vue.$log.info('get Permissions Objects', 'started');
    return instance.get(BASE_URL)
        .then((response) => {
                Vue.$log.info('get Permissions Objects', 'response', response);

                const defaultObject = {  // default object prototype, to merge response with it to get all fields
                    class: '',
                    obac: false,
                    rbac: false,
                    id: 0
                };

                return response.data.classes.map(item => {
                    return Object.assign({}, defaultObject, item);
                });
            },
            (error) => {
                Vue.$log.warn('get Objects', 'error', error);
                throw error;
            });
}

export function getObject(id) {
    Vue.$log.info('get Permissions Object (1)', 'started');

    const url = BASE_URL + '/' + id;
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('get Permissions Object (1)', 'response', response);
                return response.data.class.class;
            },
            (error) => {
                Vue.$log.warn('get Permissions Object (1)', 'error', error);
                throw error;
            });
}

export function updateObject(id, permissions) {
    Vue.$log.info('update permissions Objects', 'started');
    const url = BASE_URL + '/' + id;
    const updatedObject = {
        class: {
            obac: permissions.obac,
            rbac: permissions.rbac
        }
    };
    return instance.put(url, updatedObject)
        .then(response => {
                Vue.$log.info('put Object', 'response', response);
            },
            error => {
                Vue.$log.info('put Object', 'error', error);
                throw error;
            });
}

export function getObjectPermissions(id) {
    Vue.$log.info('getObjectPermissions', 'started');
    const url = BASE_URL + '/' + id + '/acl';
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('getObjectPermissions', 'response', response);

                let formattedResponse = [];
                if (response.data.list) {
                    // format response before assignment
                    formattedResponse = response.data.list.map(item => {
                        return {
                            grantee: {
                                id: item.grantee.id,
                                role: item.grantee.role
                            },
                            access: {
                                c: item.privileges.includes('CREATE'),
                                r: item.privileges.includes('SELECT'),
                                u: item.privileges.includes('UPDATE'),
                                d: item.privileges.includes('DELETE'),
                            }
                        }
                    });
                }

                return formattedResponse;
            },
            (error) => {
                Vue.$log.info('getObjectPermissions', 'error', error);
                throw error;
            });
}

export function updateObjectPermissions(id, granteesToSend) {
    // granteesToSend -- array
    Vue.$log.info('updateObjectPermissions', 'started');
    const url = BASE_URL + '/' + id + '/acl';

    const changes = {
        changes: granteesToSend
    };

    return instance.patch(url, changes)
        .then(
            response => {
                Vue.$log.info('updateObjectPermissions response', response);
            }, error => {
                Vue.$log.info('updateObjectPermissions', 'error', error);
                throw error;
            }
        )
}