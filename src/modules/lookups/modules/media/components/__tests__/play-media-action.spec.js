import { shallowMount } from '@vue/test-utils';

import PlayMediaAction from '../play-media-action.vue';

describe('PlayMediaAction', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(PlayMediaAction);
		expect(wrapper.isVisible()).toBe(true);
	});
});
