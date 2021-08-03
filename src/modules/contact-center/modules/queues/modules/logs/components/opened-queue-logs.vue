<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.queues.logs.logs', 1) }}</h3>
      <div class="content-header__actions-wrap">
<!--        API IS NOT IMPLEMENTED-->
<!--        <wt-search-bar-->
<!--          :value="search"-->
<!--          debounce-->
<!--          @enter="loadList"-->
<!--          @input="setSearch"-->
<!--          @search="loadList"-->
<!--        ></wt-search-bar>-->
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="false"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template slot="destination" slot-scope="{ item }">
          <div v-if="item.destination">
            {{ item.destination.destination }}
          </div>
        </template>
        <template slot="agent" slot-scope="{ item }">
          <div v-if="item.agent">
            {{ item.agent.name }}
          </div>
        </template>
        <template slot="joinedAt" slot-scope="{ item }">
          {{ formatDate(item.joinedAt) }}
        </template>
        <template slot="leavingAt" slot-scope="{ item }">
          {{ formatDate(item.leavingAt) }}
        </template>
        <template slot="offeringAt" slot-scope="{ item }">
          {{ formatDate(item.offeringAt) }}
        </template>
        <template slot="duration" slot-scope="{ item }">
          {{ calcDuration(item) }}
        </template>
        <template slot="viewNumber" slot-scope="{ item }">
          <div v-if="item.destination">
            {{ item.destination.description }}
          </div>
        </template>
        <template slot="result" slot-scope="{ item }">
          {{ item.result }}
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
      ></wt-pagination>
    </div>
  </section>
</template>

<script>
import convertDuration from '@webitel/ui-sdk/src/scripts/convertDuration';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-queue-logs',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'log',
  }),

  methods: {
    formatDate(value) {
      if (!value) return '';
      return new Date(+value).toLocaleString();
    },

    calcDuration(item) {
      return convertDuration(item.offeringAt - item.joinedAt);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
