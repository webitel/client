import instance from '@/api/instance';

const BASE_URL = '/users';

export async function getUsersList(size = 100) {
    const defaultObject = {  // default object prototype, to merge response with it to get all fields
        isSelected: false,
        name: 'Username undefined',
        username: 'Username undefined',
        status: 'Status is undefined',
        state: true,
        dnd: false,
        id: 0
    };

    try {
        let response = await instance.get(BASE_URL+`?size=${size}`);
        if (!response.data.users) response.data.users = [];

        return response.data.users.map(item => {
            return Object.assign({}, defaultObject, item);
        });
    } catch (error) {
        throw error;
    }
}

export async function getUser(id) {
    const url = BASE_URL + '/' + id;

    try {
        let response = await instance.get(url);
        console.log(response);
    } catch (error) {
        throw error;
    }
}

export const addUser = async (item) => {
    item = {
        "user": {
            "name":      "Caller-ID Display Name",
            "email":     "userN@invalid.example.com"+Math.random(),
            "username":  "upd-userN"+Math.random(),
            "password":  "{cleartext}",
            // "extension": "1007"+Math.random(),
            "status":    "Doing something !.. :P",
            "dnd":        false,
            "roles": {
                "1011963": "ioio",
                "1011964": "role.4b759299ca729c61e52d514e9d4aea46",
                "1011965": "role.a12ed0b17f4cba946d1a1c0ecfa51b83",
                "1011966": "role.315c9cdfe74c20bc0857056a9154fea2",
                "1011967": "role.b34b3014ebb356977d5a36afdeeb45ae"
            },
            "license":    null,
            "devices": null,
            "profile": {
                "integration_id": "user@external.app",
                "my-var": "my-val",
                "int": "7256726877"
            }
        }
    };


    // Object.keys(item).forEach(key => {
    //     if(!item[key]) delete item[key];
    // });
    // item.account = item.username;
    // delete item.username;
    // delete item.description;

    try {
        const response = await instance.post(BASE_URL, item);
    } catch (err) {
        throw err;
    }
};

export const updateUser = async (id, changes) => {
    const url = BASE_URL + '/' + id;

    changes = {
        "user": {
            "name":      "upd-Caller-ID Display Name",
            "email":     "userN@invalid.example.com",
            "username":  "upd-userN"+Math.random(),
            "password":  "{cleartext}",
            "extension": "1007",
            "status":    "Doing something !.. :P",
            "dnd":        false,
            "roles": {
                "1011963": "ioio",
                "1011964": "role.4b759299ca729c61e52d514e9d4aea46",
                "1011965": "role.a12ed0b17f4cba946d1a1c0ecfa51b83",
                "1011966": "role.315c9cdfe74c20bc0857056a9154fea2",
                "1011967": "role.b34b3014ebb356977d5a36afdeeb45ae"
            },
            "license":    null,
            "devices": null,
            "profile": {
                "integration_id": "user@external.app",
                "my-var": "my-val",
                "int": "7256726877"
            }
        }
    };

    try {
        const response = await instance.put(url, changes);
    } catch (err) {
        throw err;
    }
};

export const deleteUser = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
    } catch (err) {
        throw err;
    }
};