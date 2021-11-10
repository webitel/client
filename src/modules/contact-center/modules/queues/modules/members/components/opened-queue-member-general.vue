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
      <wt-input
        :value="itemInstance.priority"
        :label="$t('objects.ccenter.queues.priority')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'priority', value: +$event })"
      ></wt-input>
      <wt-datetimepicker
        :value="itemInstance.expireAt"
        :label="$t('objects.ccenter.queues.expire')"
        :disabled="disableUserInput"
        @change="setItemProp({ prop: 'expireAt', value: $event })"
      ></wt-datetimepicker>
      <wt-select
        :value="itemInstance.timezone"
        :label="$t('objects.ccenter.queues.timezone')"
        :search-method="loadDropdownOptionsTimezoneList"
        :clearable="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'timezone', value: $event })"
      ></wt-select>
      <wt-select
        :value="itemInstance.bucket"
        :label="$tc('objects.lookups.buckets.buckets', 1)"
        :search-method="loadDropdownOptionsBucketsList"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'bucket', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import CalendarsAPI from '../../../../../../lookups/modules/calendars/api/calendars';
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-queue-member-general',
  mixins: [openedTabComponentMixin],
  computed: {
    disableUserInput() {
      return !this.hasEditAccess;
    },
  },

  methods: {
    loadDropdownOptionsBucketsList(params) {
      return BucketsAPI.getLookup(params);
    },
    loadDropdownOptionsTimezoneList(params) {
      return CalendarsAPI.getTimezonesLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
