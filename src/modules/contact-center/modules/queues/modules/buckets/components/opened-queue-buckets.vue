<template>
  <section>
    <bucket-popup
      v-if="isBucketPopup"
      @close="closePopup"
    ></bucket-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.lookups.buckets.buckets', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @input="setSearch"
          @search="loadList"
          @enter="loadList"
        ></wt-search-bar>
        <wt-icon-btn
          v-if="!disableUserInput"
          :class="{'hidden': anySelected}"
          :tooltip="$t('iconHints.deleteSelected')"
          class="icon-action"
          icon="bucket"
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
        <template slot="name" slot-scope="{ item }">
          {{ item.bucket.name }}
        </template>
        <template slot="capacity" slot-scope="{ item }">
          {{ item.ratio }}
        </template>
        <template slot="actions" slot-scope="{ item, index }">
          <edit-action
            @click="edit(item)"
          ></edit-action>
          <delete-action
            @click="remove(index)"
          ></delete-action>
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
import BucketPopup from './opened-queue-buckets-popup.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-queue-outbound-ivr-buckets',
  mixins: [openedObjectTableTabMixin],
  components: { BucketPopup },
  data: () => ({
    subNamespace: 'buckets',
    isBucketPopup: null,
  }),

  computed: {
    headers() {
      return [
        { value: 'name', text: this.$tc('objects.lookups.buckets.buckets', 2) },
        { value: 'ratio', text: this.$t('objects.ccenter.queues.bucketRatio') },
      ];
    },
  },

  methods: {
    openPopup() {
      this.isBucketPopup = true;
    },
    closePopup() {
      this.isBucketPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
