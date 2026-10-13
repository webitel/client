import { shallowMount } from '@vue/test-utils';

import MediaPlayAction from '../media-play-action.vue';

describe('MediaPlayAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(MediaPlayAction);
		expect(wrapper.isVisible()).toBe(true);
	});
});
