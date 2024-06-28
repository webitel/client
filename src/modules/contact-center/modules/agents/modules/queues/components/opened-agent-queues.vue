<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $tc('objects.ccenter.queues.queues', 2) }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        />
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <div
      v-show="isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :data="dataList"
        :grid-actions="false"
        :headers="headers"
        :selectable="false"
        sortable
        @sort="sort"
      >
        <template #name="{ item }">
          <div v-if="item.queue">
            {{ item.queue.name }}
          </div>
        </template>

        <template #type="{ item }">
          {{ $t(QueueTypeProperties[item.type].locale) }}
        </template>

        <template #count="{ item }">
          {{ item.countMembers }}
        </template>

        <template #waiting="{ item }">
          {{ item.waitingMembers }}
        </template>

        <template #strategy="{ item }">
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
      />
    </div>
  </section>
</template>

<script>
import openedObjectTableTabMixin from "../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin";
import QueueTypeProperties from "../../../../queues/lookups/QueueTypeProperties.lookup";

export default {
	name: "OpenedAgentQueues",
	mixins: [openedObjectTableTabMixin],
	data: () => ({
		subNamespace: "queues",
		QueueTypeProperties,
	}),
};
</script>

<style lang="scss" scoped>
</style>
