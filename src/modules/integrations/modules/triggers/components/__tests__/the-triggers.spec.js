import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import TheTriggers from '../the-triggers.vue';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';

jest.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({ reloadSortable: ref(false) }));

describe('TheTriggers', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(TheTriggers, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
