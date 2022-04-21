import { shallowMount } from '@vue/test-utils';
import OpenedQueue from '../opened-queue.vue';

describe('OpenedQueue', () => {
  const computed = {
    id: () => 1,
    itemInstance: () => ({}),
  };

  it('renders a component', () => {
    const mock = jest.fn();
    jest.spyOn(OpenedQueue.methods, 'loadPageData').mockImplementation(mock);
    const wrapper = shallowMount(OpenedQueue, {
      computed,
      mocks: {
        $route: {
          params: { id: 1 },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
