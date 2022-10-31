import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedFlowDiagram
  from '../opened-flow-diagram.vue';
import OpenedTabComponentMixinMock
  from '../../../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';

describe('OpenedFlowDiagram', () => {
  const computed = {
    itemInstance: () => ({}),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedFlowDiagram, deepmerge.all([
      OpenedTabComponentMixinMock(),
      {
        computed,
      },
    ]));
    expect(wrapper.exists()).toBe(true);
  });
});
