import { shallowMount } from '@vue/test-utils';
import deepmerge from 'deepmerge';
import OpenedCognitiveProfileGoogle
  from '../opened-cognitive-profile-google.vue';
import OpenedTabComponentMixinMock
  from '../../../../../../../../tests/unit/mocks/mixinMocks/openedTabComponentMixin.mock';

describe('OpenedCognitiveProfileGoogle', () => {
  const computed = {
    itemInstance: () => ({
      properties: {},
    }),
  };

  it('renders a component', () => {
    const wrapper = shallowMount(OpenedCognitiveProfileGoogle, deepmerge.all([
      OpenedTabComponentMixinMock(),
      {
        props: {
          v: { itemInstance: { properties: { key: { $error: false } } } },
        },
        computed,
      },
    ]));
    expect(wrapper.exists()).toBe(true);
  });
});
