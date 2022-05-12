import deepmerge from 'deepmerge';
import openedObjectAccessControlMixinMock
  from './openedObjectAccessControlMixin.mock';
import openedObjectValidationMixinMock
  from './openedObjectValidationMixin.mock';

const openedObjectMixinMock = () => deepmerge.all([
  openedObjectValidationMixinMock(),
  openedObjectAccessControlMixinMock(),
  {
    computed: {
      id: () => 1,
      itemInstance: () => ({}),
    },
  },
]);

export default openedObjectMixinMock;
