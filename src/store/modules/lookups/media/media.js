import MediaAPI from '../../../../api/lookups/media/media';
import DefaultModule from '../../../BaseModules/defaults/DefaultModule';

const media = new DefaultModule()
  .attachAPIModule(MediaAPI)
  .generateAPIActions()
  .getModule();

export default media;
