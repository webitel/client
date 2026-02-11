import { shallowMount } from '@vue/test-utils';

import OpenedQueueParams from '../opened-queue-params.vue';

describe('OpenedQueueParams', () => {
	const props = {
		v: {
			itemInstance: {
				payload: {},
			},
		},
	};
	const computed = {
		itemInstance: () => ({
			type: 1,
			payload: {},
		}),
		specificControls: () => ({}),
	};

	it('renders a component', () => {
		const wrapper = shallowMount(OpenedQueueParams, {
			computed,
			props,
			global: {
				mocks: {
					$route: {
						name: 'vi',
					},
				},
			},
		});
		expect(wrapper.exists()).toBe(true);
	});
});
