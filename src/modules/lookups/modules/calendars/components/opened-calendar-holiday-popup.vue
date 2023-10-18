<template>
  <wt-popup
    min-width="480"
    overflow
    @close="close"
  >
    <template #title>
      {{ $tc('objects.lookups.calendars.holidays', 1) }}
    </template>
    <template #main>
      <div class="popup-input-form">
        <wt-input
          v-model="itemInstance.name"
          :label="$t('objects.name')"
          :v="v$.itemInstance.name"
          required
        />
        <wt-datepicker
          v-model="itemInstance.date"
          :label="$t('objects.lookups.calendars.date')"
        />
        <wt-switcher
          v-model="itemInstance.repeat"
          :label="$t('objects.lookups.calendars.repeat')"
        />
      </div>
    </template>
    <template #actions>
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >
        {{ $t('objects.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import nestedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'OpenedCalendarHolidayPopup',
  mixins: [nestedObjectMixin],
  props: {
    editedIndex: {
      type: [Number, Object], // "null" object
    },
  },
  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'lookups/calendars',
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
    },
  },
  created() {
    this.initEditedValue();
  },
  computed: {
    ...mapState({
      holidayList(state) {
        return getNamespacedState(state, this.namespace).itemInstance.excepts;
      },
    }),
    // override mixin map state
    itemInstance: {
      get() { return this.itemInstanceValue; },
      set(value) { this.itemInstanceValue = value; },
    },
    computeDisabled() {
      return this.checkValidations();
    },
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
      if (Number.isInteger(this.editedIndex)) {
        this.itemInstance = { ...this.holidayList[this.editedIndex] };
      }
    },
    save() {
      if (Number.isInteger(this.editedIndex)) {
        this.updateHoliday({
          index: this.editedIndex,
          item: this.itemInstance,
        });
      } else {
        this.addHoliday(this.itemInstance);
      }
      this.close();
    },
    loadItem() {},
    resetState() {},
  },
};
</script>

<style lang="scss" scoped>
.popup-input-form {
  display: grid;
  grid-gap: var(--spacing-sm);
}
</style>
