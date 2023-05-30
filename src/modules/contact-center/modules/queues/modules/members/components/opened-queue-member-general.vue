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
      <wt-datepicker
        :value="itemInstance.expireAt"
        :label="$t('objects.ccenter.queues.expire')"
        :disabled="disableUserInput"
        mode="datetime"
        @input="setItemProp({ prop: 'expireAt', value: $event })"
      ></wt-datepicker>
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
      <wt-select
        :value="itemInstance.agent"
        :label="$tc('objects.ccenter.agents.agents', 1)"
        :search-method="loadDropdownOptionsAgentsList"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'agent', value: $event })"
      ></wt-select>
    </form>
  </section>
</template>

<script>
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import CalendarsAPI from '../../../../../../lookups/modules/calendars/api/calendars';
import AgentsAPI from '../../../../agents/api/agents';
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
    loadDropdownOptionsAgentsList(params) {
      return AgentsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
