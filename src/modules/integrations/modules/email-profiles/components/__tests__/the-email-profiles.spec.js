import { shallowMount } from '@vue/test-utils';
import TheEmailProfiles from '../the-email-profiles.vue';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';

describe('TheEmailProfiles', () => {
    it('renders a component', () => {
    const wrapper = shallowMount(TheEmailProfiles, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
