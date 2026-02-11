<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="table-page"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <delete-confirmation-popup
        :shown="isDeleteConfirmationPopup"
        :callback="deleteCallback"
        :delete-count="deleteCount"
        @close="closeDelete"
      />

      <storage-popup
        v-if="isStorageSelectPopup"
        @close="closeStorageSelectPopup"
      />
      <section class="table-section">
        <header class="table-title">
          <h3 class="table-title__title">
            {{ $t('objects.integrations.storage.allStorages') }}
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
          :show-action="dummy.showAction"
          :src="dummy.src"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
          @create="create"
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
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #type="{ item }">
              {{ prettifyType(item.type) }}
            </template>
            <template #maxSize="{ item }">
              {{ item.maxSize }}
            </template>
            <template #expireDays="{ item }">
              {{ item.expireDays }}
            </template>
            <template #state="{ item, index }">
              <wt-switcher
                :disabled="!hasUpdateAccess"
                :model-value="!item.disabled"
                @update:model-value="patchProperty({ index, prop: 'disabled', value: !$event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasUpdateAccess"
                @click="edit(item)"
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
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { computed } from 'vue';
import { mapActions, useStore } from 'vuex';

import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import dummyPicDark from '../assets/adm-dummy-storage-dark.svg';
import dummyPicLight from '../assets/adm-dummy-storage-light.svg';
import Storage from '../store/_internals/enums/Storage.enum';
import StoragePopup from './_unused/create-storage-popup.vue';

const namespace = 'integrations/storage';

export default {
	name: 'TheStorage',
	components: {
		StoragePopup,
		DeleteConfirmationPopup,
	},
	mixins: [
		tableComponentMixin,
	],

	setup() {
		const store = useStore();
		const darkMode = computed(() => store.getters['appearance/DARK_MODE']);
		const dummyPic = computed(() =>
			darkMode.value ? dummyPicDark : dummyPicLight,
		);
		const { dummy } = useDummy({
			namespace,
			showAction: true,
			dummyPic,
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
		routeName: RouteNames.STORAGE,
		isStorageSelectPopup: false,
	}),

	computed: {
		path() {
			return [
				{
					name: this.$t('objects.integrations.integrations'),
				},
				{
					name: this.$t('objects.integrations.storage.storage'),
					route: '/integrations/storage',
				},
			];
		},
	},

	methods: {
		...mapActions({
			patchProperty(dispatch, payload) {
				return dispatch(`${this.namespace}/PATCH_ITEM_PROPERTY`, payload);
			},
		}),
		create() {
			this.$router.push({
				name: `${RouteNames.STORAGE}-card`,
				params: {
					type: Storage.S3,
					id: 'new',
				},
			});
		},
		editLink({ type, id }) {
			return {
				name: `${RouteNames.STORAGE}-card`,
				params: {
					type,
					id,
				},
			};
		},
		closeStorageSelectPopup() {
			this.isStorageSelectPopup = false;
		},
		prettifyType(type) {
			switch (type) {
				case Storage.LOCAL:
					return 'Local';
				case Storage.S3:
					return 'S3 Bucket';
				case Storage.BACKBLAZE:
					return 'Backblaze';
				case Storage.DROPBOX:
					return 'Dropbox';
				case Storage.DRIVE:
					return 'Google Drive';
				default:
					return '';
			}
		},
	},
};
</script>

<style
  lang="scss"
  scoped
></style>
