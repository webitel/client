<template>
  <section>
    <res-popup
      v-if="isResPopup"
      @close="closePopup"
    ></res-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.res.res', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <wt-search-bar
          :value="search"
          debounce
          @enter="loadList"
          @input="setSearch"
          @search="loadList"
        ></wt-search-bar>
        <wt-icon-btn
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
          class="icon-action"
          icon="plus"
          @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div v-show="isLoaded" class="table-wrapper">
      <wt-table
        :headers="headers"
        :data="dataList"
      >
        <template slot="name" slot-scope="{ item }">
          <div v-if="item.resource">
            {{ item.resource.name }}
          </div>
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
import { mapState } from 'vuex';
import ResPopup from './opened-resource-group-resource-popup.vue';
import openedObjectTableTabMixin from '../../../mixins/objectPagesMixins/openedObjectTableTabMixin/openedObjectTableTabMixin';

export default {
  name: 'opened-resource-group-resources',
  mixins: [openedObjectTableTabMixin],
  components: { ResPopup },
  data: () => ({
    subNamespace: 'res',
    isResPopup: false,
  }),

  computed: {
    ...mapState('ccenter/resGroups', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/resGroups/res', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
    }),
    headers() {
      return [
        { value: 'name', text: this.$tc('objects.ccenter.res.numbers', 2) },
      ];
    },
  },

  methods: {
    openPopup() {
      this.isResPopup = true;
    },

    closePopup() {
      this.isResPopup = false;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
