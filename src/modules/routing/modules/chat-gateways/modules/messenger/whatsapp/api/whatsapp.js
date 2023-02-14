import chatInstance, { chatBaseUrl } from '../../../../api/chatInstance';

const defaultListObject = {
  phoneNumbers: [],
};

/* I decided not to use api consumer because they do not
 have this flexibility to work with base url and params */
const getList = async ({ uri }) => {
  const url = `${uri}?whatsapp=`;
  const data = await chatInstance.get(url);
  return data.map((item) => ({ ...defaultListObject, ...item }));
};

const addOrRemovePagesUrl = (uri) => `${chatBaseUrl}${uri}?whatsapp=setup`;

const updateSubscribe = ({ uri, value, id }) => {
  const action = value ? 'subscribe' : 'unsubscribe';
  const url = `${uri}?whatsapp=${action}&id=${id}`;
  return chatInstance.get(url);
};

const deleteItem = ({ uri, id }) => {
  const url = `${uri}?whatsapp=remove&id=${id}&ack=true`;
  return chatInstance.get(url);
};

const WhatsappAPI = {
  getList,
  addOrRemovePagesUrl,
  updateSubscribe,
  delete: deleteItem,
};

export default WhatsappAPI;
