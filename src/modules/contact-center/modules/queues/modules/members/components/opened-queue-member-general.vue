<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.priority')"
        :model-value="itemInstance.priority"
        @update:model-value="setItemProp({ prop: 'priority', value: +$event })"
      />
      <wt-datepicker
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.expire')"
        :value="itemInstance.expireAt"
        mode="datetime"
        @input="setItemProp({ prop: 'expireAt', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput || !hasCalendarsReadAccess"
        :label="$t('objects.ccenter.queues.timezone')"
        :search-method="loadDropdownOptionsTimezoneList"
        :value="itemInstance.timezone"
        @input="setItemProp({ prop: 'timezone', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput || !hasBucketsReadAccess"
        :label="$t('objects.lookups.buckets.buckets', 1)"
        :search-method="loadDropdownOptionsBucketsList"
        :value="itemInstance.bucket"
        @input="setItemProp({ prop: 'bucket', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput || !hasAgentsReadAccess"
        :label="$t('objects.ccenter.agents.agents', 1)"
        :search-method="loadDropdownOptionsAgentsList"
        :value="itemInstance.agent"
        @input="setItemProp({ prop: 'agent', value: $event })"
      />
    </form>
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import CalendarsAPI from '../../../../../../lookups/modules/calendars/api/calendars';
import AgentsAPI from '../../../../agents/api/agents';

export default {
  name: 'OpenedQueueMemberGeneral',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl({
      useUpdateAccessAsAllMutableChecksSource: true,
    });
    const { hasReadAccess: hasBucketsReadAccess } = useUserAccessControl(WtObject.Bucket);
    const { hasReadAccess: hasCalendarsReadAccess } = useUserAccessControl(WtObject.Calendar);
    const { hasReadAccess: hasAgentsReadAccess } = useUserAccessControl(WtObject.Agent);
    return {
      disableUserInput,
      hasBucketsReadAccess,
      hasCalendarsReadAccess,
      hasAgentsReadAccess,
    };
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

<style
  lang="scss"
  scoped
></style>
