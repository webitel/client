<template>
  <section class="main-section__wrapper">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.directory.license.allLicenses') }}
      </h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @input="setSearch"
          @search="loadList"
          @enter="loadList"
        ></wt-search-bar>
        <wt-table-actions
          :icons="['refresh']"
          @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
          v-if="hasCreateAccess"
          class="icon-action"
          icon="plus"
          :tooltip="$t('iconHints.add')"
          @click="isLicensePopup = true"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <wt-table
        :headers="headers"
        :data="dataList"
        :selectable="false"
        :grid-actions="false"
        sortable
        @sort="sort"
      ></wt-table>
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
import tableComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';

export default {
  name: 'licenses-by-user',
  mixins: [tableComponentMixin],
  data: () => ({
    namespace: 'directory/license/users',
  }),
  methods: {
  },
};
</script>

<style lang="scss" scoped>
</style>
