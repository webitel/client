<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="() => (isCreatePopup = true)"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <create-gateway-popup
        :shown="isCreatePopup"
        @close="isCreatePopup = false"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.routing.gateways.allGateways') }}
          </h3>
          <wt-action-bar
            :include="[IconAction.REFRESH, IconAction.DELETE]"
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
                single-search-name="search"
                @filter:add="addFilter"
                @filter:update="updateFilter"
                @filter:delete="deleteFilter"
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
            @click:primary="isCreatePopup = true"
          />

          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="dataList.length && !isLoading"
            :data="dataList"
            :selected="selected"
            :headers="shownHeaders"
            reorderable-columns
            resizable-columns
            sortable
            @column-reorder="columnReorder"
            @column-resize="columnResize"
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="RouteNames.GATEWAYS"
              >
                {{ item.name }}
              </adm-item-link>
            </template>
            <template #proxy="{ item }">
              {{ item.proxy }}
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="item.enable"
                @update:model-value="
                  patchItemProperty({ index, path: 'enable', value: $event })
                "
              />
            </template>
            <template #status="{ item }">
              <wt-indicator v-bind="getStatus(item.rState)" />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                :action="IconAction.EDIT"
                @click="edit(item)"
              />
              <wt-icon-action
                :disabled="!hasDeleteAccess"
                :action="IconAction.DELETE"
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
import { GatewayRegisterState } from '@webitel/api-services/enums';
import type { GatewayCard } from '@webitel/api-services/validations';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import { useGatewayDatalistStore } from '../stores';
import CreateGatewayPopup from './create-gateway-popup.vue';

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const gatewayDatalistStore = useGatewayDatalistStore();

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
} = storeToRefs(gatewayDatalistStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSelected,
	patchItemProperty,
	columnResize,
	columnReorder,
} = gatewayDatalistStore;

initialize();

const { t } = useI18n();
const router = useRouter();

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

const isCreatePopup = ref(false);

const path = computed(() => [
	{
		name: t('objects.routing.routing'),
	},
	{
		name: t('objects.routing.gateways.gateways', 2),
		route: '/routing/gateways',
	},
]);

const edit = (item: GatewayCard) =>
	router.push({
		name: `${RouteNames.GATEWAYS}-card`,
		params: {
			id: item.id,
		},
	});

/** [Claude] states between Registered and NoReg (unregister … expired) count as failed, the rest as not registered */
const getStatus = (state?: number) => {
	switch (state) {
		case GatewayRegisterState.Registered:
			return {
				color: 'success',
				text: t('objects.routing.gateways.stateSuccess'),
			};
		case GatewayRegisterState.Unregister:
		case GatewayRegisterState.Failed:
		case GatewayRegisterState.FailWait:
		case GatewayRegisterState.Expired:
			return {
				color: 'error',
				text: t('objects.routing.gateways.stateFailed'),
			};
		default:
			return {
				color: 'disabled',
				text: t('objects.routing.gateways.stateNonreg'),
			};
	}
};

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
