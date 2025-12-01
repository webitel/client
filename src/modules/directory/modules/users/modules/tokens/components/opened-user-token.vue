<template>
  <section>
    <token-popup
      :shown="isPopup"
      @close="closePopup"
      @token-created="openTokenCreatedPopup"
    />
    <token-created-popup
      v-if="isTokenGenerated"
      @close="closeTokenCreatedPopup"
    />
    <delete-confirmation-popup
      :shown="isDeleteConfirmationPopup"
      :delete-count="deleteCount"
      :callback="deleteCallback"
      @close="closeDelete"
    />

    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.directory.users.token', 2) }}
      </h3>

      <wt-table-actions
        :icons="['refresh']"
        @input="tableActionsHandler"
      >
        <delete-all-action
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :selected-count="selectedRows.length"
          @click="askDeleteConfirmation({
            deleted: selectedRows,
            callback: () => deleteData(selectedRows),
          })"
        />
        <wt-icon-action
          v-if="!disableUserInput"
          action="add"
          @click="create"
        />
      </wt-table-actions>
    </header>

    <wt-loader v-show="!isLoaded" />
    <div
      v-show="isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="!disableUserInput"
        :headers="headers"
        sortable
        @sort="sort"
      >
        <template #usage="{ item }">
          {{ item.usage }}
        </template>
        <template #createdBy="{ item }">
          <div v-if="item.createdBy">
            {{ item.createdBy.name }}
          </div>
        </template>
        <template #createdAt="{ item }">
          {{ prettifyDate(item.createdAt) }}
        </template>
        <template #actions="{ item }">
          <wt-icon-btn
            icon="bucket"
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

<script>
import { FormatDateMode } from '@webitel/flow-ui-sdk/enums';
import DeleteConfirmationPopup from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/components/delete-confirmation-popup.vue';
import { useDeleteConfirmationPopup } from '@webitel/ui-sdk/src/modules/DeleteConfirmationPopup/composables/useDeleteConfirmationPopup';
import { formatDate } from '@webitel/ui-sdk/utils';

import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import TokenCreatedPopup from './opened-user-token-created-popup.vue';
import TokenPopup from './opened-user-token-popup.vue';

export default {
  name: 'OpenedUserTokens',
  components: {
    TokenPopup,
    TokenCreatedPopup,
    DeleteConfirmationPopup,
  },
  mixins: [openedObjectTableTabMixin],

  setup() {
    const {
      isVisible: isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    } = useDeleteConfirmationPopup();

    return {
      isDeleteConfirmationPopup,
      deleteCount,
      deleteCallback,

      askDeleteConfirmation,
      closeDelete,
    };
  },

  data: () => ({
    subNamespace: 'tokens',
    isPopup: false,
    isTokenGenerated: false,
  }),

  computed: {
    tokenId() {
      return this.$route.params.tokenId;
    },
  },
  watch: {
    tokenId: {
      async handler(value) {
        if (value === 'new') {
          this.openPopup();
        }
      },
      immediate: true,
    }
  },

  methods: {
    addItem() {
      return this.$router.push({
        ...this.$route,
        params: { tokenId: 'new' },
      });
    },
    openPopup() {
      this.isPopup = true;
    },
    closePopup() {
      this.$router.go(-1);
      this.isPopup = false;
      this.resetItemState();
    },

    openTokenCreatedPopup() {
      this.isPopup = false;
      this.isTokenGenerated = true;
    },

    closeTokenCreatedPopup() {
      this.isTokenGenerated = false;
      this.$router.go(-1);
      this.resetItemState();
    },

    prettifyDate(value) {
      return formatDate(+value, FormatDateMode.DATETIME);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
