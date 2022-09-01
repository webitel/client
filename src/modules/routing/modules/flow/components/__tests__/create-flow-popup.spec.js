import { shallowMount } from '@vue/test-utils';
import CreateFlowPopup from '../create-flow-popup.vue';

describe('CreateFlowPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(CreateFlowPopup);
    expect(wrapper.isVisible()).toBe(true);
  });
});
