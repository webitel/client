import { shallowMount } from '@vue/test-utils';
import TheMedia from '../the-media.vue';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';

describe('TheMedia', () => {
    it('renders a component', () => {
    const wrapper = shallowMount(TheMedia, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
