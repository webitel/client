import { shallowMount } from '@vue/test-utils';

import ChangelogLogsRecordLink from '../changelog-logs-record-link.vue';

const item = {
	object: {
		name: 'vi',
	},
	record: {
		id: 14,
	},
};

describe('ChangelogLogsRecordLink', () => {
	it('renders a component', () => {
		const wrapper = shallowMount(ChangelogLogsRecordLink, {
			props: {
				item,
			},
		});
		expect(wrapper.isVisible()).toBe(true);
	});
});
