import chatInstance, { chatBaseUrl } from '../../../../api/chatInstance';

const defaultListObject = {
  accounts: [],
};
console.log('INSTAGRAM');
/* I decided not to use api consumer because they do not
 have this flexibility to work with base url and params */
const getList = async ({ uri }) => {
  console.log('INSTAGRAM getList');
  const url = `${uri}?instagram=`;
  const data = await chatInstance.get(url);
  return data.map((item) => ({ ...defaultListObject, ...item }));
};

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}/${uri}/?instagram=setup`;

const InstagramAPI = {
  getList,
  addOrRemovePagesUrl,
};

export default InstagramAPI;
