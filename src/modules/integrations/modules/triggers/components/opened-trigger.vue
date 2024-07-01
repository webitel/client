<template>
  <wt-page-wrapper :actions-panel="!!currentTab.filters">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>

    <template #actions-panel>
      <component
        :is="currentTab.filters"
        :namespace="currentTab.filtersNamespace"
      />
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { minValue, numeric, required } from '@vuelidate/validators';
import { isValidCron } from 'cron-validator';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Logs from '../modules/logs/components/opened-trigger-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/the-triggers-logs-filters.vue';
import General from './opened-trigger-general.vue';
import Variables from './opened-trigger-variables.vue';

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
        cron: (value) =>
          isValidCron(value, {
            seconds: true,
          }),
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
          name: this.$tc('objects.integrations.triggers.triggers', 2),
          route: baseUrl,
        },
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
