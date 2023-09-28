<template>
  <wt-page-wrapper
    :actions-panel="!!currentTab.filters"
  >
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
import { minValue, required } from '@vuelidate/validators';
import General from './opened-changelog-general.vue';
import Logs from '../modules/logs/components/opened-changelog-logs.vue';
import LogsFilters from '../modules/logs/modules/filters/components/opened-changelog-logs-filters.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-changelog',
  mixins: [openedObjectMixin],
  components: {
    General,
    Logs,
    LogsFilters,
  },
  data: () => ({
    namespace: 'system/changelogs',
  }),
  setup: () => ({
    v$: useVuelidate(),
  }),
  validations: {
    itemInstance: {
      object: { required },
      // storage: { required },
      daysToStore: { required, minValue: minValue(1) },
      // period: { required, minValue: minValue(1) },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
        },
      ];
      const logs = {
        text: this.$tc('objects.system.changelogs.logs.logs', 2),
        value: 'logs',
        filters: 'logs-filters',
        filtersNamespace: `${this.namespace}/logs/filters`,
      };
      if (this.id) tabs.push(logs);
      return tabs;
    },

    path() {
      const baseUrl = '/system/changelogs';
      return [
        { name: this.$t('objects.system.system') },
        { name: this.$tc('objects.system.changelogs.changelogs', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
  methods: {
    setPathName() {
      this.pathName = this.itemInstance.object.name;
    },
  },
  mounted() {
    // override headlineNavMixin
    const unwatch = this.$watch('itemInstance.object', () => {
      this.setPathName();
      unwatch();
    });
  },
};
</script>

<style scoped>

</style>
