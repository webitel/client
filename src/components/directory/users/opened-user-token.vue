<template>
  <section>
    <token-popup
        v-if="isPopup"
        @close="closeTokenPopup"
        @token-created="openTokenCreatedPopup"
    ></token-popup>

    <token-created-popup
        v-if="isTokenGenerated"
        @close="closeTokenCreatedPopup"
    ></token-created-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.directory.users.token', 2) }}</h3>

      <div class="content-header__actions-wrap">
        <wt-icon-btn
            class="icon-action"
            :class="{'hidden': anySelected}"
            icon="bucket"
            :tooltip="$t('iconHints.deleteSelected')"
            @click="deleteSelected"
        ></wt-icon-btn>
        <wt-table-actions
            :icons="['refresh']"
            @input="tableActionsHandler"
        ></wt-table-actions>
        <wt-icon-btn
            class="icon-action"
            icon="plus"
            :tooltip="$t('iconHints.add')"
            @click="create"
        ></wt-icon-btn>
      </div>
    </header>

    <wt-loader v-show="!isLoaded"></wt-loader>
    <div class="table-wrapper" v-show="isLoaded">
      <wt-table
          :headers="headers"
          :data="dataList"
      >
        <template slot="usage" slot-scope="{ item }">
          {{ item.usage }}
        </template>
        <template slot="createdBy" slot-scope="{ item }">
          <div v-if="item.createdBy">
            {{ item.createdBy.name }}
          </div>
        </template>
        <template slot="createdAt" slot-scope="{ item }">
          {{ prettifyDate(item.createdAt) }}
        </template>
        <template slot="actions" slot-scope="{ item, index }">
          <wt-icon-btn
              icon="bucket"
              @click="remove(index)"
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
import TokenPopup from './opened-user-token-popup.vue';
import TokenCreatedPopup from './opened-user-token-created-popup.vue';
import openedTabComponentMixin from '../../../mixins/openedTabComponentMixin';
import tableComponentMixin from '../../../mixins/tableComponentMixin';
import tableActionsHandlerMixin from '../../../mixins/baseTableMixin/tableActionsMixin';

export default {
  name: 'opened-user-tokens',
  mixins: [openedTabComponentMixin, tableComponentMixin, tableActionsHandlerMixin],
  components: { TokenPopup, TokenCreatedPopup },

  data() {
    return {
      isPopup: false,
      isTokenGenerated: false,
      headers: [
        { value: 'usage', text: this.$t('objects.directory.users.usage') },
        { value: 'createdAt', text: this.$t('objects.directory.users.createdAt') },
        { value: 'createdBy', text: this.$t('objects.directory.users.createdBy') },
      ],
    };
  },

  watch: {
    parentId(value) {
      this.setParentId(value);
    },
  },

  computed: {
    ...mapState('directory/users', {
      parentId: (state) => state.itemId,
    }),

    ...mapState('directory/users/tokens', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      size: (state) => state.size,
      search: (state) => state.search,
      isNext: (state) => state.isNextPage,
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
          this.isPopup = true;
        } catch (err) {
          throw err;
        }
      } else {
        eventBus.$emit('notification', { type: 'error', text: 'Check your validations!' });
      }
    },

    closeTokenPopup() {
      this.isPopup = false;
      this.resetItemState();
    },

    openTokenCreatedPopup() {
      this.isPopup = false;
      this.isTokenGenerated = true;
    },

    closeTokenCreatedPopup() {
      this.isTokenGenerated = false;
      this.resetItemState();
    },

    prettifyDate(value) {
      return new Date(+value).toLocaleString();
    },

    ...mapActions('directory/users', {
      addParentItem: 'ADD_ITEM',
    }),

    ...mapActions('directory/users/tokens', {
      setParentId: 'SET_PARENT_ITEM_ID',
      loadDataList: 'LOAD_DATA_LIST',
      setSize: 'SET_SIZE',
      setSearch: 'SET_SEARCH',
      nextPage: 'NEXT_PAGE',
      prevPage: 'PREV_PAGE',
      removeItem: 'REMOVE_ITEM',
      resetItemState: 'RESET_ITEM_STATE',
    }),
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/css/objects/table-page';
</style>
