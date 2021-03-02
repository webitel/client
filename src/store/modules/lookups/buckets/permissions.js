import { DefaultPermissionsModule } from '../../defaults/DefaultPermissionsModule';
import {
  getBucketPermissions,
  patchBucketPermissions,
} from '../../../../api/lookups/buckets/buckets';

const defaultModule = new DefaultPermissionsModule().getModule();

const APIActions = {
  GET_LIST: (context) => {
    return getBucketPermissions(context.state);
  },
  PATCH_ACCESS_MODE: (context, { changes }) => patchBucketPermissions(context.state.parentId, [changes]),
};

export default {
  ...defaultModule,
  actions: {
    ...defaultModule.actions,
    ...APIActions,
  },
};
