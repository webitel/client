<template>
  <wt-popup min-width="480" overflow @close="close">
    <template slot="title">
      {{ $tc('objects.lookups.calendars.holidays', 1) }}
    </template>
    <template slot="main">
      <form class="popup-input-form">
        <wt-input
          v-model="itemInstance.name"
          :v="$v.itemInstance.name"
          :label="$t('objects.name')"
          required
        ></wt-input>
        <wt-datepicker
          v-model="itemInstance.date"
          :label="$t('objects.lookups.calendars.date')"
        ></wt-datepicker>
        <wt-switcher
          v-model="itemInstance.repeat"
          :label="$t('objects.lookups.calendars.repeat')"
        ></wt-switcher>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        :disabled="computeDisabled"
        @click="save"
      >{{ $t('objects.save') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapActions, mapState } from 'vuex';
import nestedObjectMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import getNamespacedState from '../../../store/helpers/getNamespacedState';

export default {
  name: 'opened-calendar-holiday-popup',
  mixins: [nestedObjectMixin],
  props: {
    editedIndex: {
      type: [Number, Object], // "null" object
    },
  },
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
          holiday: this.itemInstance,
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
  grid-gap: var(--component-spacing);
}
</style>
