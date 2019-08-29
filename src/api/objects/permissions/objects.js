import Vue from 'vue';
import instance from '../../instance';
import store from '../../../store/store';

export function getObjects(id = '') {
    Vue.$log.info('get Permissions Objects started');
    if (id) id = '/' + id;
    const url = '/objects' + id;
    return instance.get(url)
        .then((response) => {
                Vue.$log.info('get Objects', 'response', response);
                return response.data;
            },
            (error) => {
                Vue.$log.info('get Objects', 'error', error);
                throw error;
            });
}

export function updateObject(id, permissions) {
    Vue.$log.info('update permissions Objects started');
    const url = '/objects/' + id;
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
                throw error;
            });
}

export function getObjectPermissions(id) {
    Vue.$log.info('getObjectPermissions started');
    const url = '/objects/' + id + '/acl';
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
    Vue.$log.info('getObjectPermissions started');
    const url = '/objects/' + id + '/acl';

    console.log(granteesToSend);
    instance.patch(url, granteesToSend)
        .then(
            response => {
                console.log(response);
            }
        )
}