import { shallowMount } from '@vue/test-utils';
import TheFlowFilters from '../the-flow-filters.vue';

describe('TheFlowFilters', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(TheFlowFilters, {
      propsData: {
        namespace: 'jest',
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
