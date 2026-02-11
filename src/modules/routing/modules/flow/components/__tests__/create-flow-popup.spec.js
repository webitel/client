import { shallowMount } from '@vue/test-utils';
import { createStore } from 'vuex';

import appearance from '../../../../../appearance/store/appearance';
import CreateFlowPopup from '../create-flow-popup.vue';

describe('CreateFlowPopup', () => {
	const store = createStore({
		modules: {
			appearance,
		},
	});

	it('renders a component', () => {
		const wrapper = shallowMount(CreateFlowPopup, {
			global: {
				plugins: [
					store,
				],
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
