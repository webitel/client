import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';

import openedObjectMixinMock from '../../../../../../../tests/unit/mocks/mixinMocks/openedObjectMixin.mock';
import OpenedQueue from '../opened-queue.vue';

describe('OpenedQueue', () => {
	it('renders a component', () => {
		const mock = vi.fn();
		vi.spyOn(OpenedQueue.methods, 'loadPageData').mockImplementation(mock);
		const wrapper = shallowMount(
			OpenedQueue,
			deepmerge.all([
				openedObjectMixinMock(),
				{},
			]),
		);
		expect(wrapper.exists()).toBe(true);
	});
});
