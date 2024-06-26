<template>
  <section class="opened-calendar-work-week">
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.lookups.calendars.workWeek') }}
      </h3>
    </header>

    <div class="table-wrapper">
      <div class="table-wrapper__visible-scroll-wrapper">
        <wt-table
          :data="dataList"
          :grid-actions="!disableUserInput"
          :headers="headers"
          :selectable="false"
        >
          <template #name="{ item, index }">
            <span v-if="isDayStart(index)">
              {{ weekdaysList[item.day] }}
            </span>
          </template>
          <template #start="{ item, index }">
            <wt-timepicker
              :disabled="disableUserInput"
              :value="minToSec(item.start)"
              format="hh:mm"
              @input="setItemProp({prop: 'start', index, value: secToMin($event)})"
            />
          </template>
          <template #end="{ item, index }">
            <wt-timepicker
              :disabled="disableUserInput"
              :value="minToSec(item.end)"
              format="hh:mm"
              @input="setItemProp({prop: 'end', index, value: secToMin($event)})"
            />
          </template>
          <template #state="{ item, index }">
            <wt-switcher
              :disabled="disableUserInput"
              :value="!item.disabled"
              @change="setItemProp({prop: 'disabled', index, value: !$event})"
            />
          </template>
          <template #actions="{ item, index }">
            <wt-icon-action
              v-if="isDayStart(index)"
              action="add"
              @click="addWorkRange(item.day)"
            />
            <wt-icon-action
              v-else
              action="delete"
              @click="remove(index)"
            />
          </template>
        </wt-table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedCalendarWorkWeek',
  mixins: [openedTabComponentMixin],
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
        {
          value: 'name',
          text: this.$t('objects.name'),
        },
        {
          value: 'start',
          text: this.$t('objects.lookups.calendars.start'),
        },
        {
          value: 'end',
          text: this.$t('objects.lookups.calendars.end'),
        },
        {
          value: 'state',
          text: this.$t('reusable.state'),
        },
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
      return (
        this.dataList[index].day !== // this day index is not equal to
        this.dataList[index - 1].day
      ); // prev day index
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
.wt-timepicker :deep(.wt-label) {
  display: none;
}
</style>
