import { shallowMount } from '@vue/test-utils';

import TextToSpeechPopup from '../text-to-speech-popup.vue';

describe('TextToSpeechPopup', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(TextToSpeechPopup);
		expect(wrapper.exists()).toBe(true);
	});
});
