import { shallowMount } from '@vue/test-utils';
import TheQueues from '../the-queues.vue';

describe('TheQueues', () => {
  const computed = {
    headersValue: () => [],
    dataList: () => [],
    page: () => 1,
    size: () => 1,
    search: () => '',
    isNext: () => false,
  };

  it('renders a component', () => {
    const wrapper = shallowMount(TheQueues, { computed });
    expect(wrapper.exists()).toBe(true);
  });
});
