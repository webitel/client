import { shallowMount } from '@vue/test-utils';
import { FlowsAPI } from '@webitel/api-services/api';
import { createPinia, setActivePinia } from 'pinia';

import TheFlow from '../the-flow.vue';

describe('TheFlow', () => {
	const pinia = createPinia();
	setActivePinia(pinia);

	vi.spyOn(FlowsAPI, 'getList').mockResolvedValue({
		items: [],
		next: false,
	});

	it('renders a component', () => {
		const wrapper = shallowMount(TheFlow, {
			global: {
				plugins: [
					pinia,
				],
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
