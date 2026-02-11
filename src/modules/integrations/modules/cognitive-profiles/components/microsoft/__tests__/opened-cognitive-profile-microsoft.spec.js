import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import OpenedTabComponentMixinMock from '../../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';
import OpenedCognitiveProfileMicrosoft from '../opened-cognitive-profile-microsoft.vue';

describe('OpenedCognitiveProfileMicrosoft', () => {
	const computed = {
		itemInstance: () => ({
			properties: {},
		}),
	};

	it('renders a component', () => {
		const wrapper = shallowMount(
			OpenedCognitiveProfileMicrosoft,
			deepmerge.all([
				OpenedTabComponentMixinMock(),
				{
					props: {
						v: {
							itemInstance: {
								properties: {},
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
