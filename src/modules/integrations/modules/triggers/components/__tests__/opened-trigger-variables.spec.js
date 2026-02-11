import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import OpenedTabComponentMixinMock from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';
import OpenedTriggerVariables from '../opened-trigger-variables.vue';

describe('OpenedTriggerVariables', () => {
	const computed = {
		itemInstance: () => ({}),
	};

	it('renders a component', () => {
		const wrapper = shallowMount(
			OpenedTriggerVariables,
			deepmerge.all([
				OpenedTabComponentMixinMock(),
				{
					props: {
						v: {
							itemInstance: {},
						},
					},
					computed,
				},
			]),
		);
		expect(wrapper.exists()).toBe(true);
	});
});
