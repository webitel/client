import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import TheEmailProfiles from '../the-email-profiles.vue';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';

jest.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({ reloadSortable: ref(false) }));

describe('TheEmailProfiles', () => {
    it('renders a component', () => {
    const wrapper = shallowMount(TheEmailProfiles, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
