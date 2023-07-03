<template>
  <wt-page-wrapper :actions-panel="!!currentTab.filters">
    <template v-slot:header>
      <wt-page-header
        :primary-text="saveText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="disabledSave"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:actions-panel>
      <component
        :is="currentTab.filters"
        :namespace="currentTab.filtersNamespace"
      ></component>
    </template>

    <template v-slot:main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :v="v$"
          :namespace="namespace"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, numeric, minValue } from '@vuelidate/validators';
import { isValidCron } from 'cron-validator';
import General from './opened-trigger-general.vue';
import Variables from './opened-trigger-variables.vue';
import Logs from '../modules/logs/components/opened-trigger-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/the-triggers-logs-filters.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-trigger',
  mixins: [openedObjectMixin],
  components: {
    General,
    Variables,
    Logs,
    LogsFilters,
  },
  data: () => ({
    namespace: 'integrations/triggers',
  }),

  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      name: { required },
      schema: { required },
      timezone: { required },
      timeout: {
        numeric,
        minValue: minValue(0),
      },
      expression: {
        required,
        cron: (value) => isValidCron(value, { seconds: true }),
      },
    },
  },

  computed: {
    tabs() {
      const general = {
        text: this.$t('objects.general'),
        value: 'general',
      };
      const variables = {
        text: this.$tc('vocabulary.variables', 2),
        value: 'variables',
      };
      const logs = {
        text: this.$t('objects.integrations.triggers.logs.logs'),
        value: 'logs',
        filters: 'logs-filters',
        filtersNamespace: `${this.namespace}/log/filters`,
      };

      const tabs = [
        general,
        variables,
      ];
      if (this.id) tabs.push(logs);
      return tabs;
    },

    path() {
      const baseUrl = '/integrations/triggers';
      return [
        { name: this.$t('objects.integrations.integrations') },
        { name: this.$tc('objects.integrations.triggers.triggers', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
