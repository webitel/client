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
      <upload-popup
        :file="csvFile"
        @close="closeCSVPopup"
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
            {{ $t('objects.directory.users.allUsers') }}
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
          class="table-section__table-wrapper"
        >
          <wt-table
            :data="dataList"
            :headers="headers"
            sortable
            @sort="sort"
          >
            <template #name="{ item }">
              <adm-item-link
                :id="item.id"
                :route-name="RouteNames.USERS"
              >
                {{ item.name }}
              </adm-item-link>
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
                :model-value="getDND(item.presence)"
                @update:model-value="setDND({ item, value: $event })"
              />
            </template>
            <template #actions="{ item }">
              <wt-icon-action
                action="edit"
                :disabled="!hasEditAccess"
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
import { mapActions } from 'vuex';

import UploadFileIconBtn from '../../../../../app/components/utils/upload-file-icon-btn.vue';
import { useDummy } from '../../../../../app/composables/useDummy';
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import tableComponentMixin from '../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum';
import UserStatus from './_internals/user-status-chips.vue';
import UploadPopup from './upload-users-popup.vue';

const namespace = 'directory/users';

export default {
  name: 'TheUsers',
  components: {
    UploadPopup,
    UserStatus,
    UploadFileIconBtn,
    DeleteConfirmationPopup,
  },
  mixins: [tableComponentMixin],

  setup() {
    const { dummy } = useDummy({
      namespace,
      hiddenText: true,
    });
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    const pageUserAccessControl = useUserAccessControl();

    return {
      dummy,
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      hasCreateAccess: pageUserAccessControl.hasCreateAccess,
      hasUpdateAccess: pageUserAccessControl.hasUpdateAccess,
      hasDeleteAccess: pageUserAccessControl.hasDeleteAccess,

      askDeleteConfirmation,
      closeDelete,
    };
  },
  data: () => ({
    csvFile: null,
    namespace,
    routeName: RouteNames.USERS,
  }),

  computed: {
    path() {
      return [
        {
          name: this.$t('objects.directory.directory'),
        },
        {
          name: this.$t('objects.user', 2),
          route: '/directory/users',
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
        return value.status.includes('dnd');
      }
      return false;
    },

    processCSV(files) {
      const file = files[0];
      if (file) {
        this.csvFile = file;
      }
    },

    closeCSVPopup() {
      this.csvFile = null;
      this.loadList();
    },
  },
};
</script>
