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

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.directory.users.token', 2) }}</h3>

      <div class="content-header__actions-wrap">
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          :class="{'hidden': anySelected}"
          icon="bucket"
          :tooltip="$t('iconHints.deleteSelected')"
          @click="deleteSelected"
        ></wt-icon-btn>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          :tooltip="$t('iconHints.add')"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="!disableUserInput"
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
        <template slot="actions" slot-scope="{ item, index }">
          <wt-icon-btn
            icon="bucket"
            @click="remove(index)"
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
import TokenPopup from './opened-user-token-popup.vue';
import TokenCreatedPopup from './opened-user-token-created-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-user-tokens',
  mixins: [openedObjectTableTabMixin],
  components: { TokenPopup, TokenCreatedPopup },
  data: () => ({
    subNamespace: 'tokens',
    isPopup: false,
    isTokenGenerated: false,
  }),
  computed: {
    headers() {
      return [
        { value: 'usage', text: this.$t('objects.directory.users.usage') },
        { value: 'createdAt', text: this.$t('objects.directory.users.createdAt') },
        { value: 'createdBy', text: this.$t('objects.directory.users.createdBy') },
      ];
    },
  },

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