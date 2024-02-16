import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import GlobalVariablesAPI from '/src/modules/system/modules/global-variables/api/global-variables';

const globalVariables = new ObjectStoreModule({ headers })
  .attachAPIModule(GlobalVariablesAPI)
  .generateAPIActions()
  .getModule();

export default globalVariables;
