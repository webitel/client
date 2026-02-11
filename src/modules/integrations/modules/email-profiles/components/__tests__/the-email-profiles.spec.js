import { shallowMount } from '@vue/test-utils';
import { reactive } from 'vue';

import tableComponentComputedMock from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';
import TheEmailProfiles from '../the-email-profiles.vue';

vi.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({
	store: reactive({}),
}));

describe('TheEmailProfiles', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(TheEmailProfiles, {
			computed: tableComponentComputedMock(),
		});
		expect(wrapper.exists()).toBe(true);
	});
});
