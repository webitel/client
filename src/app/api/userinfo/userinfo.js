import instance from '../instance';

// gets user by token from localstorage
// stores response username in vuex
export const getSession = async () => {
  // const tokenCheck = localStorage.getItem('access-token');
  // if (typeof tokenCheck === 'string') { // if there is no token, localStorage returns object
    const url = '/userinfo';
    try {
      const response = await instance.get(url);
      return response;
    } catch (err) {
      throw err;
    }
  // }
};

export const getApplicationsAccess = async () => {
  const url = 'role/metadata/access';
  try {
    const response = await instance.get(url);
    return response;
  } catch (err) {
    throw err;
  }
};
