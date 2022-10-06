import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedTriggerVariables
  from '../opened-trigger-variables.vue';
import OpenedTabComponentMixinMock
  from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';

describe('OpenedTriggerVariables', () => {
  const computed = {
    itemInstance: () => ({}),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedTriggerVariables, deepmerge.all([
      OpenedTabComponentMixinMock(),
      {
        propsData: {
          v: { itemInstance: {} },
        },
        computed,
      },
    ]));
    expect(wrapper.exists()).toBe(true);
  });
});