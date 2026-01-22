<template>
  <wt-page-wrapper :actions-panel="!!currentTab?.filters">
    <template #header>
      <wt-page-header :hide-primary="!hasSaveActionAccess" :primary-action="save" :primary-disabled="disabledSave"
        :primary-text="saveText" :secondary-action="close">
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <component :is="currentTab.filters" :namespace="currentTab.filtersNamespace" />
    </template>

    <template #main>
      <form class="main-container" @submit.prevent="save">
        <wt-tabs :current="currentTab" :tabs="tabs" @change="changeTab" />
        <component :is="currentTab.value" :namespace="namespace" :v="v$" />
        <input hidden type="submit" />
        <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { minValue, numeric, required, requiredIf } from '@vuelidate/validators';
import { isValidCron } from 'cron-validator';
import { EngineTriggerType } from 'webitel-sdk';

import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import Logs from '../modules/logs/components/opened-trigger-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/the-triggers-logs-filters.vue';
import TriggersRouteNames from '../router/_internals/TriggersRouteNames.enum.js';
import General from './opened-trigger-general.vue';
import Variables from './opened-trigger-variables.vue';

const requiredIfType = (type) =>
  requiredIf(function () {
    return this.itemInstance?.type?.value === type;
  });

export default {
  name: 'OpenedTrigger',
  components: {
    General,
    Variables,
    Logs,
    LogsFilters,
  },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'integrations/triggers',
    routeName: RouteNames.TRIGGERS,
  }),
  validations: {
    itemInstance: {
      name: {
        required,
      },
      type: {
        required,
      },
      schema: {
        required,
      },
      timezone: {
        required: requiredIfType(EngineTriggerType.Cron),
      },
      object: {
        required: requiredIfType(EngineTriggerType.Event),
      },
      event: {
        required: requiredIfType(EngineTriggerType.Event),
      },
      timeout: {
        numeric,
        minValue: minValue(0),
      },
      expression: {
        required: requiredIfType(EngineTriggerType.Cron),
        cron(value) {
          if (requiredIfType(EngineTriggerType.Cron)) {
            return true;
          }
          return isValidCron(value, { seconds: true });
        },
      },
    },
  },

  computed: {
    tabs() {
      const general = {
        text: this.$t('objects.general'),
        value: 'general',
        pathName: TriggersRouteNames.GENERAL,
      };
      const variables = {
        text: this.$t('vocabulary.variables', 2),
        value: 'variables',
        pathName: TriggersRouteNames.VARIABLES,
      };
      const logs = {
        text: this.$t('objects.integrations.triggers.logs.logs'),
        value: 'logs',
        filters: 'logs-filters',
        filtersNamespace: `${this.namespace}/log/filters`,
        pathName: TriggersRouteNames.RUNNING_HISTORY,
      };

      const tabs = [general, variables];
      if (this.id) tabs.push(logs);
      return tabs;
    },

    path() {
      const baseUrl = '/integrations/triggers';
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$t('objects.integrations.triggers.triggers', 2),
          route: baseUrl,
        },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: {
            name: this.currentTab.pathName,
            query: this.$route.query,
          },
        },
      ];
    },
  },
};
</script>

<style scoped></style>
