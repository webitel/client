<template>
  <wt-popup
    v-bind="$attrs"
    :shown="!!editedApp"
    size="sm"
    @close="close"
  >
    <template #title>
      {{ $tc('objects.permissions.roles.applicationsAccess.applicationsAccess', 1) }}:
      {{ $t(`WebitelApplications.${editedApp}.name`) }}
    </template>
    <template #main>
      <form>
        <wt-checkbox
          v-for="sec of coreTypeSectionsAccess"
          :key="sec.name"
          :label="sec.displayName"
          :selected="sec.enabled"
          :value="true"
          @update:selected="updateAccess({ app: editedApp, section: sec.name, value: $event })"
        />
        <wt-checkbox
          v-for="sec of customTypeSectionsAccess"
          :key="sec.name"
          :label="sec.displayName"
          :selected="sec.enabled"
          :value="true"
          @update:selected="updateAccess({ app: editedApp, section: sec.name, value: $event, custom: true })"
        />
      </form>
    </template>
    <template #actions>
      <wt-button
        @click="close"
      >
        {{ $t('objects.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >
        {{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script lang="ts">
import { AdjunctTypesAPI as CustomTypesAPI } from '@webitel/api-services/api';
import {
  WebitelProtoDataStruct,
} from '@webitel/api-services/gen/models';
import { WtCheckbox } from '@webitel/ui-sdk/components';
import { WtApplication } from '@webitel/ui-sdk/enums';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'OpenedRolePermissionsPopup',
  components: {
    WtCheckbox,
  },
  mixins: [nestedObjectMixin],
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    customTypes: [] as WebitelProtoDataStruct[], // aka "adjunct types", in crm app
  }),
  computed: {
    ...mapState({
      access(state) {
        return getNamespacedState(state, this.namespace).itemInstance.metadata.access;
      },
    }),
    coreTypeSectionsAccess() {
      if (!this.editedApp) return [];

      // TODO Hidden before WFM will be ready
      // https://webitel.atlassian.net/browse/WTEL-8690
      const WFMSections = ['pause-templates', 'shift-templates', 'working-conditions'];

      return Object.keys(this.access[this.editedApp])
        .filter((section) => section.slice(0, 1) !== '_') // "functional" properties start with _
        .filter((section) => !this.access[this.editedApp][section]._custom) // custom types are handled in a separate computed
        .filter((section) => !WFMSections.includes(section))
        .map((section) => ({
          name: section,
          displayName: this.$t(`${this.access[this.editedApp][section]._locale}`),
          enabled: this.access[this.editedApp][section]._enabled,
        }));
    },
    customTypeSectionsAccess() {
      if (this.editedApp !== WtApplication.Crm) return [];

      return this.customTypes
        .map((customType) => ({
          name: customType.repo,
          displayName: customType.name,
          enabled: !!this.access[this.editedApp]?.[customType.repo]?._enabled,
        }));
    },
    editedApp() {
      return this.$route.params.applicationName;
    }
  },
  methods: {
    ...mapActions({
      updateAccess(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_APPLICATION_SECTION_ACCESS`, payload);
      },
    }),
    loadItem() {},
    resetState() {},
    async loadCustomTypes() {
      const { items } = await CustomTypesAPI.getList({
        size: -1,
      });
      this.customTypes = items;
    },
  },
  watch: {
    // coz adjuct types are only available in crm app
    editedApp: {
      handler(newVal) {
        if (newVal === WtApplication.Crm && !this.customTypes.length) {
          this.loadCustomTypes();
        }
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>

</style>
