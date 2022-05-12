import { shallowMount } from '@vue/test-utils';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import TheQueues from '../the-queues.vue';

describe('TheQueues', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(TheQueues, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
