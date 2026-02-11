import { shallowMount } from '@vue/test-utils';
import { reactive } from 'vue';

import tableComponentComputedMock from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';
import TheCognitiveProfiles from '../the-cognitive-profiles.vue';

vi.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({
	store: reactive({}),
}));

describe('TheCognitiveProfiles', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(TheCognitiveProfiles, {
			computed: tableComponentComputedMock(),
		});
		expect(wrapper.exists()).toBe(true);
	});
});
