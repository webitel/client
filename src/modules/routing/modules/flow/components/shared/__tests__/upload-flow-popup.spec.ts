import { shallowMount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';

import UploadFlowPopup from '../upload-flow-popup.vue';

describe('UploadFlowPopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(UploadFlowPopup, {
			props: {
				file: new File([], '321'),
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
