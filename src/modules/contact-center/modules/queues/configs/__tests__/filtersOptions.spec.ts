import type { FilterConfigDefinition } from '@webitel/ui-datalist/filters';
import { describe, expect, it } from 'vitest';
import { filtersOptions as logsFilters } from '../../modules/logs/configs/filtersOptions';
import { headers as logsHeaders } from '../../modules/logs/stores/datalist/_internals/headers';
import { filtersOptions as membersFilters } from '../../modules/members/configs/filtersOptions';
import { headers as membersHeaders } from '../../modules/members/stores/datalist/_internals/headers';
import { headers as queuesHeaders } from '../../stores/datalist/_internals/headers';
import { filtersOptions as queuesFilters } from '../filtersOptions';

const headersOf = {
	queues: queuesHeaders,
	logs: logsHeaders,
	members: membersHeaders,
};

/** a definition is either a shared `FilterOption` string or a config object */
const namesOf = (options: FilterConfigDefinition[]) =>
	options.map((option) => (typeof option === 'string' ? option : option.name));

/**
 * A filter's name is also its request param: the table store spreads
 * `filtersManager.getAllValues()` straight into `getList`. Rename one half and
 * the filter still renders, still persists, and quietly stops filtering — which
 * is exactly how the queue log's `duration` was broken before this migration.
 *
 * These lists are the contract, checked against what each api actually reads.
 */
describe('filter names match the request params', () => {
	it('queues', () => {
		// QueuesAPI.getList destructures search / queueType / team / tags
		expect(namesOf(queuesFilters)).toEqual([
			'queueType',
			'team',
			'tags',
		]);
	});

	it('queue logs', () => {
		// QueueLogsAPI.getList reads these
		expect(namesOf(logsFilters)).toEqual([
			'joinedAt',
			'result',
			'agent',
			'duration',
		]);
	});

	it('queue members', () => {
		// QueueMembersAPI.getList and mapResetMembersFilters read these
		expect(namesOf(membersFilters)).toEqual([
			'createdAt',
			'stopCause',
			'bucket',
			'agent',
			'memberPriority',
		]);
	});
});

describe('every panel', () => {
	const panels = {
		queues: queuesFilters,
		logs: logsFilters,
		members: membersFilters,
	};

	/** search lives in the action bar's search input, not on the panel */
	it.each(Object.entries(panels))(
		'leaves search off the %s panel',
		(_, options) => {
			expect(namesOf(options)).not.toContain('search');
		},
	);

	it.each(Object.entries(panels))('lists each %s filter once', (_, options) => {
		const names = namesOf(options);
		expect(new Set(names).size).toBe(names.length);
	});

	/**
	 * `cause` and `priority` already belong to HangupCause and CasePriority in
	 * the shared set, so members had to rename them; reverting would silently
	 * pick up the wrong config and label.
	 */
	it('keeps the members filters off the shared names they would collide with', () => {
		const names = namesOf(membersFilters);
		expect(names).not.toContain('cause');
		expect(names).not.toContain('priority');
	});

	it('keeps queue tags off FilterOption.Tag', () => {
		const names = namesOf(queuesFilters);
		expect(names).toContain('tags');
		expect(names).not.toContain('tag');
	});

	it.each(Object.entries(panels))(
		'offers every %s column filter on the panel too',
		(panel, options) => {
			const columnFilters = headersOf[panel as keyof typeof panels]
				.map((header) => header.filter)
				.filter(Boolean)
				.map((filter) =>
					typeof filter === 'string'
						? filter
						: (
								filter as {
									name: string;
								}
							).name,
				);

			expect(namesOf(options)).toEqual(expect.arrayContaining(columnFilters));
		},
	);

	/**
	 * A column filter built from a bare `FilterOption` gets the shared default
	 * config, not the panel's — so the same filter would render with different
	 * options depending on where it was opened. Headers take the very object
	 * the panel lists.
	 */
	it.each(Object.entries(panels))(
		'builds every %s column filter from the panel config',
		(panel, options) => {
			const columnFilters = headersOf[panel as keyof typeof panels]
				.map((header) => header.filter)
				.filter(Boolean);

			for (const filter of columnFilters) {
				expect(options).toContain(filter);
			}
		},
	);

	it('gives every app-defined filter both a field and a preview', () => {
		for (const [panel, options] of Object.entries(panels)) {
			for (const option of options) {
				if (typeof option === 'string') continue;
				expect(
					option.valueInputComponent,
					`${panel}/${option.name}`,
				).toBeTruthy();
				expect(
					option.valuePreviewComponent,
					`${panel}/${option.name}`,
				).toBeTruthy();
			}
		}
	});
});
