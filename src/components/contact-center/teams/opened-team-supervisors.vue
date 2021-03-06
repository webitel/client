<template>
  <section>
    <supervisor-popup
        v-if="popupTriggerIf"
        @close="closePopup"
    ></supervisor-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $tc('objects.ccenter.teams.supervisors', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <search
            v-model="search"
            @filterData="loadList"
        ></search>
        <i
            class="icon-icon_delete icon-action"
            :class="{'hidden': anySelected}"
            :title="$t('iconHints.deleteSelected')"
            @click="deleteSelected"
        ></i>
        <i
            class="icon-icon_reload icon-action"
            :title="$t('iconHints.reload')"
            @click="loadList"
        ></i>
        <i
            class="icon-action icon-icon_plus"
            :title="$t('iconHints.add')"
            @click="create"
        ></i>
      </div>
    </header>

    <loader v-show="!isLoaded"></loader>

    <vuetable
        v-show="isLoaded"
        :api-mode="false"
        :fields="fields"
        :data="dataList"
    >
      <template slot="name" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].agent.name }}
        </div>
      </template>

      <template slot="actions" slot-scope="props">
        <i class="vuetable-action icon-icon_edit"
           @click="edit(props.rowIndex)"
        ></i>
        <i class="vuetable-action icon-icon_delete"
           @click="remove(props.rowIndex)"
        ></i>
      </template>
    </vuetable>
    <pagination
        v-show="isLoaded"
        v-model="size"
        @loadDataList="loadList"
        @next="nextPage"
        @prev="prevPage"
        :isNext="isNextPage"
        :isPrev="!!page"
        :page="page"
    ></pagination>
  </section>
</template>

<script>
import eventBus from '@/utils/eventBus';
import tableComponentMixin from '@/mixins/tableComponentMixin';
import openedTabComponentMixin from '@/mixins/openedTabComponentMixin';
import { _checkboxTableField, _actionsTableField_2 } from '@/utils/tableFieldPresets';
import { mapActions, mapState } from 'vuex';
import supervisorPopup from './opened-team-supervisors-popup';

export default {
  name: 'opened-team-supervisors',
  mixins: [openedTabComponentMixin, tableComponentMixin],
  components: { supervisorPopup },
  data() {
    return {
      fields: [
        _checkboxTableField,
        { name: 'name', title: this.$tc('objects.ccenter.teams.supervisors', 2) },
        _actionsTableField_2,
      ],
    };
  },

  watch: {
    parentId(value) {
      this.setParentId(value);
    },
  },

  computed: {
    ...mapState('ccenter/teams', {
      parentId: (state) => state.itemId,
    }),
    ...mapState('ccenter/teams/supervisors', {
      dataList: (state) => state.dataList,
      page: (state) => state.page,
      isNextPage: (state) => state.isNextPage,
    }),

    size: {
      get() {
        return this.$store.state.ccenter.teams.supervisors.size;
      },
      set(value) {
        this.setSize(value);
      },
    },

    search: {
      get() {
        return this.$store.state.ccenter.teams.supervisors.search;
      },
      set(value) {
        this.setSearch(value);
      },
    },
  },

  methods: {
    async create() {
      if (!this.checkValidations()) {
        if (!this.id) await this.addParentItem();
        this.popupTriggerIf = true;
      } else {
        eventBus.$emit('notification', { type: 'error', text: 'Check your validations!' });
      }
    },

    edit(rowIndex) {
      this.setId(this.dataList[rowIndex].id);
      this.popupTriggerIf = true;
    },

    closePopup() {
      this.popupTriggerIf = false;
      this.resetItemState();
    },

    ...mapActions('ccenter/teams', {
      addParentItem: 'ADD_ITEM',
    }),

    ...mapActions('ccenter/teams/supervisors', {
      setParentId: 'SET_PARENT_ITEM_ID',
      setId: 'SET_ITEM_ID',
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
.inline-dropdown {
  width: 226px;
}
</style>
