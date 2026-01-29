<template>
  <section class="table-section">
    <header class="table-title">
      <h3 class="table-title__title">
        {{ $t('objects.routing.chatGateways.templates.templates', 1) }}
      </h3>

      <div class="table-title__actions-wrap">
        <wt-icon-btn
          v-if="!disableUserInput"
          class="icon-action"
          icon="plus"
          @click="addTime"
        />
      </div>
    </header>

    <div class="table-section__table-wrapper">
      <wt-table
        :data="itemInstance.times"
        :grid-actions="!disableUserInput"
        :headers="headers"
        :selectable="false"
      >
        <template #start="{ item, index }">
          <wt-timepicker
            :disabled="disableUserInput"
            :value="minToSec(item.start)"
            :v="v.itemInstance.times.$each.$response.$data[index].start"
            format="hh:mm"
            no-label
            @input="setStartTime({ index, value: secToMin($event) })"
          />
        </template>
        <template #end="{ item, index }">
          <wt-timepicker
            :disabled="disableUserInput"
            :value="minToSec(item.end)"
            format="hh:mm"
            no-label
            :v="v.itemInstance.times.$each.$response.$data[index].end"
            @input="setEndTime({ index, value: secToMin($event) })"
          />
        </template>
        <template #duration="{ item, index }">
          <wt-timepicker
            :value="minToSec(item.duration)"
            format="hh:mm"
            type="number"
            no-label
            @input="setDuration({ index, value: secToMin($event) })"
          />
        </template>
        <template #actions="{ item, index }">
          <wt-icon-action
            action="delete"
            @click="removeTime(index)"
          />
        </template>
      </wt-table>
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedShiftTemplateTimes',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  computed: {
    headers() {
      return [
        {
          value: 'start',
          text: this.$t('objects.lookups.calendars.start'),
        },
        {
          value: 'end',
          text: this.$t('objects.lookups.calendars.end'),
        },
        {
          value: 'duration',
          text: this.$t('objects.lookups.shiftTemplates.duration'),
        },
      ];
    },
  },

  methods: {
    ...mapActions({
      addTime(dispatch, payload) {
        dispatch(`${this.namespace}/ADD_TIME`, payload);
      },
      setTime(dispatch, payload) {
        dispatch(`${this.namespace}/SET_TIME`, payload);
      },
      removeTime(dispatch, payload) {
        dispatch(`${this.namespace}/REMOVE_TIME`, payload);
      },
    }),

    minToSec(min) {
      return min * 60;
    },
    secToMin(sec) {
      return sec / 60;
    },
    setStartTime({ index, value }) {
      this.setTime({ prop: 'start', index, value });
      this.setTime({ prop: 'duration', index, value: this.itemInstance.times[index].end - this.itemInstance.times[index].start });
    },
    setEndTime({ index, value }) {
      this.setTime({ prop: 'end', index, value });
      this.setTime({ prop: 'duration', index, value: this.itemInstance.times[index].end - this.itemInstance.times[index].start });
    },
    setDuration({ index, value }) {
      this.setTime({ prop: 'duration', index, value });
      this.setTime({ prop: 'end', index, value: this.itemInstance.times[index].start + this.itemInstance.times[index].duration });
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
