import { shallowMount } from '@vue/test-utils';
import { ChatGatewaysAPI } from '@webitel/api-services/api';
import { createPinia, setActivePinia } from 'pinia';

import TheChatGateways from '../the-chat-gateways.vue';

describe('TheChatGateways', () => {
	const pinia = createPinia();
	setActivePinia(pinia);

	vi.spyOn(ChatGatewaysAPI, 'getList').mockResolvedValue({
		items: [],
		next: false,
	});

	it('renders a component', () => {
		const wrapper = shallowMount(TheChatGateways, {
			global: {
				plugins: [
					pinia,
				],
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
