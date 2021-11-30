import UsersAPI from '../../../../users/api/users';
import ObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
// import headers from './_internals/headers';

const headers = [
];

const state = {
  fields: ['name', 'license'],
};

const actions = {
};

const license = new ObjectStoreModule({ headers })
  .attachAPIModule(UsersAPI)
  .generateAPIActions()
  .getModule({ state, actions });

export default license;
