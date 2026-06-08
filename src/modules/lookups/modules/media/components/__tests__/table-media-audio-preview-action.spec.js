import { shallowMount } from '@vue/test-utils';

import TableMediaAudioPreviewAction from '../table-media-audio-preview-action.vue';

describe('TableMediaAudioPreviewAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(TableMediaAudioPreviewAction);
		expect(wrapper.isVisible()).toBe(true);
	});
});
