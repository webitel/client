<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.timezone')"
        :search-method="loadTimezones"
        :v="v.itemInstance.timezone"
        :value="itemInstance.timezone"
        required
        @input="setItemProp({ prop: 'timezone', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
      <wt-switcher
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.fulltime')"
        :model-value="itemInstance.expires"
        @update:model-value="setItemProp({ prop: 'expires', value: $event })"
      />
      <wt-datepicker
        v-show="itemInstance.expires"
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.start')"
        :value="itemInstance.startAt"
        @input="setItemProp({ prop: 'startAt', value: $event })"
      />
      <wt-datepicker
        v-show="itemInstance.expires"
        :disabled="disableUserInput"
        :label="$t('objects.lookups.calendars.end')"
        :value="itemInstance.endAt"
        @input="setItemProp({ prop: 'endAt', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CalendarsAPI from '../api/calendars';

export default {
  name: 'OpenedCalendarGeneral',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },
  methods: {
    loadTimezones(params) {
      return CalendarsAPI.getTimezonesLookup(params);
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
