<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.ccenter.queues.queues', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        />
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <div
      v-show="isLoaded"
      class="table-section__table-wrapper"
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
          <wt-item-link
            v-if="item.queue"
            :link="editLink(item)"
          >
            {{ item.queue.name }}
          </wt-item-link>
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
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum.js';
import QueueTypeProperties from '../../../../queues/lookups/QueueTypeProperties.lookup';

export default {
	name: 'OpenedAgentQueues',
	mixins: [
		openedObjectTableTabMixin,
	],
	data: () => ({
		subNamespace: 'queues',
		QueueTypeProperties,
	}),
	methods: {
		editLink(item) {
			return {
				name: `${RouteNames.QUEUES}-card`,
				params: {
					id: item.queue.id,
					type: QueueTypeProperties[item.type].subpath,
				},
			};
		},
	},
};
</script>
