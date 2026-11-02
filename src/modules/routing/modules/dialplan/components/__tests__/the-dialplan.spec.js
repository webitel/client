import { shallowMount } from '@vue/test-utils';
import { DialplansAPI } from '@webitel/api-services/api';
import { createPinia, setActivePinia } from 'pinia';

import TheDialplan from '../the-dialplan.vue';

describe('TheDialplan', () => {
	const pinia = createPinia();
	setActivePinia(pinia);

	vi.spyOn(DialplansAPI, 'getList').mockResolvedValue({
		items: [],
		next: false,
	});

	it('renders a component', () => {
		const wrapper = shallowMount(TheDialplan, {
			global: {
				plugins: [
					pinia,
				],
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
