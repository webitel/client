<template>
  <section class="table-section">
    <skill-popup @saved="loadDataList" />

    <object-list-popup
      v-show="!!bucketsRowId"
      :data-list="shownBuckets"
      :title="t('objects.lookups.buckets.buckets', 2)"
      @close="closeBuckets"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.lookups.skills.skills', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="disableUserInput"
          :disabled:delete="disableUserInput || !selected.length"
          @click:add="add"
          @click:refresh="loadDataList"
          @click:delete="deleteEls(selected)"
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
        <template #name="{ item }">
          <div v-if="item.skill">
            {{ item.skill.name }}
          </div>
        </template>

        <template #capacity="{ item }">
          {{ item.minCapacity }} - {{ item.maxCapacity }}
        </template>

        <template #lvl="{ item }">
          {{ item.lvl }}
        </template>

        <template #buckets="{ item }">
          <one-plus-many
            v-if="item.buckets"
            :collection="item.buckets"
            @input="openBuckets(item)"
          />
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
            @click="edit(item)"
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
import type { EngineQueueSkill } from '@webitel/api-services/gen/models';
import { IconAction } from '@webitel/ui-sdk/enums';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import ObjectListPopup from '../../../../../../../app/components/utils/object-list-popup/object-list-popup.vue';
import OnePlusMany from '../../../../../../../app/components/utils/table-cell/one-plus-many-table-cell/one-plus-many-table-cell.vue';
import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import { useEnsureQueueSaved } from '../../../composables/useEnsureQueueSaved';
import { useQueueSkillsDatalistStore } from '../stores';
import SkillPopup from './opened-queue-skills-popup.vue';

// the card page still passes `namespace` and a vuelidate instance to every tab

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});

const parentId = computed(() => route.params.id as string);
const isNewQueue = computed(() => !parentId.value || parentId.value === 'new');

const tableStore = useQueueSkillsDatalistStore();
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

watch(parentId, (id, previous) => {
	if (id && id !== 'new' && previous === 'new')
		initialize({
			parentId: id,
		});
});

const ensureQueueSaved = useEnsureQueueSaved();

const openPopup = (skillId: string) =>
	router.push({
		name: route.name,
		params: {
			...route.params,
			skillId,
		},
		query: route.query,
	});

const add = async () => {
	if (isNewQueue.value) {
		const savedId = await ensureQueueSaved();
		if (!savedId) return;
	}
	return openPopup('new');
};

const edit = (item: EngineQueueSkill) => openPopup(String(item.id));

/**
 * The bucket list of one row, kept deep-linkable through `?bucket=<skill id>`.
 *
 * This used to be store state filled by a `GET_ITEM_BUCKETS` action, but the
 * action only ever searched `dataList` for the row — every row already carries
 * its own `buckets`. A computed says the same thing, and comparing as strings
 * fixes the old `parseInt` mismatch against string ids.
 */
const bucketsRowId = computed(() => route.query.bucket as string | undefined);

const shownBuckets = computed(
	() =>
		dataList.value.find(
			(item) => String(item.id) === String(bucketsRowId.value),
		)?.buckets ?? [],
);

const openBuckets = (item: EngineQueueSkill) =>
	router.push({
		name: route.name,
		params: route.params,
		query: {
			...route.query,
			bucket: String(item.id),
		},
	});

const closeBuckets = () => {
	const query = {
		...route.query,
	};
	delete query.bucket;
	// strip the param rather than go(-1), which broke when the url was opened cold
	return router.push({
		name: route.name,
		params: route.params,
		query,
	});
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

<style
  lang="scss"
  scoped
></style>
