<template>
  <wt-popup :shown="shown" size="sm" overflow @close="close">
    <template #title>
      {{ $t('objects.lookups.calendars.holidays', 1) }}
    </template>
    <template #main>
      <div class="popup-input-form">
        <wt-input-text v-model:model-value="itemInstance.name" 
          :label="$t('objects.name')" :v="v$.itemInstance.name" required />
        <wt-datepicker v-model="itemInstance.date" :label="$t('objects.lookups.calendars.date')" />
        <wt-switcher :model-value="itemInstance.working" :label="$t('objects.lookups.calendars.workingTime')"
          @update:model-value="changeWorkingSwitcher" />
        <div v-if="itemInstance.working" class="opened-calendar-holiday-popup__wrapper">
          <wt-timepicker format="hh:mm" :label="$t('objects.lookups.calendars.start')" :v="v$.itemInstance.workStart"
            :value="itemInstance.workStart * 60" @input="updateWorkingTime($event, 'workStart')"></wt-timepicker>
          <wt-timepicker format="hh:mm" :label="$t('objects.lookups.calendars.end')" :v="v$.itemInstance.workStop"
            :value="itemInstance.workStop * 60" @input="updateWorkingTime($event, 'workStop')"></wt-timepicker>
        </div>
        <!-- temporary usage v-model:model-value instead of v-model because of vue 2 compat -->
        <wt-switcher v-model:model-value="itemInstance.repeat" :label="$t('objects.lookups.calendars.repeat')" />
      </div>
    </template>
    <template #actions>
      <wt-button :disabled="computeDisabled" @click="save">
        {{ $t('objects.save') }}
      </wt-button>
      <wt-button color="secondary" @click="close">
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { maxValue, minValue, numeric, required, requiredIf } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import nestedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'OpenedCalendarHolidayPopup',
  mixins: [nestedObjectMixin],
  setup: () => ({
    // Reasons for use $stopPropagation
    // https://webitel.atlassian.net/browse/WTEL-4559?focusedCommentId=621761
    v$: useVuelidate({ $stopPropagation: true }),
  }),
  data: () => ({
    namespace: 'lookups/calendars',
    shown: false,
    itemInstanceValue: {
      name: '',
      date: Date.now(),
      repeat: true,
    },
  }),
  validations: {
    itemInstance: {
      name: { required },
      date: { required },
      workStart: {
        numeric,
        minValue: minValue(0),
        maxValue: maxValue(1440),
      },
      workStop: {
        numeric,
        required: requiredIf((value, item) => item.workStart),
        minValue: minValue(0),
        maxValue: maxValue(1440),
      },
    },
  },

  computed: {
    ...mapState({
      holidayList(state) {
        return getNamespacedState(state, this.namespace).itemInstance.excepts;
      },
    }),
    // override mixin map state
    itemInstance: {
      get() {
        return this.itemInstanceValue;
      },
      set(value) {
        this.itemInstanceValue = value;
      },
    },
    computeDisabled() {
      return this.checkValidations();
    },
    holidayIndex() {
      return this.$route.params.holidayIndex;
    }
  },
  methods: {
    ...mapActions({
      addHoliday(dispatch, payload) {
        return dispatch(`${this.namespace}/ADD_EXCEPT_ITEM`, payload);
      },
      updateHoliday(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_EXCEPT_ITEM`, payload);
      },
    }),
    initEditedValue() {
      if (this.holidayIndex !== 'new') {
        this.itemInstance = { ...this.holidayList[Number(this.holidayIndex)] };
      }
    },
    resetItemInstance() {
      this.itemInstance = {
        name: '',
        date: Date.now(),
        repeat: true,
      };
    },
    save() {
      if (this.holidayIndex !== 'new') {
        this.updateHoliday({
          index: Number(this.holidayIndex),
          item: this.itemInstance,
        });
      } else {
        this.addHoliday(this.itemInstance);
      }
      this.close();
    },
    changeWorkingSwitcher(event) {
      this.itemInstance.working = event;
      this.itemInstance.workStart = this.itemInstance.working ? 9 * 60 : null;
      this.itemInstance.workStop = this.itemInstance.working ? 20 * 60 : null;
    },
    updateWorkingTime(event, prop) {
      this.itemInstance[prop] = event ? event / 60 : null;
    },
    loadItem() { },
    resetState() { },
  },

  watch: {
    holidayList() {
      this.initEditedValue();
    },
    holidayIndex: {
      handler(value) {
        if (value === 'new') {
          this.resetItemInstance();
          this.shown = true;
        }

        if (value) {
          this.initEditedValue();
          this.shown = true;
        }

        else this.shown = false;
      }, immediate: true,
    }
  },
};
</script>

<style lang="scss" scoped>
.opened-calendar-holiday-popup__wrapper {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: space-between;
}

.popup-input-form {
  display: grid;
  grid-gap: var(--spacing-sm);
}
</style>
