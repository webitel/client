import Vue from 'vue';
import instance from '../../instance';

const BASE_URL = '/objects';

export function getObjects(id = '') {
    Vue.$log.info('get Permissions Objects started');
    if (id) id = '/' + id;
    const url = BASE_URL + id;
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('get Objects', 'response', response);
                return response.data;
            },
            (error) => {
                Vue.$log.info('get Objects', 'error', error);
            });
}

export function updateObject(id, permissions) {
    Vue.$log.info('update permissions Objects started');
    const url = BASE_URL + id;
    const data = {
        class: {
            obac: permissions.obac,
            rbac: permissions.rbac
        }
    };
    return instance.put(url, data)
        .then(response => {
                Vue.$log.info('put Object', 'response', response);
                return response.data;
            },
            error => {
                Vue.$log.info('put Object', 'error', error);
            });
}

export function getObjectPermissions(id) {
    Vue.$log.info('getObjectPermissions started');
    const url = BASE_URL + id + '/acl';
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
            });
}

export function updateObjectPermissions(id, granteesToSend) {
    // granteesToSend -- array
    Vue.$log.info('updateObjectPermissions started');
    const url = BASE_URL + id + '/acl';

    const changes = {
            changes: granteesToSend
        }
    ;
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