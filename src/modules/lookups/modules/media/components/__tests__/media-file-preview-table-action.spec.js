import { shallowMount } from '@vue/test-utils';

import MediaFilePreviewTableAction from '../media-file-preview-table-action.vue';

describe('MediaFilePreviewTableAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(MediaFilePreviewTableAction, {
			props: {
				type: '',
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
