import { reactive } from 'vue';
import { shallowMount } from '@vue/test-utils';
import TheFlow from '../the-flow.vue';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';

vi.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({ store: reactive({}) }));

describe('TheFlow', () => {
    it('renders a component', () => {
    const wrapper = shallowMount(TheFlow, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
