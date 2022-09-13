import { shallowMount } from '@vue/test-utils';
import FlowTagsFilter from '../flow-tags-filter.vue';
import filterComponentMixinMock from '../../../../../../../../../tests/unit/mocks/mixinMocks/filterComponentMixin.mock';

describe('FlowTagsFilter', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(FlowTagsFilter, {
      ...filterComponentMixinMock(),
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});
