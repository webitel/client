import MediaAPI from '../api/media';
import ObjectStoreModule from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';

const media = new ObjectStoreModule()
  .attachAPIModule(MediaAPI)
  .generateAPIActions()
  .getModule();

export default media;
