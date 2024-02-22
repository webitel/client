import ObjectStoreModule
  from '../../../../../app/store/BaseStoreModules/StoreModules/ObjectStoreModule';
import headers from './_internals/headers';
import GlobalVariablesAPI from '../api/global-variables';

// const actions = {
//   // ADD_ITEM: async (context, { itemInstance }) => {
//   //   try {
//   //     await context.dispatch('api/POST_ITEM', { itemInstance });
//   //   } finally {
//   //     await context.dispatch('LOAD_DATA_LIST');
//   //   }
//   // },
//   UPDATE_ITEM: async (context, { itemInstance }) => {
//     console.log('UPDATE_ITEM action');
//     try {
//       await context.dispatch('api/UPD_ITEM', {
//         itemInstance,
//       });
//     } finally {
//       await context.dispatch('LOAD_DATA_LIST');
//     }
//   },
// };

const globalVariables = new ObjectStoreModule({ headers })
  .attachAPIModule(GlobalVariablesAPI)
  .generateAPIActions()
  .getModule();

export default globalVariables;
