import { shallowMount } from '@vue/test-utils';
import { createPinia, setActivePinia } from 'pinia';

import CreateFlowPopup from '../create-flow-popup.vue';

describe('CreateFlowPopup', () => {
	const pinia = createPinia();
	setActivePinia(pinia);

	it('renders a component', () => {
		const wrapper = shallowMount(CreateFlowPopup, {
			global: {
				plugins: [
					pinia,
				],
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
