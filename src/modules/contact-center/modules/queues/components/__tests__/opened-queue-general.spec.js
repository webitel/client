import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import OpenedTabComponentMixinMock from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';
import OpenedQueueGeneral from '../opened-queue-general.vue';

describe('OpenedQueueGeneral', () => {
	const computed = {
		itemInstance: () => ({
			type: 1,
		}),
		specificControls: () => ({}),
	};

	it('renders a component', () => {
		const wrapper = shallowMount(
			OpenedQueueGeneral,
			deepmerge.all([
				OpenedTabComponentMixinMock(),
				{
					computed,
				},
			]),
		);
		expect(wrapper.exists()).toBe(true);
	});
});
