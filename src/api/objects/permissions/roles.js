import instance from '../../instance';

const BASE_URL = '/roles';

export const getRoleList = async (size, search) => {
    let url = BASE_URL+'?size='+size;
    if(search) {
        url += 'name='+search;
    }
    try {
        const response = await instance.get(url);
        response.data.results.forEach(res => res.isSelected = false);
        return response.data.results;

    } catch (error) {
        throw error;
    }
};

export const getRole = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.get(url);
        return response.data.role;
    } catch (error) {
        throw error;
    }
};

export const addRole = async (item) => {
    const newRole = {
        role: item
    };
    try {
        const response = await instance.post(BASE_URL, newRole);
    } catch (error) {
        throw error;
    }
};

export const updateRole = async (id, item) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.put(url, item);
    } catch (error) {
        throw error;
    }
};

export const deleteRole = async (id) => {
    const url = BASE_URL + '/' + id;

    try {
        const response = await instance.delete(url);
    } catch (error) {
        throw error;
    }
};

