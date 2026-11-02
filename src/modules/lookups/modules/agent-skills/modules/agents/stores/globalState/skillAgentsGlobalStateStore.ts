import { SkillAgentsAPI } from '@webitel/api-services/api';
import { defineStore, storeToRefs } from 'pinia';
import { computed } from 'vue';

import { useSkillsCardStore } from '../../../../stores/card/skillsCardStore';
import { useSkillAgentsDatalistStore } from '../datalist/skillAgentsDatalistStore';
import { SkillAgentsNamespace } from '../namespace';

export const useSkillAgentsGlobalStateStore = defineStore(
	`${SkillAgentsNamespace}/global-state`,
	() => {
		const skillsCardStore = useSkillsCardStore();
		const { itemId: skillId } = storeToRefs(skillsCardStore);

		const tableStore = useSkillAgentsDatalistStore();
		const { aggs, filtersManager } = storeToRefs(tableStore);
		const { loadDataList } = tableStore;

		const isAllEnabled = computed(() => !!aggs.value?.enabled);
		const affectedCount = computed(() => aggs.value?.potentialRows || 0);

		const setGlobalState = async (enabled: boolean) => {
			await SkillAgentsAPI.patch({
				parentId: skillId.value,
				changes: {
					enabled,
					q: filtersManager.value.getAllValues().search,
				},
			});

			await loadDataList();
		};

		return {
			affectedCount,
			isAllEnabled,
			setGlobalState,
		};
	},
);
