<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.timezone')"
        :search-method="loadTimezones"
        :v="v.itemInstance.timezone"
        :value="itemInstance.timezone"
        required
        @input="setItemProp({ prop: 'timezone', value: $event })"
      ></wt-select>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.fulltime')"
        :value="itemInstance.expires"
        @change="setItemProp({ prop: 'expires', value: $event })"
      ></wt-switcher>
      <wt-datepicker
        v-show="itemInstance.expires"
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.start')"
        :value="itemInstance.startAt"
        @input="setItemProp({ prop: 'startAt', value: $event })"
      ></wt-datepicker>
      <wt-datepicker
        v-show="itemInstance.expires"
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.end')"
        :value="itemInstance.endAt"
        @input="setItemProp({ prop: 'endAt', value: $event })"
      ></wt-datepicker>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CalendarsAPI from '../api/calendars';

export default {
  name: 'opened-calendar-general',
  mixins: [openedTabComponentMixin],
  methods: {
    loadTimezones(params) {
      return CalendarsAPI.getTimezonesLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
