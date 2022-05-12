import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedCognitiveProfileGeneral
  from '../opened-cognitive-profile-general.vue';
import OpenedTabComponentMixinMock
  from '../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';

describe('OpenedCognitiveProfileGeneral', () => {
  const computed = {
    itemInstance: () => ({
      properties: {},
    }),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCognitiveProfileGeneral, deepmerge.all([
      OpenedTabComponentMixinMock(),
      {
        computed,
      },
    ]));
    expect(wrapper.exists()).toBe(true);
  });
});
