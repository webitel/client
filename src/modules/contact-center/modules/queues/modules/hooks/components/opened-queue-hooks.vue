<template>
  <section class="table-section">
    <hook-popup @saved="loadDataList" />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.ccenter.queues.hooks.hooks', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="disableUserInput"
          :disabled:delete="disableUserInput || !selected.length"
          @click:add="add"
          @click:refresh="loadDataList"
          @click:delete="
            askDeleteConfirmation({
              deleted: selected,
              callback: () => deleteEls(selected),
            })
          "
        />
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
        :grid-actions="!disableUserInput"
        :headers="shownHeaders"
        :selected="selected"
        sortable
        @sort="updateSort"
        @update:selected="updateSelected"
      >
        <template #event="{ item }">
          {{ t(`objects.ccenter.queues.hooks.eventTypes.${item.event}`) }}
        </template>
        <template #schema="{ item }">
          <adm-item-link
            v-if="item.schema"
            :id="item.schema.id"
            :route-name="RouteNames.FLOW"
            target="_blank"
          >
            {{ item.schema.name }}
          </adm-item-link>
        </template>
        <template #state="{ item, index }">
          <wt-switcher
            :disabled="!hasUpdateAccess"
            :model-value="item.enabled"
            @update:model-value="
              patchItemProperty({ index, path: 'enabled', value: $event })
            "
          />
        </template>
        <template #actions="{ item }">
          <wt-icon-action
            action="edit"
            @click="edit(item)"
          />
          <wt-icon-action
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
import type { EngineQueueHook } from '@webitel/api-services/gen/models';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import { useEnsureQueueSaved } from '../../../composables/useEnsureQueueSaved';
import { useQueueHooksDatalistStore } from '../stores/datalist/queueHooksDatalistStore';
import HookPopup from './opened-queue-hooks-popup.vue';

/**
 * The card page still hands every tab a `namespace` and a vuelidate instance;
 * neither means anything here. Remove once no legacy tab is left to feed.
 */

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { disableUserInput, hasUpdateAccess } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const parentId = computed(() => route.params.id as string);
const isNewQueue = computed(() => !parentId.value || parentId.value === 'new');

const tableStore = useQueueHooksDatalistStore();
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
} = storeToRefs(tableStore);
const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	deleteEls,
	patchItemProperty,
} = tableStore;

if (!isNewQueue.value)
	initialize({
		parentId: parentId.value,
	});

// a queue saved from this tab gets its id late; load the list once it exists
watch(parentId, (id, previous) => {
	if (id && id !== 'new' && previous === 'new')
		initialize({
			parentId: id,
		});
});

const ensureQueueSaved = useEnsureQueueSaved();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const openPopup = (hookId: string) =>
	router.push({
		name: route.name,
		params: {
			...route.params,
			hookId,
		},
		query: route.query,
	});

/**
 * A hook cannot exist before its queue does, so adding one from an unsaved
 * queue saves the queue first. The card owns that save and it validates, so an
 * invalid queue leaves us here with its errors shown instead.
 */
const add = async () => {
	if (isNewQueue.value) {
		const savedId = await ensureQueueSaved();
		if (!savedId) return;
	}
	return openPopup('new');
};

const edit = (item: EngineQueueHook) => openPopup(String(item.id));

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

<style
  lang="scss"
  scoped
></style>
