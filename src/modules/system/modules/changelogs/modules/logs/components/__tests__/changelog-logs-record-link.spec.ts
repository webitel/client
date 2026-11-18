import { shallowMount } from '@vue/test-utils';
import type { LoggerLog } from '@webitel/api-services/gen/models';
import { describe, expect, it } from 'vitest';

import ChangelogLogsRecordLink from '../changelog-logs-record-link.vue';

const item: LoggerLog = {
	object: {
		name: 'vi',
	},
	record: {
		id: '14',
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
