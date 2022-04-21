<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.queues.queues', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :data="dataList"
        :headers="headers"
        :grid-actions="false"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template slot="name" slot-scope="{ item }">
          <div v-if="item.queue">
            {{ item.queue.name }}
          </div>
        </template>

        <template slot="type" slot-scope="{ item }">
          {{ $t(QueueTypeProperties[item.type].locale) }}
        </template>

        <template slot="count" slot-scope="{ item }">
          {{ item.countMembers }}
        </template>

        <template slot="waiting" slot-scope="{ item }">
          {{ item.waitingMembers }}
        </template>

        <template slot="strategy" slot-scope="{ item }">
          {{ item.strategy }}
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
import QueueTypeProperties from '../../../../queues/lookups/QueueTypeProperties.lookup';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-agent-queues',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'queues',
    QueueTypeProperties,
  }),
};
</script>

<style lang="scss" scoped>
</style>
