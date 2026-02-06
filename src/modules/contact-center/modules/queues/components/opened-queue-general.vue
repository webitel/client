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
        :clearable="true"
        :disabled="disableUserInput || !hasCalendarsReadAccess"
        :label="$t('objects.lookups.calendars.calendars', 1)"
        :search-method="loadDropdownOptionsCalendarList"
        :v="v.itemInstance.calendar"
        :value="itemInstance.calendar"
        :required="v.itemInstance.calendar"
        @input="setItemProp({ prop: 'calendar', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput || !hasListsReadAccess"
        :label="$t('objects.ccenter.queues.blacklist')"
        :search-method="loadDropdownOptionsBlacklistList"
        :value="itemInstance.dncList"
        @input="setItemProp({ prop: 'dncList', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.priority')"
        :model-value="itemInstance.priority"
        @update:model-value="setItemProp({ prop: 'priority', value: +$event })"
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.strategy"
        v-model="strategy"
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.strategy')"
        :options="dropdownOptionsStrategyList"
        :v="v.itemInstance.strategy"
        required
        track-by="value"
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.team"
        :clearable="true"
        :disabled="disableUserInput || !hasTeamsReadAccess"
        :label="$t('objects.team')"
        :search-method="loadDropdownOptionsTeamList"
        :v="v.itemInstance.team"
        :value="itemInstance.team"
        @input="setItemProp({ prop: 'team', value: $event })"
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.ringtone"
        :disabled="disableUserInput || !hasMediaReadAccess"
        :label="$t('objects.ccenter.queues.ringtone')"
        :search-method="loadDropdownOptionsMediaList"
        :value="itemInstance.ringtone"
        @input="setItemProp({ prop: 'ringtone', value: $event })"
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.schema"
        :clearable="false"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="$t('objects.routing.flow.flow', 1)"
        :search-method="loadDropdownOptionsSchemaList"
        :v="v.itemInstance.schema"
        :value="itemInstance.schema"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.doSchema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="$t('objects.ccenter.queues.preSchema')"
        :search-method="loadDropdownOptionsServiceSchemaList"
        :value="itemInstance.doSchema"
        @input="setItemProp({ prop: 'doSchema', value: $event })"
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.resourceStrategy"
        v-model="resourceStrategy"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.resourceStrategy.resourceStrategy')"
        :options="dropdownTypesResourceStrategy"
        :value="itemInstance.payload.resourceStrategy"
        :v="v.itemInstance.payload.resourceStrategy"
        track-by="value"
        required
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.afterSchema"
        :disabled="disableUserInput || !hasFlowsReadAccess"
        :label="$t('objects.ccenter.queues.afterSchema')"
        :search-method="loadDropdownOptionsServiceSchemaList"
        :value="itemInstance.afterSchema"
        @input="setItemProp({ prop: 'afterSchema', value: $event })"
      />

      <!--      v-if-->
      <wt-select
        v-if="specificControls.grantee"
        :clearable="true"
        :disabled="disableUserInput || !hasRolesReadAccess"
        :label="$t('objects.permissions.object.grantee')"
        :search-method="loadDropdownOptionsRoleList"
        :value="itemInstance.grantee"
        @input="setItemProp({ prop: 'grantee', value: $event })"
      />

      <wt-tags-input
        :disabled="disableUserInput"
        :label="$t('vocabulary.tag', 2)"
        :search-method="loadQueuesTagOptions"
        :value="itemInstance.tags"
        option-label="name"
        taggable
        track-by="name"
        @input="setItemProp({ prop: 'tags', value: $event })"
      />

      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { kebabToCamel } from '@webitel/ui-sdk/src/scripts/caseConverters';
import { mapActions } from 'vuex';
import { EngineRoutingSchemaType } from 'webitel-sdk';
import { WtObject } from '@webitel/ui-sdk/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import BlacklistsAPI from '../../../../lookups/modules/blacklists/api/blacklists';
import CalendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import MediaAPI from '../../../../lookups/modules/media/api/media';
import RolesAPI from '../../../../permissions/modules/roles/api/roles';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import TeamsAPI from '../../teams/api/teams';
import QueuesAPI from '../api/queues';
import { TypesResourceStrategy } from '../enums/TypesResourceStrategy.enum';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';
import { StrategyList } from '../store/_internals/enums/Strategy.enum';

export default {
  name: 'OpenedQueueGeneral',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    const { hasReadAccess: hasCalendarsReadAccess } = useUserAccessControl(WtObject.Calendar);
    const { hasReadAccess: hasListsReadAccess } = useUserAccessControl(WtObject.Blacklist);
    const { hasReadAccess: hasTeamsReadAccess } = useUserAccessControl(WtObject.Team);
    const { hasReadAccess: hasFlowsReadAccess } = useUserAccessControl(WtObject.Flow);
    const { hasReadAccess: hasMediaReadAccess } = useUserAccessControl(WtObject.Media);
    const { hasReadAccess: hasRolesReadAccess } = useUserAccessControl(WtObject.Role);
    return {
      disableUserInput,
      hasCalendarsReadAccess,
      hasListsReadAccess,
      hasTeamsReadAccess,
      hasFlowsReadAccess,
      hasMediaReadAccess,
      hasRolesReadAccess,
    };
  },

  computed: {
    strategy: {
      get() {
        return this.dropdownOptionsStrategyList.find(
          (strategy) => strategy.value === this.itemInstance.strategy,
        );
      },
      set(value) {
        this.setItemProp({
          prop: 'strategy',
          value: value.value,
        });
      },
    },
    resourceStrategy: {
      get() {
        return this.dropdownTypesResourceStrategy.find(
          (resourceStrategy) => resourceStrategy.value === this.itemInstance.payload.resourceStrategy,
        );
      },
      set({ value }) {
        this.setItemPayloadProp({
          prop: 'resourceStrategy',
          value,
        });
      },
    },

    dropdownOptionsStrategyList() {
      return StrategyList.map((strategy) => ({
        value: strategy.value,
        name: this.$t(`objects.ccenter.queues.queueStrategy.${strategy.value}`),
      }));
    },
    dropdownTypesResourceStrategy() {
      return Object.values(TypesResourceStrategy).map((value) => {
        return {
          value,
          name: this.$t(`objects.ccenter.queues.resourceStrategy.${kebabToCamel(value)}`)
        };
      });
    },
    specificControls() {
      return QueueTypeProperties[this.itemInstance.type].controls.reduce(
        (controls, control) => ({
          ...controls,
          [control]: true,
        }),
        {},
      );
    },
  },

  methods: {
    ...mapActions({
      setItemPayloadProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PAYLOAD_PROPERTY`, payload);
      },
    }),
    loadDropdownOptionsCalendarList(params) {
      return CalendarsAPI.getLookup(params);
    },
    loadDropdownOptionsBlacklistList(params) {
      return BlacklistsAPI.getLookup(params);
    },
    loadDropdownOptionsTeamList(params) {
      return TeamsAPI.getLookup(params);
    },
    loadDropdownOptionsSchemaList(params) {
      return FlowsAPI.getLookup(params);
    },
    loadDropdownOptionsServiceSchemaList(params) {
      return FlowsAPI.getLookup({
        ...params,
        type: [EngineRoutingSchemaType.Service],
      });
    },
    loadDropdownOptionsMediaList(params) {
      return MediaAPI.getLookup(params);
    },
    loadDropdownOptionsRoleList(params) {
      return RolesAPI.getLookup(params);
    },
    loadQueuesTagOptions: QueuesAPI.getQueuesTags,
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
