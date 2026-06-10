import { shallowMount } from '@vue/test-utils';
import { reactive } from 'vue';

import tableComponentComputedMock from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';
import QueueStateAPI from '../../modules/state/api/queueState';
import TheQueues from '../the-queues.vue';

vi.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({
	store: reactive({}),
}));

// mounted() fetches global state over the network; stub it to avoid a real request
vi.mock('../../modules/state/api/queueState');
QueueStateAPI.getQueuesGlobalState.mockResolvedValue({
	isAllEnabled: false,
	potentialRows: 0,
});

describe('TheQueues', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(TheQueues, {
			computed: tableComponentComputedMock(),
		});
		expect(wrapper.exists()).toBe(true);
	});
});
