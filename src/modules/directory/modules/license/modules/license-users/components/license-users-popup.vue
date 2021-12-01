<template>
  <wt-popup>
    <template slot="title">
      hi
    </template>
    <template slot="main">
      <wt-search-bar
        :value="search"
        debounce
        @enter="loadList"
        @input="setSearch"
        @search="loadList"
      ></wt-search-bar>

      <wt-loader v-show="!isLoaded"></wt-loader>
      <div v-show="isLoaded" class="table-wrapper">
        <wt-table
          :headers="headers"
          :data="dataList"
          :selectable="false"
          :grid-actions="false"
          sortable
          @sort="sort"
        >
          <template slot="name" slot-scope="{ item }">
            {{ item }}
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
    </template>
  </wt-popup>
</template>

<script>
import openedObjectTableTabMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'license-users-popup',
  mixins: [openedObjectTableTabMixin],
  data: () => ({
    subNamespace: 'licenseUsers',
  }),
};
</script>

<style lang="scss" scoped>

</style>