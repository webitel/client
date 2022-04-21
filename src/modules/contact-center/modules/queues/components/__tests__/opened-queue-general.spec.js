import { shallowMount } from '@vue/test-utils';
import OpenedQueueGeneral from '../opened-queue-general.vue';

describe('OpenedQueueGeneral', () => {
  const propsData = {
    v: {
      itemInstance: {},
    },
  };
  const computed = {
    itemInstance: () => ({
      type: 1,
    }),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedQueueGeneral, {
      computed,
      propsData,
      mocks: {
        $route: {
          name: 'jest',
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
