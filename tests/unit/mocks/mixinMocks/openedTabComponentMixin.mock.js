import deepmerge from 'deepmerge';
import openedObjectAccessControlMixinMock
  from './openedObjectAccessControlMixin.mock';
import openedObjectValidationMixinMock
  from './openedObjectValidationMixin.mock';

const openedTabComponentMixinMock = () => deepmerge.all([
  openedObjectValidationMixinMock(),
  openedObjectAccessControlMixinMock(),
  {
    computed: {
      itemInstance: () => ({}),
    },
  },
]);

export default openedTabComponentMixinMock;
