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
        :search="loadTimezones"
        :disabled="disableUserInput"
        :internal-search="false"
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
        @input="setItemProp({ prop: 'startAt', value: $event })"
      ></wt-datepicker>
      <wt-datepicker
        v-show="itemInstance.expires"
        :value="itemInstance.endAt"
        :label="$t('objects.lookups.calendars.end')"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'endAt', value: $event })"
      ></wt-datepicker>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import { getCalendarTimezones } from '../api/calendars';

export default {
  name: 'opened-calendar-general',
  mixins: [openedTabComponentMixin],
  methods: {
    async loadTimezones(search) {
      const response = await getCalendarTimezones({ search });
      return response.map((item) => ({ name: item.name, id: item.id }));
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
