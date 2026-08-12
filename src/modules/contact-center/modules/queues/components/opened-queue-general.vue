<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        v-model="modelValue.name"
        :disabled="disableUserInput"
        :label="t('objects.name')"
        :regle-validation="validationFields?.name"
        required
      />
      <wt-single-select
        v-model="modelValue.calendar"
        :disabled="disableUserInput || !hasCalendarsReadAccess"
        :label="t('objects.lookups.calendars.calendars', 1)"
        :regle-validation="validationFields?.calendar"
        :required="isFieldRequired('calendar')"
        :search-method="loadCalendarOptions"
      />
      <wt-single-select
        v-model="modelValue.dncList"
        :disabled="disableUserInput || !hasListsReadAccess"
        :label="t('objects.ccenter.queues.blacklist')"
        :search-method="loadBlacklistOptions"
      />
      <wt-input-number
        v-model="modelValue.priority"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.priority')"
        :regle-validation="validationFields?.priority"
      />

      <wt-single-select
        v-if="specificControls.strategy"
        v-model="strategy"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.strategy')"
        :options="strategyOptions"
        :regle-validation="validationFields?.strategy"
        :show-clear="false"
        data-key="value"
        required
      />

      <wt-single-select
        v-if="specificControls.team"
        v-model="modelValue.team"
        :disabled="disableUserInput || !hasTeamsReadAccess"
        :label="t('objects.team')"
        :regle-validation="validationFields?.team"
        :search-method="loadTeamOptions"
      />

      <wt-single-select
        v-if="specificControls.ringtone"
        v-model="modelValue.ringtone"
        :disabled="disableUserInput || !hasMediaReadAccess"
        :label="t('objects.ccenter.queues.ringtone')"
        :search-method="loadMediaOptions"
      />

      <wt-single-select
        v-if="specificControls.schema"
        v-model="modelValue.schema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.routing.flow.flow', 1)"
        :regle-validation="validationFields?.schema"
        :search-method="hasFlowsReadAccess && loadFlowOptions"
        required
      />

      <wt-single-select
        v-if="specificControls.doSchema"
        v-model="modelValue.doSchema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.ccenter.queues.preSchema')"
        :search-method="hasFlowsReadAccess && loadServiceFlowOptions"
      />

      <wt-single-select
        v-if="specificControls.resourceStrategy"
        v-model="modelValue.payload.resourceStrategy"
        :disabled="disableUserInput"
        :label="t('objects.ccenter.queues.resourceStrategy.resourceStrategy')"
        :options="resourceStrategyOptions"
        :regle-validation="validationFields?.payload?.$fields?.resourceStrategy"
        data-key="value"
        option-value="value"
        required
      />

      <wt-single-select
        v-if="specificControls.afterSchema"
        v-model="modelValue.afterSchema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="t('objects.ccenter.queues.afterSchema')"
        :search-method="hasFlowsReadAccess && loadServiceFlowOptions"
      />

      <wt-single-select
        v-if="specificControls.grantee"
        v-model="modelValue.grantee"
        :disabled="disableUserInput || !hasRolesReadAccess"
        :label="t('objects.permissions.object.grantee')"
        :search-method="loadRoleOptions"
      />

      <wt-multi-select
        v-model="modelValue.tags"
        :disabled="disableUserInput"
        :label="t('vocabulary.tag', 2)"
        :search-method="loadQueuesTagOptions"
        allow-custom-values
        chips-view
        data-key="name"
        option-label="name"
      />

      <wt-textarea
        v-model="modelValue.description"
        :disabled="disableUserInput"
        :label="t('objects.description')"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
import { QueuesAPI } from '@webitel/api-services/api';
import {
	QueueStrategyList,
	TypesResourceStrategy,
} from '@webitel/api-services/enums';
import { WtObject } from '@webitel/ui-sdk/enums';
import { kebabToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import BlacklistsAPI from '../../../../lookups/modules/blacklists/api/blacklists';
import CalendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import MediaAPI from '../../../../lookups/modules/media/api/media';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import TeamsAPI from '../../teams/api/teams';
import { useQueueTypeControls } from '../composables/useQueueTypeControls';
import type { Queue } from '../types/Queue';

const modelValue = defineModel<Queue>({
	required: true,
});

defineProps<{
	// biome-ignore lint/suspicious/noExplicitAny: regle's field status shape
	validationFields?: Record<string, any>;
}>();

const { t } = useI18n();

const { disableUserInput } = useUserAccessControl();
const { hasReadAccess: hasCalendarsReadAccess } = useUserAccessControl(
	WtObject.Calendar,
);
const { hasReadAccess: hasListsReadAccess } = useUserAccessControl(
	WtObject.Blacklist,
);
const { hasReadAccess: hasTeamsReadAccess } = useUserAccessControl(
	WtObject.Team,
);
const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(
	WtObject.Flow,
);
const { hasReadAccess: hasMediaReadAccess } = useUserAccessControl(
	WtObject.Media,
);
const { hasReadAccess: hasRolesReadAccess } = useUserAccessControl(
	WtObject.Role,
);

const { specificControls, isFieldRequired } = useQueueTypeControls(
	() => modelValue.value?.type as number | undefined,
);

const strategyOptions = computed(() =>
	QueueStrategyList.map(({ value }) => ({
		value,
		name: t(`objects.ccenter.queues.queueStrategy.${value}`),
	})),
);

const resourceStrategyOptions = computed(() =>
	Object.values(TypesResourceStrategy).map((value) => ({
		value,
		name: t(`objects.ccenter.queues.resourceStrategy.${kebabToCamel(value)}`),
	})),
);

/** the select works in option objects while the queue stores the bare value */
const strategy = computed({
	get: () =>
		strategyOptions.value.find(
			(option) => option.value === modelValue.value?.strategy,
		),
	set: (option) => {
		modelValue.value.strategy = option?.value;
	},
});

const loadCalendarOptions = (params: unknown) => CalendarsAPI.getLookup(params);
const loadBlacklistOptions = (params: unknown) =>
	BlacklistsAPI.getLookup(params);
const loadTeamOptions = (params: unknown) => TeamsAPI.getLookup(params);
const loadFlowOptions = (params: unknown) => FlowsAPI.getLookup(params);
const loadServiceFlowOptions = (params: object) =>
	FlowsAPI.getLookup({
		...params,
		type: [
			EngineRoutingSchemaType.Service,
		],
	});
const loadMediaOptions = (params: unknown) => MediaAPI.getLookup(params);
const loadRoleOptions = (params: unknown) => RolesAPI.getLookup(params);
const loadQueuesTagOptions = QueuesAPI.getQueuesTags;
</script>

<style
  lang="scss"
  scoped
></style>
