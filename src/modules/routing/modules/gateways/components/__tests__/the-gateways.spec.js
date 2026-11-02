import { shallowMount } from '@vue/test-utils';
import { GatewaysAPI } from '@webitel/api-services/api';
import { createPinia, setActivePinia } from 'pinia';

import TheGateways from '../the-gateways.vue';

describe('TheGateways', () => {
	const pinia = createPinia();
	setActivePinia(pinia);

	vi.spyOn(GatewaysAPI, 'getList').mockResolvedValue({
		items: [],
		next: false,
	});

	it('renders a component', () => {
		const wrapper = shallowMount(TheGateways, {
			global: {
				plugins: [
					pinia,
				],
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
