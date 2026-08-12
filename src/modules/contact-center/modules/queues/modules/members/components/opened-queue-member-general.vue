<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <form class="object-input-grid">
      <wt-input-text
        v-model="member.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-input-number
        v-model="member.priority"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.priority')"
      />
      <wt-datepicker
        v-model="member.expireAt"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.expire')"
        show-time
      />
      <wt-single-select
        v-model="member.timezone"
        :disabled="disableUserInput || !hasCalendarsReadAccess"
        :label="t('objects.ccenter.queues.timezone')"
        :search-method="loadTimezoneOptions"
      />
      <wt-single-select
        v-model="member.bucket"
        :disabled="disableUserInput || !hasBucketsReadAccess"
        :label="t('objects.lookups.buckets.buckets', 1)"
        :search-method="loadBucketsOptions"
      />
      <wt-single-select
        v-model="member.agent"
        :disabled="disableUserInput || !hasAgentsReadAccess"
        :label="t('objects.ccenter.agents.agents', 1)"
        :search-method="loadAgentsOptions"
      />
    </form>
  </section>
</template>

<script lang="ts" setup>
import type { EngineMemberInQueue } from '@webitel/api-services/gen/models';
import { WtObject } from '@webitel/ui-sdk/enums';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';

import { useUserAccessControl } from '../../../../../../../app/composables/useUserAccessControl';
import BucketsAPI from '../../../../../../lookups/modules/buckets/api/buckets';
import CalendarsAPI from '../../../../../../lookups/modules/calendars/api/calendars';
import AgentsAPI from '../../../../agents/api/agents';

const modelValue = defineModel<EngineMemberInQueue>({
	required: true,
});

defineProps<{
	// biome-ignore lint/suspicious/noExplicitAny: regle's field status shape
	validationFields?: Record<string, any>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl({
	useUpdateAccessAsAllMutableChecksSource: true,
});
const { hasReadAccess: hasBucketsReadAccess } = useUserAccessControl(
	WtObject.Bucket,
);
const { hasReadAccess: hasCalendarsReadAccess } = useUserAccessControl(
	WtObject.Calendar,
);
const { hasReadAccess: hasAgentsReadAccess } = useUserAccessControl(
	WtObject.Agent,
);

const member = computed(() => modelValue.value);

const loadBucketsOptions = (params: unknown) => BucketsAPI.getLookup(params);
const loadTimezoneOptions = (params: unknown) =>
	CalendarsAPI.getTimezonesLookup(params);
const loadAgentsOptions = (params: unknown) => AgentsAPI.getLookup(params);
</script>

<style
  lang="scss"
  scoped
></style>
