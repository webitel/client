<template>
  <section class="opened-calendar-work-week">
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.lookups.calendars.workWeek') }}</h3>
    </header>

    <div class="table-wrapper">
      <div class="table-wrapper__scroll-wrapper">
        <wt-table
          :headers="headers"
          :data="dataList"
          :grid-actions="!disableUserInput"
          :selectable="false"
        >
          <template slot="name" slot-scope="{ item, index }">
            <span v-if="isDayStart(index)">
              {{ weekdaysList[item.day] }}
            </span>
          </template>
          <template slot="start" slot-scope="{ item, index }">
            <wt-timepicker
              :value="minToSec(item.start)"
              format="hh:mm"
              :disabled="disableUserInput"
              @input="setItemProp({prop: 'start', index, value: secToMin($event)})"
            ></wt-timepicker>
          </template>
          <template slot="end" slot-scope="{ item, index }">
            <wt-timepicker
              :value="minToSec(item.end)"
              format="hh:mm"
              :disabled="disableUserInput"
              @input="setItemProp({prop: 'end', index, value: secToMin($event)})"
            ></wt-timepicker>
          </template>
          <template slot="state" slot-scope="{ item, index }">
            <wt-switcher
              :value="!item.disabled"
              :disabled="disableUserInput"
              @change="setItemProp({prop: 'disabled', index, value: !$event})"
            ></wt-switcher>
          </template>
          <template slot="actions" slot-scope="{ item, index }">
            <wt-icon-btn
              v-if="isDayStart(index)"
              class="table-action"
              icon="plus"
              :tooltip="$t('iconHints.add')"
              tooltip-position="left"
              @click="addWorkRange(item.day)"
            ></wt-icon-btn>
            <delete-action
              v-else
              @click="remove(index)"
            ></delete-action>
          </template>
        </wt-table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import DeleteAction from '../../../../../app/components/utils/table-cell/default-table-actions/delete-action.vue';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-calendar-work-week',
  mixins: [openedTabComponentMixin],
  components: { DeleteAction },
  computed: {
    ...mapState('lookups/calendars', {
      dataList: (state) => state.itemInstance.accepts,
    }),
    weekdaysList() {
      return [
        this.$t('objects.lookups.calendars.mon'),
        this.$t('objects.lookups.calendars.tue'),
        this.$t('objects.lookups.calendars.wed'),
        this.$t('objects.lookups.calendars.thu'),
        this.$t('objects.lookups.calendars.fri'),
        this.$t('objects.lookups.calendars.sat'),
        this.$t('objects.lookups.calendars.sun'),
      ];
    },
    headers() {
      return [
        { value: 'name', text: this.$t('objects.name') },
        { value: 'start', text: this.$t('objects.lookups.calendars.start') },
        { value: 'end', text: this.$t('objects.lookups.calendars.end') },
        { value: 'state', text: this.$t('reusable.state') },
      ];
    },
  },

  methods: {
    ...mapActions('lookups/calendars', {
      setItemProp: 'SET_ACCEPT_ITEM_PROPERTY',
      addWorkRange: 'ADD_ACCEPT_ITEM',
      remove: 'REMOVE_ACCEPT_ITEM',
    }),
    isDayStart(index) {
      if (index === 0) return true;
      return this.dataList[index].day // this day index is not equal to
        !== (this.dataList[index - 1]).day; // prev day index
    },
    minToSec(min) {
      return min * 60;
    },
    secToMin(sec) {
      return sec / 60;
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-timepicker ::v-deep .wt-label {
  display: none;
}
</style>
