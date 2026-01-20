<template>
  <wt-popup
    v-bind="$attrs"
    class="opened-skill-agent-popup"
    min-width="768"
    width="1440"
    @close="cancel"
  >
    <template #title>
      {{ $t('objects.lookups.skills.assignSkillToAgents') }}
    </template>
    <template #main>
      <div class="opened-skill-agent-popup__filters">
        <wt-search-bar
          :value="filters.search"
          debounce
          @enter="handleFilterChange"
          @input="filters.search = $event"
          @search="handleFilterChange"
        />
        <wt-select
          :placeholder="$t('objects.team')"
          :search-method="TeamsAPI.getLookup"
          :value="filters.teams"
          multiple
          @input="handleTeamsSelect"
        />
        <wt-select
          :placeholder="$t('objects.lookups.skills.skills', 1)"
          :search-method="SkillsAPI.getLookup"
          :value="filters.skills"
          multiple
          @input="handleSkillsSelect"
        />
        <wt-icon-btn
          icon="clear"
          @click="resetFilters"
        />
      </div>
      <div
        class="scroll-wrap"
      >
        <wt-table
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
            <adm-item-link
              :id="item.id"
              :route-name="RouteNames.AGENTS"
            >
              {{ item.name }}
            </adm-item-link>
          </template>
          <template #team="{ item }">
            <adm-item-link
              v-if="item.team"
              :id="item.team.id"
              :route-name="RouteNames.AGENTS"
            >
              {{ item.team.name }}
            </adm-item-link>
          </template>
        </wt-table>
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="!selectedRows.length"
        @click="handleNext"
      >
        {{ $t('objects.next') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="cancel"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script setup>
import { SortSymbols, sortToQueryAdapter } from '@webitel/ui-sdk/src/scripts/sortQueryAdapters';
import { computed, onMounted,reactive, ref } from 'vue';

import RouteNames from '../../../../../../../../app/router/_internals/RouteNames.enum.js';
import AgentsAPI from '../../../../../../../contact-center/modules/agents/api/agents';
import TeamsAPI from '../../../../../../../contact-center/modules/teams/api/teams';
import SkillsAPI from '../../../../api/agentSkills';
import WtIntersectionObserver from '@webitel/ui-sdk/components/wt-intersection-observer/wt-intersection-observer.vue';

const props = defineProps({
  skillId: {
    type: [String, Array], // Array of strings
    required: true,
  },
});

const emit = defineEmits(['select', 'cancel']);

// we should keep filters schema in separate function
// in order to reset it completely at "filters reset" action
const getFilters = () => ({
  search: '',
  teams: [],
  skills: [],
  sort: '',
});

const filters = ref(getFilters());
const headers = reactive([
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
const dataList = ref([]);
const page = ref(0);
const isNext = ref(false);
const isLoading = ref(false);


const selectedRows = computed(() => dataList.value.filter((item) => item._isSelected));

function setDataList(items) {
  if (page.value === 1) dataList.value = items;
  else dataList.value.push(...items);
}

async function loadDataList() {
  const size = 20;
  const params = {
    size,
    ...filters.value,
    team: filters.value.teams.map(({ id }) => id),
    skill: filters.value.skills.map(({ id }) => id),
    notSkillId: props.skillId,
    page: page.value,
  };
  const { items, next } = await AgentsAPI.getList(params);
  const _items = items.map((i) => ({ ...i, _isSelected: false }));
  setDataList(_items);
  isNext.value = next;
}

function handleFilterChange() {
  page.value = 1;
  return loadDataList();
}

function handleTeamsSelect(value) {
  filters.value.teams = value;
  return handleFilterChange();
}

function handleSkillsSelect(value) {
  filters.value.skills = value;
  return handleFilterChange();
}

function resetFilters() {
  filters.value = getFilters();
  return handleFilterChange();
}

function handleNext() {
  emit('select', selectedRows.value);
}

function sort(header, nextSortOrder) {
  filters.value.sort = nextSortOrder
    ? `${sortToQueryAdapter(nextSortOrder)}${header.field}`
    : nextSortOrder;
  handleFilterChange();

  headers.forEach((oldHeader) => {
    if (oldHeader.sort !== undefined) {

      oldHeader.sort = oldHeader.field === header.field ? nextSortOrder : SortSymbols.NONE;
    }
  });
}

function cancel() {
  emit('cancel');
}

async function callLoadDataList() {
  isLoading.value = true;
  await loadDataList();
  isLoading.value = false;
}

const handleIntersect = () => {
  if (!isNext.value) return;
  page.value += 1;
  callLoadDataList();
}

onMounted(async () => {
  page.value = 1;
  await callLoadDataList();
});
</script>

<style lang="scss">
.opened-skill-agent-popup {
  &__filters {
    display: grid;
    align-items: center;
    margin-bottom: var(--spacing-sm);
    grid-template-columns: repeat(3, 1fr) var(--spacing-md);
    gap: var(--spacing-xs);
  }

  &.wt-popup {
    .wt-popup__main {
      display: flex;
      flex-direction: column;
    }

    .scroll-wrap {
      overflow: auto;
      flex-grow: 1;
      min-height: 0;
    }
  }

  .scroll-wrap {
    height: 65vh;
  }
}

</style>
