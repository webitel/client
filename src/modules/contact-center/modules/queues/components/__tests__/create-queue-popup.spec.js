import { shallowMount } from '@vue/test-utils';

import CreateQueuePopup from '../create-queue-popup.vue';

describe('CreateQueuePopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(CreateQueuePopup, {});
		expect(wrapper.exists()).toBe(true);
	});
});
