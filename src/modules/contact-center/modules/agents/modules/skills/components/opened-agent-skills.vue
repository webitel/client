<template>
  <section class="table-section">
    <skill-popup
      :parent-id="agentId"
      @saved="loadDataList"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.lookups.skills.skills', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="disableUserInput || !agentId"
          :disabled:delete="disableUserInput || !selected.length"
          @click:add="open"
          @click:refresh="loadDataList"
          @click:delete="deleteEls(selected)"
        >
          <template #search-bar>
            <dynamic-filter-search
              :filters-manager="filtersManager"
              @filter:add="addFilter"
              @filter:delete="deleteFilter"
              @filter:update="updateFilter"
            />
          </template>
        </wt-action-bar>
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-empty
        v-show="showEmpty"
        :image="imageEmpty"
        :text="textEmpty"
      />

      <wt-loader v-show="isLoading" />

      <wt-table
        v-show="dataList.length && !isLoading"
        :data="dataList"
        :headers="shownHeaders"
        :selected="selected"
        reorderable-columns
        resizable-columns
        sortable
        @column-reorder="columnReorder"
        @column-resize="columnResize"
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #name="{ item }">
          <wt-item-link
            v-if="item.skill"
            :link="{
              name: `${RouteNames.SKILLS}-card`,
              params: { id: item.skill.id },
            }"
          >
            {{ item.skill.name }}
          </wt-item-link>
        </template>
        <template #capacity="{ item }">
          {{ item.capacity }}
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="disableUserInput"
            :model-value="item.enabled"
            @update:model-value="
              patchItemProperty({ index, path: 'enabled', value: $event })
            "
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :disabled="disableUserInput"
            action="edit"
            @click="open(item.id)"
          />
          <wt-icon-action
            :disabled="disableUserInput"
            action="delete"
            @click="deleteEls([item])"
          />
        </template>
      </wt-table>
      <wt-pagination
        :next="next"
        :prev="page > 1"
        :size="size"
        debounce
        @change="updateSize"
        @next="updatePage(page + 1)"
        @prev="updatePage(page - 1)"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useNestedTableList } from '@webitel/ui-datalist';
import { useCardListNavigation } from '@webitel/ui-datalist/card';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useAgentsCardStore } from '../../../stores/card/agentsCardStore';
import { useAgentSkillsDatalistStore } from '../stores/datalist/agentSkillsDatalistStore';
import SkillPopup from './opened-agent-skills-popup.vue';

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const agentsCardStore = useAgentsCardStore();
const { itemId: agentId } = storeToRefs(agentsCardStore);

const agentSkillsDatalistStore = useNestedTableList({
	useTableStore: useAgentSkillsDatalistStore,
});
const {
	dataList,
	error,
	isLoading,
	page,
	size,
	next,
	selected,
	shownHeaders,
	filtersManager,
} = storeToRefs(agentSkillsDatalistStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	columnResize,
	columnReorder,
	deleteEls,
	patchItemProperty,
	addFilter,
	updateFilter,
	deleteFilter,
} = agentSkillsDatalistStore;

const { open } = useCardListNavigation({
	routeParamName: 'skillId',
});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>
