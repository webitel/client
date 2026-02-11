import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import openedObjectMixinMock from '../../../../../../../tests/unit/mocks/mixinMocks/openedObjectMixin.mock';
import OpenedTriggerProfile from '../opened-trigger.vue';

describe('OpenedTriggerProfile', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(
			OpenedTriggerProfile,
			deepmerge.all([
				openedObjectMixinMock(),
				{},
			]),
		);
		expect(wrapper.exists()).toBe(true);
	});
});
