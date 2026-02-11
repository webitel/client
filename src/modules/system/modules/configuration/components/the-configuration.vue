<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="addItem"
        hide-secondary
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <configuration-popup
        :namespace="namespace"
        @close="closeConfigurationPopup"
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
              $t('objects.all', {
                entity: $t('objects.system.configuration.configuration', 2).toLowerCase(),
              })
            }}
          </h3>
          <div class="table-title__actions-wrap">
            <wt-search-bar
              :value="search"
              debounce
              @enter="loadList"
              @input="setSearch"
              @search="loadList"
            />
            <wt-table-actions
              :icons="['refresh']"
              @input="tableActionsHandler"
            >
              <delete-all-action
                v-if="hasDeleteAccess"
                :class="{ 'hidden': anySelected }"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :dark-mode="darkMode"
          class="dummy-wrapper"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-section__table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              {{ item.name }}
            </template>
            <template #value="{ item }">
              <div
                v-if="isMultiselectValue(item.value)"
                class="the-configuration__table-value"
              >
                <wt-chip
                  v-for="(chip, index) of item.value"
                  :key="getChipKey(item.name, chip, index)"
                >
                  {{ getChipLabel(item.name, chip) }}
                </wt-chip>
              </div>
              <div v-else>
                {{ item.value }}
              </div>
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasUpdateAccess"
                @click="editParameter(item)"
              />
              <wt-icon-action
                action="delete"
                :disabled="!hasDeleteAccess"
                @click="askDeleteConfirmation({
                  deleted: [item],
                  callback: () => deleteData(item),
                })"
              />
            </template>
          </wt-table>
          <wt-pagination
            :next="isNext"
            :prev="page > 1"
            :size="size"
            debounce
            @change="loadList"
            @input="setSize"
            @next="nextPage"
            @prev="prevPage"
          />
        </div>
      </section>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';

import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import {
	getMultiselectDisplayConfig,
	getPropertyValue,
} from '../utils/multiselectConfigurations';
import ConfigurationPopup from './configuration-popup.vue';

const namespace = 'system/configuration';

export default {
	name: 'TheConfiguration',
	components: {
		ConfigurationPopup,
		DeleteConfirmationPopup,
	},
	mixins: [
		tableComponentMixin,
	],
	setup() {
		const { dummy } = useDummy({
			namespace,
		});
		const {
			isVisible: isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			askDeleteConfirmation,
			closeDelete,
		} = useDeleteConfirmationPopup();

		const { hasCreateAccess, hasUpdateAccess, hasDeleteAccess } =
			useUserAccessControl();

		return {
			dummy,
			isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			askDeleteConfirmation,
			closeDelete,
			hasCreateAccess,
			hasUpdateAccess,
			hasDeleteAccess,
		};
	},
	data: () => ({
		namespace,
		EngineSystemSettingName,
	}),
	computed: {
		path() {
			return [
				{
					name: this.$t('objects.system.system'),
				},
				{
					name: this.$t('objects.system.configuration.configuration', 1),
					route: 'configuration',
				},
			];
		},
	},
	methods: {
		addItem() {
			this.$router.push({
				...this.$route,
				params: {
					id: 'new',
				},
			});
		},
		closeConfigurationPopup() {
			this.$router.go(-1);
		},
		editParameter(item) {
			this.$router.push({
				...this.$route,
				params: {
					id: item.id,
				},
			});
		},
		isMultiselectValue(value) {
			return Array.isArray(value) && value.length;
		},
		getChipKey(settingName, chip, index) {
			const config = getMultiselectDisplayConfig(settingName);
			const keyProperty = config.display?.keyProperty || 'id';
			return getPropertyValue(chip, keyProperty, index);
		},
		getChipLabel(settingName, chip) {
			const config = getMultiselectDisplayConfig(settingName);
			const labelProperty = config.display?.labelProperty || 'label';
			return getPropertyValue(chip, labelProperty, chip);
		},
	},
};
</script>
<style
  lang="scss"
  scoped
>
.the-configuration {
  &__table-value {
    display: flex;
    flex-wrap: wrap;
    gap: var(--spacing-2xs);
  }
}
</style>
