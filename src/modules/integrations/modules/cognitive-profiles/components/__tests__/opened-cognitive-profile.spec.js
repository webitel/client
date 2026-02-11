import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import openedObjectMixinMock from '../../../../../../../tests/unit/mocks/mixinMocks/openedObjectMixin.mock';
import OpenedCognitiveProfile from '../opened-cognitive-profile.vue';

describe('OpenedCognitiveProfile', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(
			OpenedCognitiveProfile,
			deepmerge.all([
				openedObjectMixinMock(),
				{
					// computed: {
					//   itemInstance: () => ({ provider: 'vi' }),
					// },
				},
			]),
		);
		expect(wrapper.exists()).toBe(true);
	});
});
