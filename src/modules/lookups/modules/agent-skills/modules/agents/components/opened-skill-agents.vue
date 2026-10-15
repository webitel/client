<template>
   <section class="skill-agents table-section">
    <add-skill-to-agent-popup
      v-if="isAssignAgentsPopup && skillId"
      :skill-id="skillId"
      @close="isAssignAgentsPopup = false"
      @saved="loadDataList"
    />

    <replace-agent-skill-popup
      :shown="isReplaceSkillPopup"
      :selected-agents="selected"
      @change="replaceSkill"
      @close="isReplaceSkillPopup = false"
    />

    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.agents.allAgents') }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[
            IconAction.ADD,
            IconAction.REFRESH,
            IconAction.DELETE,
          ]"
          :disabled:add="!hasAgentUpdateAccess"
          :disabled:delete="!hasAgentUpdateAccess || !selected.length"
          @click:add="isAssignAgentsPopup = true"
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
              @filter:add="addFilter"
              @filter:update="updateFilter"
              @filter:delete="deleteFilter"
            />
          </template>
          <skill-agents-global-state-switcher :disabled="!hasAgentUpdateAccess" />
          <wt-icon-btn
            :disabled="!hasAgentUpdateAccess || !selected.length"
            class="icon-action"
            icon="arrow-mix"
            @click="isReplaceSkillPopup = true"
          />
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
        sortable
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #name="{ item }">
          <wt-item-link
            :link="{
              name: `${RouteNames.AGENTS}-card`,
              params: { id: item.agent.id },
            }"
          >
            {{ item.agent.name }}
          </wt-item-link>
        </template>
        <template #team="{ item }">
          <wt-item-link
            v-if="item.team?.id"
            :link="{
              name: `${RouteNames.TEAMS}-card`,
              params: { id: item.team.id },
            }"
          >
            {{ item.team.name }}
          </wt-item-link>
        </template>
        <template #capacity="{ item, index }">
          <wt-input-number
            :disabled="!hasAgentUpdateAccess"
            :model-value="item.capacity"
            @update:model-value="patchCapacity(index, $event)"
          />
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="!hasAgentUpdateAccess"
            :model-value="item.enabled"
            @update:model-value="patchEnabled(index, $event)"
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            :disabled="!hasAgentUpdateAccess"
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

<script lang="ts" setup>
import { useDebounceFn } from '@vueuse/core';
import { SkillAgentsAPI } from '@webitel/api-services/api';
import type { EngineLookup } from '@webitel/api-services/gen/models';
import { useNestedTableList } from '@webitel/ui-datalist';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction, WtObject } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useSkillsCardStore } from '../../../stores/card/skillsCardStore';
import { useSkillAgentsDatalistStore } from '../stores/datalist/skillAgentsDatalistStore';
import AddSkillToAgentPopup from './add-skill-to-agent-popup/add-skill-to-agent-popup.vue';
import ReplaceAgentSkillPopup from './replace-agent-skill-popup.vue';
import SkillAgentsGlobalStateSwitcher from './skill-agents-global-state-switcher.vue';

const { t } = useI18n();

const { hasUpdateAccess: hasAgentUpdateAccess } = useUserAccessControl(
	WtObject.Agent,
);

const skillsCardStore = useSkillsCardStore();
const { itemId: skillId } = storeToRefs(skillsCardStore);

const skillAgentsDatalistStore = useNestedTableList({
	useTableStore: useSkillAgentsDatalistStore,
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
} = storeToRefs(skillAgentsDatalistStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	deleteEls,
	patchItemProperty,
	addFilter,
	updateFilter,
	deleteFilter,
} = skillAgentsDatalistStore;

const isAssignAgentsPopup = ref(false);
const isReplaceSkillPopup = ref(false);

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const patchCapacity = useDebounceFn(
	(index: number, value: number) =>
		patchItemProperty({
			index,
			path: 'capacity',
			value,
		}),
	1000,
);

const patchEnabled = async (index: number, value: boolean) => {
	await patchItemProperty({
		index,
		path: 'enabled',
		value,
	});
	await loadDataList({
		withLoading: false,
	});
};

const replaceSkill = async (changes: {
	skill: EngineLookup;
	enabled: boolean;
}) => {
	try {
		await SkillAgentsAPI.patch({
			parentId: String(skillId.value),
			changes,
			id: selected.value.map(({ id }) => id),
		});
	} finally {
		await loadDataList();
	}
};

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
