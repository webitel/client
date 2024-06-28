<template>
  <wt-page-wrapper
    :actions-panel="false"
    class="users"
  >
    <template #header>
      <wt-page-header
        :hide-primary="!hasCreateAccess"
        :primary-action="create"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <upload-popup
        v-if="isUploadPopup"
        :file="csvFile"
        @close="closeCSVPopup"
      />
      <delete-confirmation-popup
        v-show="isDeleteConfirmationPopup"
        :delete-count="deleteCount"
        :callback="deleteCallback"
        @close="closeDelete"
      />

      <section class="main-section__wrapper">
        <header class="content-header">
          <h3 class="content-title">
            {{ $t('objects.directory.users.allUsers') }}
          </h3>
          <div class="content-header__actions-wrap">
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
                :class="{'hidden': anySelected}"
                :selected-count="selectedRows.length"
                @click="askDeleteConfirmation({
                  deleted: selectedRows,
                  callback: () => deleteData(selectedRows),
                })"
              />
              <upload-file-icon-btn
                v-if="hasCreateAccess"
                accept=".csv"
                class="icon-action"
                @change="processCSV"
              />
            </wt-table-actions>
          </div>
        </header>

        <wt-loader v-show="!isLoaded" />
        <wt-dummy
          v-if="dummy && isLoaded"
          :src="dummy.src"
          :dark-mode="darkMode"
          :text="dummy.text && $t(dummy.text)"
          class="dummy-wrapper"
        />
        <div
          v-show="dataList.length && isLoaded"
          class="table-wrapper"
        >
          <wt-table
            :data="dataList"
            :grid-actions="hasTableActions"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <wt-item-link :link="editLink(item)">
                {{ item.name }}
              </wt-item-link>
            </template>
            <template #status="{ item }">
              <user-status :presence="item.presence" />
            </template>
            <template #username="{ item }">
              {{ item.username }}
            </template>
            <template #extensions="{ item }">
              {{ item.extension }}
            </template>
            <template #DnD="{ item }">
              <wt-switcher
                :disabled="!hasEditAccess"
                :value="getDND(item.presence)"
                @change="setDND({item, value: $event})"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                v-if="hasEditAccess"
                action="edit"
                @click="edit(item)"
              />
              <wt-icon-action
                v-if="hasDeleteAccess"
                action="delete"
                class="table-action"
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
import DeleteConfirmationPopup from "@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue";
import { useDeleteConfirmationPopup } from "@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup";
import { mapActions } from "vuex";
import UploadFileIconBtn from "../../../../../app/components/utils/upload-file-icon-btn.vue";
import { useDummy } from "../../../../../app/composables/useDummy";
import tableComponentMixin from "../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin";
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum";
import UserStatus from "./_internals/user-status-chips.vue";
import UploadPopup from "./upload-users-popup.vue";

const namespace = "directory/users";

export default {
	name: "TheUsers",
	components: {
		UploadPopup,
		UserStatus,
		UploadFileIconBtn,
		DeleteConfirmationPopup,
	},
	mixins: [tableComponentMixin],

	setup() {
		const { dummy } = useDummy({ namespace, hiddenText: true });
		const {
			isVisible: isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			askDeleteConfirmation,
			closeDelete,
		} = useDeleteConfirmationPopup();

		return {
			dummy,
			isDeleteConfirmationPopup,
			deleteCount,
			deleteCallback,

			askDeleteConfirmation,
			closeDelete,
		};
	},
	data: () => ({
		isUploadPopup: false,
		csvFile: null,
		namespace,
		routeName: RouteNames.USERS,
	}),

	computed: {
		path() {
			return [
				{ name: this.$t("objects.directory.directory") },
				{
					name: this.$tc("objects.directory.users.users", 2),
					route: "/directory/users",
				},
			];
		},
	},

	methods: {
		...mapActions({
			setDND(dispatch, payload) {
				return dispatch(`${this.namespace}/SET_USER_DND`, payload);
			},
		}),

		getDND(value) {
			if (value?.status) {
				return value.status.includes("dnd");
			}
			return false;
		},

		processCSV(files) {
			const file = files[0];
			if (file) {
				this.csvFile = file;
				this.isUploadPopup = true;
			}
		},

		closeCSVPopup() {
			this.loadList();
			this.isUploadPopup = false;
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
