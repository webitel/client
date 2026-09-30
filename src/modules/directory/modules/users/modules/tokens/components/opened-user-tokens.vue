<template>
  <section class="table-section">
    <token-popup
      :parent-id="userId"
      @created="onTokenCreated"
    />
    <token-created-popup
      v-if="createdToken"
      :token="createdToken"
      :user-name="user?.name"
      @close="closeTokenCreatedPopup"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :callback="deleteCallback"
      :delete-count="deleteCount"
      @close="closeDelete"
    />

    <header class="table-title">
      <h3 class="table-title__title">
        {{ t('objects.directory.users.token', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-action-bar
          :include="[IconAction.ADD, IconAction.REFRESH, IconAction.DELETE]"
          :disabled:add="!hasCreateAccess"
          :disabled:delete="!hasDeleteAccess || !selected.length"
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
        <template #createdBy="{ item }">
          {{ item.createdBy?.name }}
        </template>
        <template #createdAt="{ item }">
          {{ formatDateTime(item.createdAt) }}
        </template>
        <template #actions="{ item }">
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

<script lang="ts" setup>
import { useNestedTableList } from '@webitel/ui-datalist';
import { FormatDateMode, IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { formatDate } from '@webitel/ui-sdk/utils';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUsersCardStore } from '../../../stores/card/usersCardStore';
import { useUserTokensAccess } from '../composables/useUserTokensAccess';
import { useUserTokensDatalistStore } from '../stores/datalist/userTokensDatalistStore';
import TokenCreatedPopup from './opened-user-token-created-popup.vue';
import TokenPopup from './opened-user-token-popup.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { hasCreateAccess, hasDeleteAccess } = useUserTokensAccess();

const usersCardStore = useUsersCardStore();
const { itemId: userId, originalItemInstance: user } =
	storeToRefs(usersCardStore);

const tableStore = useNestedTableList({
	useTableStore: useUserTokensDatalistStore,
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
} = storeToRefs(tableStore);
const {
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	updateSelected,
	deleteEls,
	columnResize,
	columnReorder,
} = tableStore;

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const createdToken = ref('');

const add = () =>
	router.push({
		name: route.name,
		params: {
			...route.params,
			tokenId: 'new',
		},
		query: route.query,
	});

const onTokenCreated = (token: string) => {
	createdToken.value = token;
	loadDataList();
};

const closeTokenCreatedPopup = () => {
	createdToken.value = '';
};

const formatDateTime = (value?: number | string) =>
	formatDate(value, FormatDateMode.DATETIME);

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
