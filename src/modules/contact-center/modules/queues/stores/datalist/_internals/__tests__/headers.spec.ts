import { describe, expect, it } from 'vitest';

import { headers as agentsHeaders } from '../../../../modules/agents/stores/datalist/_internals/headers';
import { headers as bucketsHeaders } from '../../../../modules/buckets/stores/datalist/_internals/headers';
import { headers as hooksHeaders } from '../../../../modules/hooks/stores/datalist/_internals/headers';
import { headers as logsHeaders } from '../../../../modules/logs/stores/datalist/_internals/headers';
import { headers as membersHeaders } from '../../../../modules/members/stores/datalist/_internals/headers';
import { headers as resGroupsHeaders } from '../../../../modules/res-groups/stores/datalist/_internals/headers';
import { headers as skillsHeaders } from '../../../../modules/skills/stores/datalist/_internals/headers';
import { headers as queuesHeaders } from '../headers';

const tables = {
	queues: queuesHeaders,
	hooks: hooksHeaders,
	buckets: bucketsHeaders,
	resGroups: resGroupsHeaders,
	skills: skillsHeaders,
	agents: agentsHeaders,
	logs: logsHeaders,
	members: membersHeaders,
};

describe.each(Object.entries(tables))('%s headers', (_name, headers) => {
	/**
	 * `shownHeaders` is `headers.filter(h => h.show)` and `fields` is derived
	 * from it, so a header without `show` is not merely hidden — its field is
	 * never requested, and the column can never be switched back on.
	 */
	it('marks every column shown', () => {
		for (const header of headers) {
			expect(header.show, `${header.value} is not shown`).toBe(true);
		}
	});

	it('gives every column a request field', () => {
		for (const header of headers) {
			expect(header.field, `${header.value} has no field`).toBeTruthy();
		}
	});

	it('names each column once', () => {
		const values = headers.map((header) => header.value);
		expect(new Set(values).size).toBe(values.length);
	});
});

/**
 * Field names go straight into the request, so these are the ones that would
 * fail silently — the column renders, the sort or the payload just does nothing.
 */
describe('field names that do not match their column', () => {
	const fieldOf = (headers: typeof queuesHeaders, value: string) =>
		headers.find((header) => header.value === value)?.field;

	it('keeps the queue resource-group field snake_case', () => {
		expect(fieldOf(queuesHeaders, 'resourceGroups')).toBe('resource_groups');
	});

	it('points the queue state column at `enabled`', () => {
		expect(fieldOf(queuesHeaders, 'state')).toBe('enabled');
	});

	/** the bucket column reads as "enabled" but the stored field is inverted */
	it('points the bucket state column at `disabled`', () => {
		expect(fieldOf(bucketsHeaders, 'state')).toBe('disabled');
	});

	it('points the hook state column at `enabled`', () => {
		expect(fieldOf(hooksHeaders, 'state')).toBe('enabled');
	});

	/** duration is derived from the joined/leaving pair, so it sorts on joined */
	it('sorts the log duration column by `joined_at`', () => {
		expect(fieldOf(logsHeaders, 'duration')).toBe('joined_at');
	});

	it('sorts the skill capacity column by `max_capacity`', () => {
		expect(fieldOf(skillsHeaders, 'capacity')).toBe('max_capacity');
	});
});
