import { shallowMount } from '@vue/test-utils';

import TableMediaFilePreviewAction from '../table-media-file-preview-action.vue';

describe('TableMediaFilePreviewAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(TableMediaFilePreviewAction, {
			props: {
				type: '',
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
