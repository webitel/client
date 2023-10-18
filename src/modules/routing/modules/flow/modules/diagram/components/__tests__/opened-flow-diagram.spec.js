import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedTabComponentMixinMock
  from '../../../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';
import OpenedFlowDiagram from '../opened-flow-diagram.vue';

describe('OpenedFlowDiagram', () => {
  const computed = {
    itemInstance: () => ({}),
  };

  it('renders a component', () => {
    vi.spyOn(OpenedFlowDiagram.methods, 'initDiagram')
    .mockImplementationOnce(vi.fn());
    const wrapper = shallowMount(OpenedFlowDiagram, deepmerge.all([
      OpenedTabComponentMixinMock(),
      {
        computed,
      },
    ]));
    expect(wrapper.exists()).toBe(true);
  });
});
