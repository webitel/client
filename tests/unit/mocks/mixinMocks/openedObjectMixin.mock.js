import deepmerge from 'deepmerge';
import openedObjectAccessControlMixinMock
  from './openedObjectAccessControlMixin.mock';
import openedObjectValidationMixinMock
  from './openedObjectValidationMixin.mock';

const openedObjectMixinMock = () => deepmerge.all([
  openedObjectValidationMixinMock(),
  openedObjectAccessControlMixinMock(),
  {
    mocks: {
      $store: {
        dispatch: () => {},
      },
    },
    computed: {
      id: () => 1,
      itemInstance: () => ({}),
    },
  },
]);

export default openedObjectMixinMock;
