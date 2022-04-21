import { shallowMount } from '@vue/test-utils';
import OpenedQueueParams from '../opened-queue-params.vue';

describe('OpenedQueueParams', () => {
  const propsData = {
    v: {
      itemInstance: {
        payload: {},
      },
    },
  };
  const computed = {
    itemInstance: () => ({
      type: 1,
      payload: {},
    }),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedQueueParams, {
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
