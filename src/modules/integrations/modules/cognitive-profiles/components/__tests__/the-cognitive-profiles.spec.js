import { ref } from 'vue';
import { shallowMount } from '@vue/test-utils';
import TheCognitiveProfiles from '../the-cognitive-profiles.vue';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';

jest.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({ reloadSortable: ref(false) }));

describe('TheCognitiveProfiles', () => {
    it('renders a component', () => {
    const wrapper = shallowMount(TheCognitiveProfiles, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
