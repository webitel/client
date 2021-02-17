<template>
  <section>
    <bucket-popup
        v-if="popupTriggerIf"
        @close="closePopup"
    ></bucket-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.buckets.buckets', 2) }}</h3>
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
            v-if="!disableUserInput"
            class="icon-action"
            icon="plus"
            @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <wt-table
          :headers="headers"
          :data="dataList"
          :selectable="false"
          :grid-actions="!disableUserInput"
      >
        <template slot="name" slot-scope="{ item }">
          <div>{{ item.bucket.name }}</div>
        </template>

        <template slot="capacity" slot-scope="{ item }">
          <div>{{ item.ratio }}</div>
        </template>

        <template slot="actions" slot-scope="{ item, index }">
          <wt-icon-btn
              class="table-action"
              icon="edit"
              @click="edit(item)"
          ></wt-icon-btn>
          <wt-icon-btn
              class="table-action"
              icon="bucket"
              @click="removeItem(index)"
          ></wt-icon-btn>
        </template>
      </wt-table>
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
import { mapActions, mapState } from 'vuex';
import eventBus from '@webitel/ui-sdk/src/scripts/eventBus';
import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import tableComponentMixin from '@/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import bucketPopup from './opened-queue-buckets-popup.vue';
import tableActionsHandlerMixin from '../../../../../mixins/baseMixins/baseTableMixin/tableActionsMixin';

export default {
  name: 'opened-queue-outbound-ivr-buckets',
  mixins: [tableComponentMixin, openedTabComponentMixin, tableActionsHandlerMixin],
  components: { bucketPopup },

  data() {
    return {
      headers: [
        { value: 'name', text: this.$tc('objects.ccenter.buckets.buckets', 2) },
        { value: 'ratio', text: this.$t('objects.ccenter.queues.bucketRatio') },
      ],
    };
  },

  watch: {
    parentId(value) {
      this.setParentId(value);
    },
  },

  computed: {
    ...mapState('ccenter/queues', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/queues/buckets', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      isNext: (state) => state.isNextPage,
      search: (state) => state.search,
    }),
  },

  methods: {
    async create() {
      const invalid = this.checkValidations();
      if (!invalid) {
        try {
          if (!this.parentId) {
            await this.addParentItem();
            const routeName = this.$route.name.replace('-new', '-edit');
            await this.$router.replace({ name: routeName, params: { id: this.parentId } });
          }
        this.popupTriggerIf = true;
        } catch (err) {
          throw err;
        }
      } else {
        eventBus.$emit('notification', { type: 'error', text: 'Check your validations!' });
      }
    },

    edit(item) {
      this.setId(item.id);
      this.popupTriggerIf = true;
    },

    closePopup() {
      this.popupTriggerIf = false;
      this.resetItemState();
    },

    ...mapActions('ccenter/queues', {
      addParentItem: 'ADD_ITEM',
    }),

    ...mapActions('ccenter/queues/buckets', {
      setParentId: 'SET_PARENT_ITEM_ID',
      setId: 'SET_ITEM_ID',
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      removeItem: 'DELETE_ITEM',
      resetItemState: 'RESET_ITEM_STATE',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../../../../assets/css/objects/table-page';
</style>
