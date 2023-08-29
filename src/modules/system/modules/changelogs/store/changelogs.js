import ChangelogsAPI from '../api/changelogs';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import logs from '../modules/logs/store/logs';

const resettableState = {
  itemInstance: {
    object: {},
    enabled: false,
    daysToStore: 7,
    storage: {},
    period: 7,
    description: '',
  },
};

const changelogs = new ObjectStoreModule({ resettableState, headers })
  .attachAPIModule(ChangelogsAPI)
  .generateAPIActions()
  .setChildModules({ logs })
  .getModule();

export default changelogs;
