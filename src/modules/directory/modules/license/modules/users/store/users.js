import { SortSymbols } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import UsersAPI from '../../../../users/api/users';
import ObjectStoreModule from '../../../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import staticHeaders from './_internals/headers';

const state = {
  fields: ['id', 'name', 'license'],
};

const actions = {
  INITIALIZE_HEADERS: (context) => {
    const licenses = context.rootState.directory.license.dataList;
    const licenseHeaders = licenses.map(({ id, product, notAfter }, index) => ({
      value: id,
      name: product,
      text: product.concat(` (${new Date(+notAfter).toLocaleDateString()})`),
      field: 'license',
      show: index < 5, // show only first 4 licenses
      sort: SortSymbols.NONE,
    }));
    const headers = [...staticHeaders, ...licenseHeaders];
    context.commit('SET_HEADERS', headers);
  },
  BEFORE_SET_DATA_LIST_HOOK: (context, { items, ...rest }) => {
    const licenseHeaders = context.state.headers.slice(1); // without "name" column
    const _items = items.map((item) => ({
      ...item,
      license: licenseHeaders.reduce((licenses, { name }) => ({
        ...licenses,
        [name]: item.license && item.license.some(({ prod }) => prod === name),
      }), {}),
    }));
    return { items: _items, ...rest };
  },
  TOGGLE_USER_LICENSE: (context, { user, license }) => {
    try {
      // TODO: API PATCH
      /* i decided to mutate user directly to avoid all dataList redraw */
      // eslint-disable-next-line no-param-reassign
      user.license[license.name] = !user.license[license.name];
    } catch (err) {
      throw err;
    }
  },
};

const license = new ObjectStoreModule({ headers: staticHeaders })
  .attachAPIModule(UsersAPI)
  .generateAPIActions()
  .getModule({ state, actions });

export default license;