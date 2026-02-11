import { shallowMount } from '@vue/test-utils';

import filterComponentMixinMock from '../../../../../../../../../tests/unit/mocks/mixinMocks/filterComponentMixin.mock';
import FlowTypeFilter from '../flow-type-filter.vue';

describe('FlowTypeFilter', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(FlowTypeFilter, {
			...filterComponentMixinMock(),
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
