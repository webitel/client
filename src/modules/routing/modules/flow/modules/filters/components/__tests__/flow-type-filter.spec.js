import { shallowMount } from '@vue/test-utils';
import FlowTypeFilter from '../flow-type-filter.vue';
import filterComponentMixinMock from '../../../../../../../../../tests/unit/mocks/mixinMocks/filterComponentMixin.mock';

describe('FlowTypeFilter', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(FlowTypeFilter, {
      ...filterComponentMixinMock(),
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
