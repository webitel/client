import chatInstance, { chatBaseUrl } from '../../../../api/chatInstance';

const defaultListObject = {
  accounts: [],
};

/* I decided not to use api consumer because they do not
 have this flexibility to work with base url and params */
const getList = async ({ uri }) => {
  const url = `${uri}?pages=`;
  const data = await chatInstance.get(url);
  console.log('facebook get list data:', data);
  return data.map((item) => ({ ...defaultListObject, ...item }));
};

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}/${uri}/?pages=setup`;

const updateSubscribe = ({ uri, value, id }) => {
  const action = value ? 'subscribe' : 'unsubscribe';
  const url = `${uri}?pages=${action}&id=${id}`;
  return chatInstance.get(url);
};

const FacebookAPI = {
  getList,
  addOrRemovePagesUrl,
  updateSubscribe,
};

export default FacebookAPI;
