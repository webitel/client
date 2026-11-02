<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :primary-disabled="!hasCreateAccess"
        :primary-action="add"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <create-cognitive-profile-popup
        :shown="isCreatePopup"
        @close="isCreatePopup = false"
      />
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ t('objects.all', { entity: t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2) }) }}
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
            @click:primary="add"
          />

          <wt-loader v-show="isLoading" />

          <wt-table
            v-show="dataList.length && !isLoading"
            :data="dataList"
            :selected="selected"
            :headers="shownHeaders"
            sortable
            @sort="updateSort"
            @update:selected="updateSelected"
          >
            <template #name="{ item }">
              <wt-item-link
                :link="{
                  name: `${RouteNames.COGNITIVE_PROFILES}-card`,
                  params: { id: item.id },
                }"
              >
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #provider="{ item }">
              {{ item.provider }}
            </template>
            <template #service="{ item }">
              {{ t(`objects.${item.service.toLowerCase()}`) }}
            </template>
            <template #default="{ item, index }">
              <wt-radio
                :disabled="!hasUpdateAccess || !item.enabled"
                :selected="item.default"
                :value="true"
                @update:selected="setDefault({ index, value: $event })"
              />
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="item.enabled"
                @update:model-value="setEnabled({ item, index, value: $event })"
              />
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
import type { CognitiveProfileCard } from '@webitel/api-services/validations';
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
import emptyPicDark from '../assets/adm-empty-cognitive-profiles-dark.svg';
import emptyPicLight from '../assets/adm-empty-cognitive-profiles-light.svg';
import { useCognitiveProfilesDatalistStore } from '../stores/datalist/cognitiveProfilesDatalistStore';
import CreateCognitiveProfilePopup from './create-cognitive-profile-popup.vue';

const { t } = useI18n();
const router = useRouter();

const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
	useUserAccessControl();

const cognitiveProfilesDatalistStore = useCognitiveProfilesDatalistStore();
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
} = storeToRefs(cognitiveProfilesDatalistStore);

const {
	initialize,
	loadDataList,
	updatePage,
	updateSize,
	updateSort,
	patchItemProperty,
	deleteEls,
	addFilter,
	updateFilter,
	deleteFilter,
	updateSelected,
} = cognitiveProfilesDatalistStore;

initialize();

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
		name: t('objects.integrations.integrations'),
	},
	{
		name: t('objects.integrations.cognitiveProfiles.cognitiveProfiles', 2),
		route: '/integrations/cognitive-profiles',
	},
]);

/** [Claude] a new default unsets the previous one on the backend, so the list is reloaded to show it */
const setDefault = async ({
	index,
	value,
}: {
	index: number;
	value: boolean;
}) => {
	await patchItemProperty({
		index,
		path: 'default',
		value,
	});
	if (value) await loadDataList();
};

/** [Claude] a disabled profile can't stay the default one */
const setEnabled = async ({
	item,
	index,
	value,
}: {
	item: CognitiveProfileCard;
	index: number;
	value: boolean;
}) => {
	await patchItemProperty({
		index,
		path: 'enabled',
		value,
	});
	if (item.default && !value) {
		await setDefault({
			index,
			value: false,
		});
	}
};

const add = () => {
	isCreatePopup.value = true;
};

const edit = ({ id }: CognitiveProfileCard) =>
	router.push({
		name: `${RouteNames.COGNITIVE_PROFILES}-card`,
		params: {
			id,
		},
	});

const {
	showEmpty,
	image: imageEmpty,
	text: textEmpty,
	primaryActionText: primaryActionTextEmpty,
} = useTableEmpty(
	{
		dataList,
		error,
		filters: computed(() => filtersManager.value.getAllValues()),
		isLoading,
	},
	() => ({
		image: {
			empty: {
				dark: emptyPicDark,
				light: emptyPicLight,
			},
		},
		text: {
			empty: t('objects.integrations.emptyWorkspace'),
		},
	}),
);
</script>
