import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedTriggerGeneral
  from '../opened-trigger-general.vue';
import OpenedTabComponentMixinMock
  from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';

describe('OpenedTriggerGeneral', () => {
  const computed = {
    itemInstance: () => ({}),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedTriggerGeneral, deepmerge.all([
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
