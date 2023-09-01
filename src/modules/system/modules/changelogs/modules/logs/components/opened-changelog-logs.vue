<template>
  <section class="content-wrapper">
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.system.changelogs.logs.logs', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <filter-search
          :namespace="filtersNamespace"
        ></filter-search>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
<!--    <wt-dummy-->
<!--      v-if="dummy && isLoaded"-->
<!--      :src="dummy.src"-->
<!--      :text="dummy.text && $t(dummy.text)"-->
<!--      class="dummy-wrapper"-->
<!--    ></wt-dummy>-->
    <div
      v-show="isLoaded"
      class="table-wrapper"
    >
      <wt-table
        :headers="headers"
        :data="dataList"
        :grid-actions="false"
        :selectable="false"
        sortable
        @sort="sort"
      >
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
import FilterSearch from '@webitel/ui-sdk/src/modules/QueryFilters/components/filter-search.vue';
import openedObjectTableTabMixin
  from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';
import { useDummy } from '../../../../../../../app/composables/useDummy';

const namespace = 'system/changelogs';
const subNamespace = 'logs';

export default {
  name: 'opened-changelog-logs',
  mixins: [openedObjectTableTabMixin],
  components: { FilterSearch },
  data: () => ({
    namespace,
    subNamespace,
  }),

  /* https://my.webitel.com/browse/WTEL-3697 */
  /* Temporarily disabled functionality due to problems with pagination */

  // setup() {
  //   const { dummy } = useDummy({ namespace: `${namespace}/${subNamespace}`, hiddenText: true });
  //   return { dummy };
  // },
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
};
</script>

<style lang="scss" scoped>
</style>