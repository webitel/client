<template>
  <wt-popup
    :shown="shown"
    size="sm"
    @close="emit('close')"
  >
    <template #title>
      {{ t('objects.ccenter.agents.subordinates', 2) }}
    </template>
    <template #main>
      <section>
        <wt-table
          :data="dataList"
          :grid-actions="false"
          :headers="headers"
          :selectable="false"
        >
          <template #subordinate="{ item }">
            {{ item.user?.name }}
          </template>
        </wt-table>
      </section>
    </template>
  </wt-popup>
</template>

<script lang="ts" setup>
import type { EngineAgent } from '@webitel/api-services/gen/models';
import { computed, ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

import { TeamSupervisorsAPI } from '../api/teamSupervisors';

const props = defineProps<{
	shown: boolean;
	supervisorId: string | null;
	teamId: string | number | null;
}>();

const emit = defineEmits<{
	close: [];
}>();

const { t } = useI18n();

const dataList = ref<EngineAgent[]>([]);

const headers = computed(() => [
	{
		value: 'subordinate',
		text: t('objects.ccenter.agents.subordinates', 1),
	},
]);

const loadDataList = async () => {
	const { items } = await TeamSupervisorsAPI.getTeamSupervisorSubordinatesList({
		page: 1,
		size: 100,
		supervisorId: props.supervisorId,
		teamId: props.teamId,
	});
	dataList.value = items;
};

watch(
	() => props.supervisorId,
	(id) => {
		if (id) loadDataList();
	},
);
</script>
