import { shallowMount } from '@vue/test-utils';
import { ChatplansAPI } from '@webitel/api-services/api';
import { createPinia, setActivePinia } from 'pinia';

import TheChatplan from '../the-chatplan.vue';

describe('TheChatplan', () => {
	const pinia = createPinia();
	setActivePinia(pinia);

	vi.spyOn(ChatplansAPI, 'getList').mockResolvedValue({
		items: [],
		next: false,
	});

	it('renders a component', () => {
		const wrapper = shallowMount(TheChatplan, {
			global: {
				plugins: [
					pinia,
				],
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
