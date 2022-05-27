<template>
  <section>
    <token-popup
      v-if="isPopup"
      @close="closePopup"
      @token-created="openTokenCreatedPopup"
    ></token-popup>
    <token-created-popup
      v-if="isTokenGenerated"
      @close="closeTokenCreatedPopup"
    ></token-created-popup>
    <delete-confirmation-popup
      v-show="deleteConfirmation.isDeleteConfirmationPopup"
      :payload="deleteConfirmation"
      @close="closeDelete"
    ></delete-confirmation-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.directory.users.token', 2) }}</h3>

      <wt-table-actions
        :icons="['refresh']"
        @input="tableActionsHandler"
      >
        <delete-all-action
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :selected-count="selectedRows.length"
          @click="callDelete(selectedRows)"
        ></delete-all-action>
        <add-action
          v-if="!disableUserInput"
          @click="create"
        ></add-action>
      </wt-table-actions>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
        sortable
        @sort="sort"
      >
        <template slot="usage" slot-scope="{ item }">
          {{ item.usage }}
        </template>
        <template slot="createdBy" slot-scope="{ item }">
          <div v-if="item.createdBy">
            {{ item.createdBy.name }}
          </div>
        </template>
        <template slot="createdAt" slot-scope="{ item }">
          {{ prettifyDate(item.createdAt) }}
        </template>
        <template slot="actions" slot-scope="{ item }">
          <wt-icon-btn
            icon="bucket"
            @click="callDelete(item)"
          ></wt-icon-btn>
        </template>
      </wt-table>
      <wt-pagination
        :size="size"
        :next="isNext"
        :prev="page > 1"
        debounce
        @next="nextPage"
        @prev="prevPage"
        @input="setSize"
        @change="loadList"
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import AddAction from '../../../../../../../app/components/actions/add-action';
import TokenPopup from './opened-user-token-popup.vue';
import TokenCreatedPopup from './opened-user-token-created-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-user-tokens',
  mixins: [openedObjectTableTabMixin],
  components: { AddAction, TokenPopup, TokenCreatedPopup },
  data: () => ({
    subNamespace: 'tokens',
    isPopup: false,
    isTokenGenerated: false,
  }),

  methods: {
    openPopup() {
      this.isPopup = true;
    },
    closePopup() {
      this.isPopup = false;
      this.resetItemState();
    },

    openTokenCreatedPopup() {
      this.isPopup = false;
      this.isTokenGenerated = true;
    },

    closeTokenCreatedPopup() {
      this.isTokenGenerated = false;
      this.resetItemState();
    },

    prettifyDate(value) {
      return new Date(+value).toLocaleString();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
