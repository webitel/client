<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-input
        :value="itemInstance.name"
        :v="v.itemInstance.name"
        :label="$t('objects.name')"
        :disabled="disableUserInput"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :value="itemInstance.timezone"
        :v="v.itemInstance.timezone"
        :label="$t('objects.lookups.calendars.timezone')"
        :search-method="loadTimezones"
        :disabled="disableUserInput"
        :clearable="false"
        required
        @input="setItemProp({ prop: 'timezone', value: $event })"
      ></wt-select>
      <wt-textarea
        :value="itemInstance.description"
        :label="$t('objects.description')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
      <wt-switcher
        :value="itemInstance.expires"
        :label="$t('objects.lookups.calendars.fulltime')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'expires', value: $event })"
      ></wt-switcher>
      <wt-datepicker
        v-show="itemInstance.expires"
        :value="itemInstance.startAt"
        :label="$t('objects.lookups.calendars.start')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'startAt', value: $event })"
      ></wt-datepicker>
      <wt-datepicker
        v-show="itemInstance.expires"
        :value="itemInstance.endAt"
        :label="$t('objects.lookups.calendars.end')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'endAt', value: $event })"
      ></wt-datepicker>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
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
