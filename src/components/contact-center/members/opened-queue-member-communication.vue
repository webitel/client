<template>
  <section>
    <communication-popup
      v-if="popupTriggerIf"
      @close="closePopup"
    ></communication-popup>

    <header class="content-header">
      <h3 class="content-title"
          :class="{'invalid': v.itemInstance.communications.$error}"
      >{{ $tc('objects.lookups.communications.communications', 2) }}</h3>
      <div class="content-header__actions-wrap">
        <i
          v-if="!disableUserInput"
          class="icon-icon_delete icon-action"
          :class="{'hidden': anySelected}"
          :title="$t('iconHints.deleteSelected')"
          @click="deleteSelected"
        ></i>
        <i
          class="icon-icon_reload icon-action"
          :title="$t('iconHints.reload')"
          @click="loadDataList"
        ></i>
        <i
          v-if="!disableUserInput"
          class="icon-action icon-icon_plus"
          :title="$t('iconHints.add')"
          @click="create"
        ></i>
      </div>
    </header>

    <vuetable
      :api-mode="false"
      :fields="fields"
      :data="dataList"
    >
      <template slot="destination" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].destination }}
        </div>
      </template>

      <template slot="state" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].state }}
        </div>
      </template>

      <template slot="attempts" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].attempts }}
        </div>
      </template>

      <template slot="type" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].type.name }}
        </div>
      </template>

      <template slot="priority" slot-scope="props">
        <div>
          {{ dataList[props.rowIndex].priority }}
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
  </section>
</template>

<script>
import tableComponentMixin from '@/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import { _actionsTableField_2, _checkboxTableField } from '@/utils/tableFieldPresets';
import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { mapActions, mapState } from 'vuex';
import communicationPopup from './opened-queue-member-communication-popup';

export default {
  name: 'opened-queue-member-communication',
  mixins: [tableComponentMixin, openedTabComponentMixin],
  components: { communicationPopup },
  mounted() {
    this.loadDataList();
  },

  computed: {
    ...mapState('ccenter/queues/members/communications', {
      dataList: (state) => state.dataList,
    }),
    disableUserInput() {
      return !this.hasEditAccess;
    },
    fields() {
      let fields = [
        _checkboxTableField,
        { name: 'destination', title: this.$t('objects.name') },
        { name: 'type', title: this.$t('objects.ccenter.queues.type') },
        { name: 'priority', title: this.$t('objects.ccenter.queues.priority') },
      ];
      if (!this.disableUserInput) fields = fields.concat(_actionsTableField_2);
      return fields;
    },
  },

  methods: {
    async create() {
      this.popupTriggerIf = true;
    },

    closePopup() {
      this.setId(null);
      this.popupTriggerIf = false;
    },

    edit(rowIndex) {
      this.setId(rowIndex);
      this.popupTriggerIf = true;
    },

    ...mapActions('ccenter/queues/members/communications', {
      setId: 'SET_ITEM_ID',
      loadDataList: 'LOAD_DATA_LIST',
      removeItem: 'REMOVE_ITEM',
    }),
  },
};
</script>

<style lang="scss" scoped>

</style>
