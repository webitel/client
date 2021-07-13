import instance from '../../../../app/api/instance';

export const setToken = async (token) => {
  localStorage.setItem('access-token', token);
  instance.defaults.headers['X-Webitel-Access'] = localStorage.getItem('access-token');
};

const removeToken = () => {
  // remove tokens
  localStorage.removeItem('access-token');
  localStorage.removeItem('domain');
  instance.defaults.headers['X-Webitel-Access'] = '';
};

export const logout = async () => {
  const url = '/logout';

  try {
    await instance.post(url, {});
    removeToken();
  } catch (err) {
    throw err;
  }
};
