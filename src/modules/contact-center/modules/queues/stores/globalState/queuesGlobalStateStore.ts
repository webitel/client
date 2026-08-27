import { QueuesStateAPI } from '@webitel/api-services/api';
import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useQueuesDatalistStore } from '../datalist/queuesDatalistStore';
import { QueuesNamespace } from '../namespace';

/**
 * The enabled/disabled state of *every* queue matching the table's current
 * filters, as opposed to the per-row `enabled` the datalist already holds.
 *
 * It lives in a store rather than in the switcher component because two
 * unrelated places move it: the switcher itself, and the table's per-row state
 * toggle — flipping one row can make the whole filtered set enabled or no
 * longer enabled. The page used to reach into the switcher through a template
 * ref (`defineExpose({ fetchGlobalState })`) to say so, which coupled the two
 * components in both directions. Now both just talk to this.
 */
export const useQueuesGlobalStateStore = defineStore(
	`${QueuesNamespace}/global-state`,
	() => {
		const tableStore = useQueuesDatalistStore();
		const { filtersManager } = storeToRefs(tableStore);

		const isAllEnabled = ref(false);
		const affectedCount = ref(0);

		/** filter names are already the api's param names — no manual merge needed */
		const filterParams = () => filtersManager.value.getAllValues();

		const fetchGlobalState = async () => {
			const state = await QueuesStateAPI.getQueuesGlobalState(filterParams());

			isAllEnabled.value = !!state?.isAllEnabled;
			affectedCount.value = state?.potentialRows || 0;
		};

		/**
		 * Writing the whole filtered set invalidates the rows on screen, so the
		 * list is reloaded here instead of through a `changed` event the page had
		 * to remember to wire up.
		 */
		const setGlobalState = async (enabled: boolean) => {
			await QueuesStateAPI.setQueuesGlobalState({
				enabled,
				params: filterParams(),
			});

			isAllEnabled.value = enabled;

			await Promise.all([
				tableStore.loadDataList(),
				fetchGlobalState(),
			]);
		};

		return {
			affectedCount,
			fetchGlobalState,
			isAllEnabled,
			setGlobalState,
		};
	},
);
