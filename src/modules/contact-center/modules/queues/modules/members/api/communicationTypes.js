import CommunicationsAPI from '../../../../../../lookups/modules/communications/api/communications';

const getCommunicationTypes = async () => {
  try {
    const communicationTypes = await CommunicationsAPI.getList({
      page: 1,
      size: 999,
    });
    return communicationTypes.items;
  } catch (err) {
    throw err;
  }
};

export default getCommunicationTypes;
