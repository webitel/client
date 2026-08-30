<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.integrations.triggers.logs.logs') }}
      </h3>
    </header>

    <wt-loader v-show="!isLoaded" />
    <table-empty
      :data-list="dataList"
      :is-loading="!isLoaded"
    />
    <div
      v-show="isLoaded && dataList.length"
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
        <template #startedAt="{ item }">
          {{ formatDate(item.startedAt) }}
        </template>
        <template #duration="{ item }">
          {{ calcDuration(item) }}
        </template>
        <template #state="{ item }">
          {{ $t(`objects.integrations.triggers.logs.resultName.${item.state}`) }}
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
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import { formatDate } from '@webitel/ui-sdk/utils';

import TableEmpty from '../../../../../../../app/components/utils/table-empty.vue';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import convertDurationWithMilliseconds from '../scripts/convertDurationWithMilliseconds';

export default {
	name: 'OpenedTriggerLogs',
	components: {
		TableEmpty,
	},
	mixins: [
		openedObjectTableTabMixin,
	],
	data: () => ({
		subNamespace: 'log',
	}),
	computed: {
		filtersNamespace() {
			return `${this.namespace}/${this.subNamespace}/filters`;
		},
	},
	watch: {
		'$route.query': {
			async handler() {
				await this.loadList();
			},
		},
	},
	methods: {
		formatDate(value) {
			if (!value) return '';
			return formatDate(+value, FormatDateMode.DATETIME);
		},

		calcDuration(item) {
			return convertDurationWithMilliseconds(item.stoppedAt - item.startedAt);
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
