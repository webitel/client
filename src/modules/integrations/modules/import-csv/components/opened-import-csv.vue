<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header :hide-primary="!hasSaveActionAccess" :primary-action="save" :primary-disabled="disabledSave"
        :primary-text="saveText" :secondary-action="close">
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <form class="main-container" @submit.prevent="save">
        <wt-tabs :current="currentTab" :tabs="tabs" @change="changeTab" />
        <component :is="currentTab.value" :namespace="namespace" :v="v$" />
        <input hidden type="submit"> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import ImportCsvMemberMappings from '../lookups/ImportCsvMemberMappings.lookup';
import ImportCsvRouteName from '../router/_internals/ImportCsvRouteNames.enum.js';
import General from './opened-import-csv-general.vue';
import Settings from './opened-import-csv-settings.vue';

export default {
  name: 'OpenedImportCsv',
  components: {
    General,
    Settings,
  },
  mixins: [openedObjectMixin],
  setup: () => {
    const v$ = useVuelidate();
    const { hasSaveActionAccess } = useUserAccessControl();
    return {
      v$,
      hasSaveActionAccess,
    };
  },
  data: () => ({
    namespace: 'integrations/importCsv',
    routeName: RouteNames.IMPORT_CSV,
    permissionsTabPathName: ImportCsvRouteName.PERMISSIONS,
  }),
  validations() {
    return {
      itemInstance: {
        name: {
          required,
        },
        source: {
          required,
        },
        parameters: {
          charset: {
            required,
          },
          separator: {
            required,
          },
          skipHeaders: {
            required,
          },
          mappings: Object.entries(ImportCsvMemberMappings).reduce(
            (mappings, [name, { required: reqField }]) =>
              reqField
                ? {
                  ...mappings,
                  [name]: {
                    required,
                  },
                }
                : mappings,
            {},
          ),
        },
      },
    };
  },
  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: ImportCsvRouteName.GENERAL,
        },
        {
          text: this.$t('objects.integrations.importCsv.settings'),
          value: 'settings',
          pathName: ImportCsvRouteName.SETTINGS,
        },
      ];
      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/integrations/import-csv';
      return [
        {
          name: this.$t('objects.integrations.integrations'),
        },
        {
          name: this.$t('objects.integrations.importCsv.importCsv'),
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
