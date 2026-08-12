import { onUnmounted, toRaw, watch } from 'vue';
import { useStore } from 'vuex';

import { useQueuesCardStore } from '../stores';

/**
 * The vuex module the un-migrated tabs still read from. Each of them hardcodes
 * this string rather than taking it as a prop.
 */
export const LEGACY_QUEUES_VUEX_NAMESPACE = 'ccenter/queues';

/**
 * @description
 * INTERIM SHIM — delete together with `store/queues.js`.
 *
 * The agents, skills, resources, buckets, hooks and logs tabs are still
 * `openedObjectTableTabMixin` components. Each one reads its `parentId` from
 * `ccenter/queues` state rather than from a prop, so while the card page runs
 * on pinia and those tabs do not, the two have to be kept in step.
 *
 * Mirrors one way only: pinia is the source of truth, vuex is the mirror.
 *
 * DIES IN: the nested-tables phase, once the last `openedObjectTableTabMixin`
 * consumer under `queues/modules/**` is gone.
 */
export const useLegacyQueueVuexBridge = () => {
	const vuex = useStore();
	// read through the store rather than `storeToRefs`: the store is created by
	// ui-datalist, which resolves its own pinia copy, so the two `Store` types
	// are structurally equal but not identical
	const cardStore = useQueuesCardStore();

	const sync = () => {
		vuex.commit(
			`${LEGACY_QUEUES_VUEX_NAMESPACE}/SET_ITEM_ID`,
			cardStore.itemId || 0,
		);
		vuex.commit(
			`${LEGACY_QUEUES_VUEX_NAMESPACE}/SET_ITEM`,
			structuredClone(toRaw(cardStore.draftItemInstance)) ?? {},
		);
	};

	/**
	 * Call before the card renders its `router-view`. The first sync has to be
	 * synchronous: a legacy tab that mounts before it would read `itemId: 0` and
	 * load the wrong list. That ordering is load-bearing.
	 */
	const bridgeToLegacyVuex = () => {
		sync();
		watch(
			() => [
				cardStore.itemId,
				cardStore.draftItemInstance,
			],
			sync,
			{
				deep: true,
			},
		);
	};

	// mirrors the legacy RESET_ITEM_STATE, which also resets the child modules
	onUnmounted(() =>
		vuex.dispatch(`${LEGACY_QUEUES_VUEX_NAMESPACE}/RESET_ITEM_STATE`),
	);

	return {
		bridgeToLegacyVuex,
	};
};
