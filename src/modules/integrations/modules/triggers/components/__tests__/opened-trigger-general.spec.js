import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import OpenedTabComponentMixinMock from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';
import OpenedTriggerGeneral from '../opened-trigger-general.vue';

describe('OpenedTriggerGeneral', () => {
	const computed = {
		itemInstance: () => ({}),
	};

	it('renders a component', () => {
		const wrapper = shallowMount(
			OpenedTriggerGeneral,
			deepmerge.all([
				OpenedTabComponentMixinMock(),
				{
					i18n: {},
					props: {
						v: {
							itemInstance: {
								expression: {},
							},
						},
					},
					computed,
				},
			]),
		);
		expect(wrapper.exists()).toBe(true);
	});
});
