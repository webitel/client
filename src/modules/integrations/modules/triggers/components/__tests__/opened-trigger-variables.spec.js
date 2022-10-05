import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedTriggerVariables
  from '../opened-trigger-variables.vue';
import OpenedTabComponentMixinMock
  from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';

describe('OpenedTriggerVariables', () => {
  const computed = {
    itemInstance: () => ({
      properties: {},
    }),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedTriggerVariables, deepmerge.all([
      OpenedTabComponentMixinMock(),
      {
        propsData: {
          v: { itemInstance: { properties: {} } },
        },
        computed,
      },
    ]));
    expect(wrapper.exists()).toBe(true);
  });
});
