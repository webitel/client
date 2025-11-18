<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.integrations.triggers.type')"
        :options="TriggerTypes"
        :v="v.itemInstance.type"
        :value="itemInstance.type"
        track-by="value"
        required
        @input="setItemProp({ prop: 'type', value: $event })"
      />
      <wt-select
        :disabled="disableUserInput"
        :label="$tc('objects.integrations.triggers.schema')"
        :search-method="loadDropdownOptionsList"
        :v="v.itemInstance.schema"
        :value="itemInstance.schema"
        required
        @input="setItemProp({ prop: 'schema', value: $event })"
      />
      <wt-select
        v-if="isCron"
        :disabled="disableUserInput"
        :label="$tc('date.timezone', 1)"
        :search-method="loadTimezones"
        :v="v.itemInstance.timezone"
        :value="itemInstance.timezone"
        required
        @input="setItemProp({ prop: 'timezone', value: $event })"
      />

      <wt-select
        v-if="isEvent"
        :disabled="disableUserInput"
        :label="$t('reusable.object')"
        :options="TriggerObjects"
        :v="v.itemInstance.object"
        :value="itemInstance.object"
        track-by="value"
        required
        @input="updateTriggerObject"
      />

      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.integrations.triggers.timeout')"
        :number-min="0"
        :v="v.itemInstance.timeout"
        :value="itemInstance.timeout"
        type="number"
        @input="setItemProp({ prop: 'timeout', value: $event })"
      />

      <wt-select
        v-if="isEvent"
        :disabled="disableUserInput || isEmptyObject"
        :label="$t('objects.integrations.triggers.eventSelect')"
        :options="triggerEventOptions"
        :v="v.itemInstance.event"
        :value="itemInstance.event"
        track-by="value"
        required
        @input="setItemProp({ prop: 'event', value: $event })"
      />

      <div
        v-if="isCron"
        class="crontab"
      >
        <wt-input
          :custom-validators="cronValidator"
          :disabled="disableUserInput"
          :label="$t('objects.integrations.triggers.expression')"
          :v="v.itemInstance.expression"
          :value="itemInstance.expression"
          required
          @input="setItemProp({ prop: 'expression', value: $event })"
        />
        <p
          v-show="!v.itemInstance.expression.$error"
          class="crontab__parsed"
        >
          {{ parsedCron }}
        </p>
      </div>

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
import 'cronstrue/locales/en.min';
import 'cronstrue/locales/ru.min';
import 'cronstrue/locales/uk.min';

import { isEmpty } from '@webitel/ui-sdk/scripts';
import cronstrue from 'cronstrue';
import { EngineRoutingSchemaType, EngineTriggerType } from 'webitel-sdk';

import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import CalendarsAPI from '../../../../lookups/modules/calendars/api/calendars';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import { TriggerEvents } from '../lookups/TriggerEvents.lookup';
import { TriggerEventsByObjectConfig } from '../lookups/TriggerEventsConfig.lookup';
import { TriggerObjects } from '../lookups/TriggerObjects.lookup';
import { TriggerTypes } from '../lookups/TriggerTypes.lookup';

export default {
  name: 'OpenedTriggerGeneral',
  mixins: [openedTabComponentMixin],
  data: () => ({
    TriggerTypes,
    TriggerEvents,
    TriggerObjects,
    EngineTriggerType,
  }),
  computed: {
    parsedCron() {
      const locale = this.$i18n.locale;
      return cronstrue.toString(this.itemInstance.expression, {
        locale,
        throwExceptionOnParseError: false,
      });
    },
    cronValidator() {
      return [
        {
          name: 'cron',
          text: this.$t('validation.cron'),
        },
      ];
    },
    isCron() {
      return this.itemInstance?.type?.value === EngineTriggerType.Cron;
    },
    isEvent() {
      return this.itemInstance?.type?.value === EngineTriggerType.Event;
    },
    isEmptyObject() {
      return isEmpty(this.itemInstance.object)
    },
    triggerEventOptions() {
      return this.isEmptyObject ? [] : TriggerEventsByObjectConfig[this.itemInstance.object.value]
    }
  },
  methods: {
    loadDropdownOptionsList(params) {
      return FlowsAPI.getLookup({
        ...params,
        type: [EngineRoutingSchemaType.Service],
      });
    },
    loadTimezones(params) {
      return CalendarsAPI.getTimezonesLookup(params);
    },
    updateTriggerObject(value) {
      this.setItemProp({ prop: 'event', value: null })
      this.setItemProp({ prop: 'object', value })
    }
  },
};
</script>

<style lang="scss" scoped>
.crontab__parsed {
  margin-top: var(--spacing-xs);
}
</style>
