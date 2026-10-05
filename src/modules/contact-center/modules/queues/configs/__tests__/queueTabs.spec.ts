import { QueueType } from '@webitel/ui-sdk/enums';
import { describe, expect, it } from 'vitest';

import QueuesRoutesName from '../../router/_internals/QueuesRoutesName.enum';
import { QueueTabId, QueueTypeSpecificTabs } from '../queueTabs';

const allQueueTypes = Object.values(QueueType);
const routeNames = new Set<string>(Object.values(QueuesRoutesName));

/** the card builds `[general, params, ...specific, hooks, variables]` */
const alwaysLeading = [
	QueueTabId.General,
	QueueTabId.Params,
];
const alwaysTrailing = [
	QueueTabId.Hooks,
	QueueTabId.Variables,
];

describe('queue type specific tabs', () => {
	it('covers every queue type', () => {
		for (const type of allQueueTypes) {
			expect(
				QueueTypeSpecificTabs[type],
				`no tabs for type ${type}`,
			).toBeDefined();
		}
		expect(Object.keys(QueueTypeSpecificTabs)).toHaveLength(
			allQueueTypes.length,
		);
	});

	/**
	 * A tab id with no matching descriptor renders a blank tab, and a pathName
	 * that is not a real route only fails when someone clicks it.
	 */
	it('only names tabs the card can render', () => {
		const known = new Set(Object.values(QueueTabId));
		for (const [type, tabs] of Object.entries(QueueTypeSpecificTabs)) {
			for (const tab of tabs) {
				expect(known.has(tab), `type ${type} names unknown tab ${tab}`).toBe(
					true,
				);
			}
		}
	});

	it('maps every tab id onto a declared route name', () => {
		const pathNames: Record<string, string> = {
			[QueueTabId.General]: QueuesRoutesName.GENERAL,
			[QueueTabId.Params]: QueuesRoutesName.PARAMETERS,
			[QueueTabId.Processing]: QueuesRoutesName.PROCESSING,
			[QueueTabId.Agents]: QueuesRoutesName.AGENTS,
			[QueueTabId.Skills]: QueuesRoutesName.SKILLS,
			[QueueTabId.Resources]: QueuesRoutesName.RESOURCES,
			[QueueTabId.Buckets]: QueuesRoutesName.BUCKETS,
			[QueueTabId.Hooks]: QueuesRoutesName.HOOKS,
			[QueueTabId.Amd]: QueuesRoutesName.AMD,
			[QueueTabId.Variables]: QueuesRoutesName.VARIABLES,
			[QueueTabId.Permissions]: QueuesRoutesName.PERMISSIONS,
			[QueueTabId.Logs]: QueuesRoutesName.LOGS,
		};

		for (const id of Object.values(QueueTabId)) {
			expect(pathNames[id], `no route for tab ${id}`).toBeDefined();
			expect(routeNames.has(pathNames[id])).toBe(true);
		}
	});

	it('never repeats the tabs the card already adds around them', () => {
		for (const [type, tabs] of Object.entries(QueueTypeSpecificTabs)) {
			for (const fixed of [
				...alwaysLeading,
				...alwaysTrailing,
			]) {
				expect(tabs, `type ${type} repeats ${fixed}`).not.toContain(fixed);
			}
		}
	});

	it('lists no tab twice within a type', () => {
		for (const [type, tabs] of Object.entries(QueueTypeSpecificTabs)) {
			expect(new Set(tabs).size, `type ${type} has duplicates`).toBe(
				tabs.length,
			);
		}
	});

	/** the shapes the migration must not quietly change */
	it('keeps the per-type tab sets', () => {
		expect(QueueTypeSpecificTabs[QueueType.OUTBOUND_JOB_QUEUE]).toEqual([
			QueueTabId.Buckets,
		]);
		expect(QueueTypeSpecificTabs[QueueType.OUTBOUND_IVR_QUEUE]).toEqual([
			QueueTabId.Resources,
			QueueTabId.Buckets,
			QueueTabId.Amd,
		]);
		// amd belongs to the three types whose defaults seed payload.amd
		const withAmd = allQueueTypes.filter((type) =>
			QueueTypeSpecificTabs[type].includes(QueueTabId.Amd),
		);
		expect(withAmd).toEqual([
			QueueType.OUTBOUND_IVR_QUEUE,
			QueueType.PROGRESSIVE_DIALER,
			QueueType.PREDICTIVE_DIALER,
		]);
	});
});
