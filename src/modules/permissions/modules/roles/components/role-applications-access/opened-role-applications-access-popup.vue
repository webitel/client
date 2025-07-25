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
        <div
          v-for="sectionNode in appSectionsAccess"
          :key="sectionNode.name"
        >
          <wt-checkbox
            :disabled="sectionNode.disabled"
            :label="sectionNode.displayName"
            :selected="sectionNode.enabled"
            :value="true"
            @change="handleAccessChange(sectionNode, $event)"
          />
        </div>
      </form>
    </template>
    <template #actions>
      <wt-button @click="close">
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

<script>
import { CrmSections, WtApplication } from '@webitel/ui-sdk/enums';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import CustomLookupsApi from '../../api/custom-lookups';
import { findNodeInTree } from '../../utils/findNodeInTree';
import { flattenTree } from '../../utils/flattenTree';

// Hierarchy of sections in Configuration in CRM
const STATIC_CONFIG_SECTIONS = [
  CrmSections.Slas,
  CrmSections.Sources,
  CrmSections.ServiceCatalogs,
  CrmSections.CloseReasonGroups,
  CrmSections.ContactGroups,
  CrmSections.Priorities,
  CrmSections.Statuses,
];

const CUSTOMIZATION_SECTIONS = [
  CrmSections.TypesExtensionsCustomization,
  CrmSections.CustomLookups,
];

const SECTIONS_HIERARCHY = {
  [CrmSections.Configuration]: [
    ...STATIC_CONFIG_SECTIONS,
    ...CUSTOMIZATION_SECTIONS,
  ],
};

const DISPLAY_ORDER = [
  CrmSections.Contacts,
  CrmSections.Cases,
  CrmSections.Configuration,
];

export default {
  name: 'OpenedRolePermissionsPopup',
  mixins: [nestedObjectMixin],

  props: {
    namespace: {
      type: String,
      required: true,
    },
  },

  data: () => ({
    customLookupRecords: [],
    storedChildStates: {},
  }),

  computed: {
    ...mapState({
      access(state) {
        return getNamespacedState(state, this.namespace).itemInstance.metadata.access;
      },
    }),

    // Gets the name of the application being edited from the route parameters.
    // So it can be used to determine which application's section we are editing.
    editedApp() {
      return this.$route.params.applicationName;
    },

    // Checks if the currently edited application is CRM.
    isCrmApp() {
      return this.editedApp === WtApplication.Crm;
    },

    // Creates a map of section information (name, displayName, enabled status)
    // from the Store state and custom lookups for easier access.
    sectionInfoMap() {
      const appAccess = this.access[this.editedApp] || {};
      const map = new Map();

      Object.entries(appAccess).forEach(([sectionName, info]) => {
        if (info?._locale) {
          map.set(sectionName, {
            name: sectionName,
            displayName: this.$t(info._locale),
            enabled: !!info._enabled,
          });
        }
      });

      if (this.isCrmApp) {
        this.customLookupRecords.forEach(record => {
          const sectionName = record.id;
          const info = appAccess[sectionName] || {};
          map.set(sectionName, {
            name: sectionName,
            displayName: record.name,
            enabled: !!info._enabled,
          });
        });
      }

      return map;
    },

    // Builds the hierarchical structure of application sections.
    // Uses a specific structure for CRM and a default one for other apps.
    sectionsHierarchy() {
      return this.isCrmApp
        ? this.buildCrmHierarchy()
        : this.buildDefaultHierarchy();
    },

    // Combines the hierarchy structure with the state from sectionInfoMap
    // to create a full tree of section nodes.
    sectionsTree() {
      if (!this.sectionInfoMap.size) return [];
      return this.sectionsHierarchy.map(this.mapNodeWithState).filter(Boolean);
    },

    // Flattens the sections tree into a single-level array for rendering in component.
    // This function is used for displaying the sections in the popup.
    appSectionsAccess() {
      return flattenTree(this.sectionsTree);
    },

    // Checks if the main 'CRM/Configuration' section is enabled.
    // This is used to control the state of its child sections.
    isConfigurationEnabled() {
      if (!this.isCrmApp) return true;
      return this.sectionInfoMap.get(CrmSections.Configuration)?.enabled ?? false;
    },
  },

  mounted() {
    this.loadCustomLookups();
  },

  methods: {
    ...mapActions({
      updateAccessAction(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_APPLICATION_SECTION_ACCESS`, payload);
      },
    }),

    // Handles the checkbox change event. Updates the section's access
    // and cascades the change to its children if it's a parent node.
    handleAccessChange(sectionNode, isEnabled) {
      this.updateAccess(sectionNode.name, isEnabled);

      const fullNode = findNodeInTree(this.sectionsTree, sectionNode.name);
      if (fullNode?.children.length) {
        this.updateChildrenAccess(fullNode.children, isEnabled);
      }
    },

    updateAccess(section, value) {
      this.updateAccessAction({
        app: this.editedApp,
        section,
        value,
      });
    },

    // Updates the access state of child nodes based on the parent's state.
    // It stores and restores the children's previous state when the parent is toggled.
    updateChildrenAccess(children, isParentEnabled) {
      children.forEach(childNode => {
        if (!isParentEnabled) {
          this.storedChildStates[childNode.name] = childNode.enabled;
        }

        const childValue = isParentEnabled
          ? (this.storedChildStates[childNode.name] ?? true)
          : false;

        this.updateAccess(childNode.name, childValue);
      });
    },

    // Constructs the specific section hierarchy for the CRM application,
    // including dynamic custom lookups.
    buildCrmHierarchy() {
      const customLookupIds = this.customLookupRecords.map(record => record.id);

      // Assemble the final ordered list from the three parts
      const orderedConfigChildren = [
        ...STATIC_CONFIG_SECTIONS,
        ...customLookupIds,
        ...CUSTOMIZATION_SECTIONS,
      ];

      const fullHierarchy = {
        ...SECTIONS_HIERARCHY,
        [CrmSections.Configuration]: orderedConfigChildren,
      };

      return DISPLAY_ORDER.map(sectionName => ({
        name: sectionName,
        children: (fullHierarchy[sectionName] || []).map(childName => ({ name: childName, children: [] })),
      }));
    },

    // Creates a simple, flat hierarchy for any non-CRM application
    // based on the sections available in the sectionInfoMap.
    buildDefaultHierarchy() {
      return Array.from(this.sectionInfoMap.keys()).map(sectionName => ({
        name: sectionName,
        children: [],
      }));
    },

    // Maps a node from the hierarchy structure to a stateful node,
    // enriching it with data from sectionInfoMap (like displayName, enabled, disabled state).
    mapNodeWithState(nodeStub) {
      const info = this.sectionInfoMap.get(nodeStub.name);
      if (!info) return null;

      const node = { ...info, disabled: false, children: [] };

      if (nodeStub.children.length) {
        node.children = nodeStub.children
          .map(childStub => {
            const childInfo = this.sectionInfoMap.get(childStub.name);
            if (!childInfo) return null;
            return {
              ...childInfo,
              disabled: this.isCrmApp ? !this.isConfigurationEnabled : false,
              children: [],
            };
          })
          .filter(Boolean);
      }
      return node;
    },

    // Asynchronously loads custom lookup records from the API.
    // This is needed to dynamically build the CRM section hierarchy.
    async loadCustomLookups() {
      const response = await CustomLookupsApi.getList({ size: -1 });
      this.customLookupRecords = response.items || [];
    },
    resetState() {},
  },
};
</script>
<style scoped>
</style>
