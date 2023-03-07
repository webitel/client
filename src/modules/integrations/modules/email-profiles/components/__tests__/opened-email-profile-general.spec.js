import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedEmailProfileGeneral
  from '../opened-email-profile-general.vue';
import OpenedTabComponentMixinMock
  from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';

describe('OpenedEmailProfileGeneral', () => {
  const computed = {
    itemInstance: () => ({}),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedEmailProfileGeneral, deepmerge.all([
      OpenedTabComponentMixinMock(),
      {
        props: {
          v: { itemInstance: { properties: {} } },
        },
        computed,
      },
    ]));
    expect(wrapper.exists()).toBe(true);
  });
});
