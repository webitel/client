<template>
  <section>
    <holiday-popup
      v-if="popupTriggerIf"
      @close="closePopup"
    ></holiday-popup>

    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.lookups.calendars.holidays') }}</h3>
      <i
        v-if="!disableUserInput"
        class="icon-action icon-icon_plus"
        :title="$t('iconHints.add')"
        @click="popupTriggerIf = true"
      ></i>
    </header>

    <vuetable
      :api-mode="false"
      :fields="fields"
      :data="dataList"
    >

      <template slot="date" slot-scope="props">
        <span>{{ new Date(+dataList[props.rowIndex].date).toLocaleDateString() }}</span>
      </template>

      <template slot="repeat" slot-scope="props">
        <switcher
          :value="dataList[props.rowIndex].repeat"
          :disabled="disableUserInput"
          @input="toggleItemProp(props.rowIndex)"
        ></switcher>
      </template>

      <template slot="actions" slot-scope="props">
        <i class="vuetable-action icon-icon_edit"
           :title="$t('iconHints.edit')"
           @click="edit(props.rowIndex)"
        ></i>
        <i class="vuetable-action icon-icon_delete"
           :title="$t('iconHints.delete')"
           @click="remove(props.rowIndex)"
        ></i>
      </template>
    </vuetable>
  </section>
</template>

<script>
import tableComponentMixin from '@/mixins/objectPagesMixins/objectTableMixin/tableComponentMixin';
import openedTabComponentMixin from '@/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { _actionsTableField_2 } from '@/utils/tableFieldPresets';
import { mapActions, mapState } from 'vuex';
import holidayPopup from './opened-calendar-holiday-popup';

export default {
  name: 'opened-calendar-holidays',
  mixins: [tableComponentMixin, openedTabComponentMixin],
  components: { holidayPopup },
  computed: {
    ...mapState('lookups/calendars/holidays', {
      dataList: (state) => state.dataList,
    }),
    fields() {
      let fields = [
        { name: 'name', title: this.$t('objects.name') },
        { name: 'date', title: this.$t('objects.lookups.calendars.date') },
        { name: 'repeat', title: this.$t('objects.lookups.calendars.repeat') },
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

    ...mapActions('lookups/calendars', {
      toggleItemProp: 'TOGGLE_EXCEPT_ITEM_PROPERTY',
    }),

    ...mapActions('lookups/calendars/holidays', {
      setId: 'SET_ITEM_ID',
      loadDataList: 'LOAD_DATA_LIST',
      removeItem: 'REMOVE_ITEM',
    }),
  },
};
</script>

<style scoped>

</style>
