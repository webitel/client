<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="agent-skills table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="create"
      >
        <template #actions>
          <wt-button
            :disabled="!selected.length || !hasSkillAssignToAgentAccess"
            :color="ButtonColor.SECONDARY"
            @click="isAssignAgentsPopup = true"
          >
            {{ t('objects.lookups.skills.assignAgent') }}
          </wt-button>
        </template>
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <add-skill-to-agent-popup
        v-if="hasSkillAssignToAgentAccess && isAssignAgentsPopup"
        :skill-id="selectedIds"
        @close="isAssignAgentsPopup = false"
        @saved="loadDataList"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.lookups.skills.allSkills') }}
          </h3>
          <wt-action-bar
            :include="[
              IconAction.REFRESH,
              IconAction.DELETE,
              IconAction.COLUMNS,
            ]"
            :disabled:delete="!hasDeleteAccess || !selected.length"
            @click:refresh="loadDataList"
            @click:delete="
              askDeleteConfirmation({
                deleted: selected,
                callback: () => deleteEls(selected),
              })
            "
          >
            <template #search-bar>
              <dynamic-filter-search
                :filters-manager="filtersManager"
                :is-filters-restoring="isFiltersRestoring"
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
              />
            </template>
            <template #columns>
              <wt-table-column-select
                :headers="headers"
                @change="updateShownHeaders"
              />
            </template>
          </wt-action-bar>
        </header>

        <div class="table-section__table-wrapper">
          <wt-empty
            v-show="showEmpty"
            :image="imageEmpty"
            :text="textEmpty"
            :primary-action-text="primaryActionTextEmpty"
            :disabled-primary-action="!hasCreateAccess"
            @click:primary="create()"
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
                :link="{
                  name: `${RouteNames.SKILLS}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #description="{ item }">
              {{ item.description }}
            </template>
            <template #totalAgents="{ item }">
              {{ item.totalAgents }}
            </template>
            <template #activeAgents="{ item }">
              {{ item.activeAgents }}
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                :disabled="!hasDeleteAccess"
                action="delete"
                @click="
                  askDeleteConfirmation({
                    deleted: [item],
                    callback: () => deleteEls([item]),
                  })
                "
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
  </wt-page-wrapper>
</template>

<script setup lang="ts">
import type { EngineSkill } from '@webitel/api-services/gen/models';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { ButtonColor, IconAction, WtObject } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import AddSkillToAgentPopup from '../modules/agents/components/add-skill-to-agent-popup/add-skill-to-agent-popup.vue';
import { useSkillsDatalistStore } from '../stores/datalist/skillsDatalistStore';

const { t } = useI18n();
const router = useRouter();
const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();
const {
	hasReadAccess: hasReadAgentAccess,
	hasUpdateAccess: hasUpdateAgentAccess,
} = useUserAccessControl(WtObject.Agent);

const hasSkillAssignToAgentAccess = computed(
	() => hasReadAgentAccess.value && hasUpdateAgentAccess.value,
);

const skillsDatalistStore = useSkillsDatalistStore();

const {
	dataList,
	selected,
	error,
	isLoading,
	page,
	size,
	next,
	headers,
	shownHeaders,
	filtersManager,
	isFiltersRestoring,
} = storeToRefs(skillsDatalistStore);

const {
	initialize,
	loadDataList,
	updateSelected,
	updatePage,
	updateSize,
	updateSort,
	columnResize,
	columnReorder,
	updateShownHeaders,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
} = skillsDatalistStore;

initialize();

const isAssignAgentsPopup = ref(false);

const selectedIds = computed(() => selected.value.map(({ id }) => String(id)));

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const path = computed(() => [
	{
		name: t('objects.lookups.lookups'),
	},
	{
		name: t('objects.lookups.skills.agentSkills', 2),
		route: '/lookups/skills',
	},
]);

const create = () =>
	router.push({
		name: `${RouteNames.SKILLS}-card`,
		params: {
			id: 'new',
		},
	});

const edit = (item: EngineSkill) =>
	router.push({
		name: `${RouteNames.SKILLS}-card`,
		params: {
			id: item.id,
		},
	});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
} = useTableEmpty({
	dataList,
	error,
	filters: computed(() => filtersManager.value.getAllValues()),
	isLoading,
});
</script>
