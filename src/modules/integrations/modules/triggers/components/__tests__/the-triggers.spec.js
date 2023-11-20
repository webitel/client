import { mount } from '@vue/test-utils';
import { reactive } from 'vue';
import tableComponentComputedMock
  from '../../../../../../../tests/unit/mocks/tableComponentComputed.mock';
import { useDummy } from '../../../../../../app/composables/useDummy';
import TheTriggers from '../the-triggers.vue';

jest.mock('../../../../../../app/composables/useDummy');
useDummy.mockImplementation(() => ({ store: reactive({}) }));

describe('TheTriggers', () => {
  it('renders a component', () => {
    const wrapper = mount(TheTriggers, { computed: tableComponentComputedMock() });
    expect(wrapper.exists()).toBe(true);
  });
});
