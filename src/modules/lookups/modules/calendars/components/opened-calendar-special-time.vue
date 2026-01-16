<template>
  <section class="opened-calendar-special-time table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.lookups.calendars.specialTime') }}
      </h3>
    </header>

    <div class="table-section__table-wrapper">
      <div class="table-wrapper__visible-scroll-wrapper">
        <wt-table
          :data="dataList"
          :grid-actions="!disableUserInput"
          :headers="headers"
          :selectable="false"
        >
          <template #name="{ item, index }">
            <span v-if="isDayStart(index)">
              {{ weekDaysList[item.day] }}
            </span>
          </template>
          <template #start="{ item, index }">
            <wt-timepicker
              :disabled="disableUserInput"
              :value="minToSec(item.start)"
              format="hh:mm"
              no-label
              @input="setItemProp({ prop: 'start', index, value: secToMin($event) })"
            />
          </template>
          <template #end="{ item, index }">
            <wt-timepicker
              :disabled="disableUserInput"
              :value="minToSec(item.end)"
              format="hh:mm"
              no-label
              @input="setItemProp({ prop: 'end', index, value: secToMin($event) })"
            />
          </template>
          <template #state="{ item, index }">
            <wt-switcher
              :disabled="disableUserInput"
              :model-value="!item.disabled"
              @update:model-value="setItemProp({ prop: 'disabled', index, value: !$event })"
            />
          </template>
          <template #actions="{ item, index }">
            <wt-icon-action
              v-if="isDayStart(index)"
              action="add"
              @click="addRange(item.day)"
            />
            <wt-icon-action
              v-else
              action="delete"
              @click="removeRange(index)"
            />
          </template>
        </wt-table>
      </div>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { useWeekDaysData } from '../composables/useWeekDaysData.js';

const namespace = 'lookups/calendars';

export default {
  name: 'OpenedCalendarSpecialTime',
  mixins: [openedTabComponentMixin],
  setup() {
    const dataName = 'specials';
    const { dataList, headers, weekDaysList, setItemProp, addRange, removeRange, isDayStart, minToSec, secToMin } = useWeekDaysData(namespace, dataName);
    return { dataList, headers, weekDaysList, setItemProp, addRange, removeRange, isDayStart, minToSec, secToMin };
  },

  methods: {
    ...mapActions(namespace, {
      initializeSpecials: 'INITIALIZE_SPECIALS',
    }),
    initSpecials() {
      if (!this.dataList.length) this.initializeSpecials();
    }
  },
  watch: {
    dataList: {
      handler() {
        this.initSpecials();
      },
      deep: true
    }
  },
  mounted() {
    this.initSpecials();
  }
};
</script>

<style
  lang="scss"
  scoped
></style>
