<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="configuration table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="() => open()"
        hide-secondary
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <configuration-popup
        @close="close"
        @saved="loadDataList"
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
            {{
              t('objects.all', {
                entity: t('objects.system.configuration.configuration', 2).toLowerCase(),
              })
            }}
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
            @click:primary="open()"
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
              {{ item.name }}
            </template>
            <template #value="{ item }">
              <div
                v-if="isMultiselectValue(item.value)"
                class="configuration__table-value"
              >
                <wt-chip
                  v-for="(chip, index) of item.value"
                  :key="getChipKey(item.name, chip, index)"
                >
                  {{ getChipLabel(item.name, chip) }}
                </wt-chip>
              </div>
              <div v-else>
                {{ getScalarValueLabel(item.name, item.value) }}
              </div>
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                :disabled="!hasUpdateAccess"
                action="edit"
                @click="open(String(item.id))"
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
import { useCardListNavigation } from '@webitel/ui-datalist/card';
import { DynamicFilterSearchComponent as DynamicFilterSearch } from '@webitel/ui-datalist/filters';
import { IconAction } from '@webitel/ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { useTableEmpty } from '@webitel/ui-sdk/src/modules/TableComponentModule/composables/useTableEmpty';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import { useConfigurationDatalistStore } from '../stores/datalist/configurationDatalistStore';
import { getParameterDescriptor } from '../utils/parameterDescriptors';
import ConfigurationPopup from './configuration-popup.vue';

const { t } = useI18n();
const route = useRoute();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const tableStore = useConfigurationDatalistStore();

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
	addFilter,
	updateFilter,
	deleteFilter,
} = tableStore;

initialize();

const { open } = useCardListNavigation({
	routeParamName: 'id',
});

const close = () =>
	router.push({
		name: route.name,
		query: route.query,
	});

const {
	isVisible: isDeleteConfirmationPopup,
	deleteCount,
	deleteCallback,
	askDeleteConfirmation,
	closeDelete,
} = useDeleteConfirmationPopup();

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

const path = computed(() => [
	{
		name: t('objects.system.system'),
	},
	{
		name: t('objects.system.configuration.configuration', 1),
		route: '/system/configuration',
	},
]);

const getPropertyValue = (
	obj: unknown,
	property: string,
	fallback: unknown = '',
) => {
	if (typeof obj === 'string') return obj;
	return (obj as Record<string, unknown> | undefined)?.[property] || fallback;
};

const isMultiselectValue = (value: unknown): value is unknown[] =>
	Array.isArray(value) && value.length > 0;

const getScalarValueLabel = (settingName: string, value: unknown) => {
	const { select } = getParameterDescriptor(settingName);
	const option = select?.options?.find((opt) => opt.value === value);
	return option?.locale ? t(option.locale) : value;
};

const getChipKey = (settingName: string, chip: unknown, index: number) => {
	const { listDisplay } = getParameterDescriptor(settingName);
	return getPropertyValue(chip, listDisplay?.keyProperty || 'id', index);
};

const getChipLabel = (settingName: string, chip: unknown) => {
	const { listDisplay } = getParameterDescriptor(settingName);
	return getPropertyValue(chip, listDisplay?.labelProperty || 'label', chip);
};
</script>

<style lang="scss" scoped>
.configuration {
  &__table-value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2xs);
  }
}
</style>
