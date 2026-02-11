import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import openedObjectMixinMock from '../../../../../../../tests/unit/mocks/mixinMocks/openedObjectMixin.mock';
import OpenedEmailProfile from '../opened-email-profile.vue';

describe('OpenedEmailProfile', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(
			OpenedEmailProfile,
			deepmerge.all([
				openedObjectMixinMock(),
				{},
			]),
		);
		expect(wrapper.exists()).toBe(true);
	});
});
