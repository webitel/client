import { shallowMount } from '@vue/test-utils';

import MediaAudioPreviewTableAction from '../media-audio-preview-table-action.vue';

describe('MediaAudioPreviewTableAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(MediaAudioPreviewTableAction);
		expect(wrapper.isVisible()).toBe(true);
	});
});
