<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.system.changelogs.logs.logs', 2) }}
      </h3>
      <div class="table-title__actions-wrap">
        <wt-icon-action
          action="download"
          @click="exportCSV({ parentId })"
        />
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        />
      </div>
    </header>

    <wt-loader v-show="!isLoaded" />
    <wt-dummy
      v-if="dummy && isLoaded"
      :src="dummy.src"
      :dark-mode="darkMode"
      :text="dummy.text && $t(dummy.text)"
      class="dummy-wrapper"
    ></wt-dummy>
    <div
      v-show="dataList.length && isLoaded"
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
        <template #action="{ item }">
          {{ $t(`objects.system.changelogs.logs.actionType.${item.action}`) }}
        </template>
        <template #date="{ item }">
          {{ formatDate(+item.date, FormatDateMode.DATETIME) }}
        </template>
        <template #object="{ item }">
          <adm-item-link
            v-if="item.object"
            :id="item.configId"
            :route-name="changelogsRouteName"
          >
            {{ item.object.name }}
          </adm-item-link>
        </template>
        <template #record="{ item }">
          <record-link
            :item="item"
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
import { FormatDateMode } from '@webitel/ui-sdk/enums';
import ExportCSVMixin from '@webitel/ui-sdk/src/modules/CSVExport/mixins/exportCSVMixin';
import { formatDate } from '@webitel/ui-sdk/utils';

import { useDummy } from '../../../../../../../app/composables/useDummy';
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import RouteNames from '../../../../../../../app/router/_internals/RouteNames.enum';
import RecordLink from '../../../../../../system/modules/changelogs/modules/logs/components/changelog-logs-record-link.vue';
import LogsAPI from '../api/logs';

const namespace = 'directory/users';
const subNamespace = 'logs';

export default {
	name: 'OpenedUsersLogs',
	components: {
		RecordLink,
	},
	mixins: [
		openedObjectTableTabMixin,
		ExportCSVMixin,
	],

	setup() {
		const { dummy } = useDummy({
			namespace: `${namespace}/${subNamespace}`,
			hiddenText: true,
		});
		return {
			dummy,

			// re-export from imports to template
			FormatDateMode,
			formatDate,
		};
	},
	data: () => ({
		namespace,
		subNamespace,
		changelogsRouteName: RouteNames.CHANGELOGS,
	}),

	computed: {
		getFilters() {
			return this.$store.getters[
				`${namespace}/${subNamespace}/filters/GET_FILTERS`
			];
		},
	},
	watch: {
		'$route.query': {
			async handler() {
				await this.loadList();
			},
		},
	},
	created() {
		this.initCSVExport(this.getDataForCSVExport, {
			filename: `${this.itemInstance.name}-logs-at-${formatDate(new Date(), FormatDateMode.DATETIME)}`,
		});
	},
	methods: {
		async getDataForCSVExport(params) {
			const filters = this.getFilters;
			const { items, next } = await LogsAPI.getList({
				...filters,
				...params,
				parentId: this.parentId,
			});

			const transformedItems = items.map((item) => ({
				...item,
				date: formatDate(+item.date, FormatDateMode.DATETIME),
			}));

			return {
				items: transformedItems,
				next,
			};
		},
	},
};
</script>

<style lang="scss" scoped>
</style>
