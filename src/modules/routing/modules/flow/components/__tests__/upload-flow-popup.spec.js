import { shallowMount } from '@vue/test-utils';
import UploadFlowPopup from '../upload-flow-popup.vue';

describe('UploadFlowPopup', () => {
  it('renders a component', () => {
    const wrapper = shallowMount(UploadFlowPopup, {
      propsData: {
        file: new File([], '321'),
      },
      mocks: {
        $v: {
          $touch: jest.fn(),
        },
      },
    });
    expect(wrapper.isVisible()).toBe(true);
  });
});