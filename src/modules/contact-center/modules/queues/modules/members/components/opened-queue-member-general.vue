<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <wt-input :disabled="disableUserInput" :label="$t('objects.name')" :v="v.itemInstance.name"
        :value="itemInstance.name" required @input="setItemProp({ prop: 'name', value: $event })" />
      <wt-input :disabled="disableUserInput" :label="$t('objects.ccenter.queues.priority')"
        :value="itemInstance.priority" type="number" @input="setItemProp({ prop: 'priority', value: +$event })" />
      <wt-datepicker :disabled="disableUserInput" :label="$t('objects.ccenter.queues.expire')"
        :value="itemInstance.expireAt" mode="datetime" @input="setItemProp({ prop: 'expireAt', value: $event })" />
      <wt-select :clearable="false" :disabled="disableUserInput" :label="$t('objects.ccenter.queues.timezone')"
        :search-method="loadDropdownOptionsTimezoneList" :value="itemInstance.timezone"
        @input="setItemProp({ prop: 'timezone', value: $event })" />
      <wt-select :disabled="disableUserInput" :label="$t('objects.lookups.buckets.buckets', 1)"
        :search-method="loadDropdownOptionsBucketsList" :value="itemInstance.bucket"
        @input="setItemProp({ prop: 'bucket', value: $event })" />
      <wt-select :disabled="disableUserInput" :label="$t('objects.ccenter.agents.agents', 1)"
        :search-method="loadDropdownOptionsAgentsList" :value="itemInstance.agent"
        @input="setItemProp({ prop: 'agent', value: $event })" />
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import CalendarsAPI from '../../../../../../lookups/modules/calendars/api/calendars';
import AgentsAPI from '../../../../agents/api/agents';

export default {
  name: 'OpenedQueueMemberGeneral',
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

<style lang="scss" scoped></style>
