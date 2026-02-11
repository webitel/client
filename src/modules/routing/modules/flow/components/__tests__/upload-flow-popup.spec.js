import { shallowMount } from '@vue/test-utils';

import UploadFlowPopup from '../upload-flow-popup.vue';

describe('UploadFlowPopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(UploadFlowPopup, {
			props: {
				file: new File([], '321'),
			},
			global: {
				mocks: {
					v$: {
						$touch: vi.fn(),
					},
				},
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
