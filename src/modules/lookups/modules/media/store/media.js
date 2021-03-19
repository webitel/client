import MediaAPI from '../api/media';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';

const media = new ObjectStoreModule({ headers })
  .attachAPIModule(MediaAPI)
  .generateAPIActions()
  .getModule();

export default media;
