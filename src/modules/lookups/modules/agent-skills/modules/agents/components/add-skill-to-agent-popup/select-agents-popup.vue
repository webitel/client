<template>
  <wt-popup
    shown
    class="select-agents-popup"
    min-width="768"
    width="1440"
    @close="cancel"
  >
    <template #title>
      {{ t('objects.lookups.skills.assignSkillToAgents') }}
    </template>
    <template #main>
      <div class="select-agents-popup__filters">
        <wt-search-bar
          :value="filters.search"
          debounce
          @enter="handleFilterChange"
          @input="updateSearchValue($event)"
          @search="handleFilterChange"
        />
        <wt-multi-select
          :placeholder="t('objects.team')"
          :search-method="TeamsAPI.getLookup"
          :model-value="filters.teams"
          :disabled="!hasReadTeamAccess"
          @update:model-value="handleTeamsSelect"
        />
        <wt-multi-select
          :placeholder="t('objects.lookups.skills.skills', 1)"
          :search-method="SkillsAPI.getLookup"
          :model-value="filters.skills"
          @update:model-value="handleSkillsSelect"
        />
        <wt-icon-btn
          icon="clear"
          @click="resetFilters"
        />
      </div>
      <wt-empty
        v-show="showEmpty && !isLoading"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <div
        v-show="!dataList.length && isLoading"
        class="select-agents-popup__loader"
      >
        <wt-loader />
      </div>

      <div
        v-show="dataList.length"
        class="select-agents-popup__scroll-wrap"
      >
        <wt-table
          :key="tableKey"
          :data="dataList"
          :grid-actions="false"
          :headers="headers"
          :lazy="true"
          :on-loading="handleIntersect"
          data-key="id"
          sortable
          @sort="sort"
        >
          <template #name="{ item }">
            <wt-item-link
              :link="{
                name: `${RouteNames.AGENTS}-card`,
                params: { id: item.id },
              }"
            >
              {{ item.name }}
            </wt-item-link>
          </template>
          <template #team="{ item }">
            <wt-item-link
              v-if="item.team"
              :link="{
                name: `${RouteNames.TEAMS}-card`,
                params: { id: item.team.id },
              }"
            >
              {{ item.team.name }}
            </wt-item-link>
          </template>
        </wt-table>
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="!selectedRows.length"
        @click="handleNext"
      >
        {{ t('objects.next') }}
      </wt-button>
      <wt-button
        :color="ButtonColor.SECONDARY"
        @click="cancel"
      >
        {{ t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>


<script lang="ts" setup>
import { AgentsAPI, SkillsAPI, TeamsAPI } from '@webitel/api-services/api';
import type {
	EngineAgent,
	EngineLookup,
} from '@webitel/api-services/gen/models';
import type { DatalistTableHeader } from '@webitel/ui-datalist';
import { ButtonColor, WtObject } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import {
	type SortOrder,
	SortSymbols,
	sortToQueryAdapter,
} from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import { computed, onMounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../../app/router/_internals/RouteNames.enum';

type SelectableAgent = EngineAgent & {
	_isSelected: boolean;
};

const props = defineProps<{
	skillId: string | number | Array<string | number>;
}>();

const emit = defineEmits<{
	select: [
		agents: SelectableAgent[],
	];
	cancel: [];
}>();

const { t } = useI18n();

const getFilters = () => ({
	search: '',
	teams: [] as EngineLookup[],
	skills: [] as EngineLookup[],
	sort: '',
});

const { hasReadAccess: hasReadTeamAccess } = useUserAccessControl(
	WtObject.Team,
);

const filters = ref(getFilters());
const tableKey = ref(0);
const headers = reactive<DatalistTableHeader[]>([
	{
		value: 'name',
		field: 'name',
		locale: 'reusable.name',
		sort: SortSymbols.NONE,
	},
	{
		value: 'team',
		field: 'team',
		locale: 'objects.team',
		sort: SortSymbols.NONE,
	},
]);
const dataList = ref<SelectableAgent[]>([]);
const page = ref(0);
const isNext = ref(false);
const isLoading = ref(false);

const selectedRows = computed(() =>
	dataList.value.filter((item) => item._isSelected),
);

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	filters,
	error: ref(null),
	isLoading,
});

const setDataList = (items: SelectableAgent[]) => {
	if (page.value === 1) dataList.value = items;
	else dataList.value.push(...items);
};

const loadDataList = async () => {
	const { items, next } = await AgentsAPI.getList({
		size: 20,
		...filters.value,
		team: filters.value.teams.map(({ id }) => id),
		skill: filters.value.skills.map(({ id }) => id),
		notSkillId: props.skillId,
		page: page.value,
	});
	setDataList(
		items.map((item: EngineAgent) => ({
			...item,
			_isSelected: false,
		})),
	);
	isNext.value = next;
};

const callLoadDataList = async () => {
	isLoading.value = true;
	await loadDataList();
	isLoading.value = false;
};

const updateSearchValue = (value: string) => {
	if (!value) {
		isLoading.value = true;
	}

	filters.value.search = value;
};

const handleFilterChange = () => {
	page.value = 1;
	tableKey.value += 1;
	return callLoadDataList();
};

const handleTeamsSelect = (value: EngineLookup[]) => {
	filters.value.teams = value;
	return handleFilterChange();
};

const handleSkillsSelect = (value: EngineLookup[]) => {
	filters.value.skills = value;
	return handleFilterChange();
};

const resetFilters = () => {
	isLoading.value = true;
	filters.value = getFilters();
	return handleFilterChange();
};

const handleNext = () => emit('select', selectedRows.value);

const sort = (header: DatalistTableHeader, nextSortOrder: SortOrder) => {
	filters.value.sort = nextSortOrder
		? `${sortToQueryAdapter(nextSortOrder)}${header.field}`
		: nextSortOrder;
	handleFilterChange();

	headers.forEach((oldHeader) => {
		oldHeader.sort =
			oldHeader.field === header.field ? nextSortOrder : SortSymbols.NONE;
	});
};

const cancel = () => emit('cancel');

const handleIntersect = () => {
	if (!isNext.value || isLoading.value) return;
	page.value += 1;
	callLoadDataList();
};

onMounted(() => {
	page.value = 1;
	return callLoadDataList();
});
</script>

<style scoped>
.select-agents-popup__filters {
  display: grid;
  align-items: center;
  margin-bottom: var(--spacing-sm);
  grid-template-columns: repeat(3, 1fr) var(--spacing-md);
  gap: var(--spacing-xs);
}

.select-agents-popup__loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35vh;
}

.select-agents-popup :deep(.wt-popup__main) {
  display: flex;
  flex-direction: column;
}

.select-agents-popup__scroll-wrap {
  overflow: auto;
  flex-grow: 1;
  min-height: 0;
  height: 35vh;
}
</style>
