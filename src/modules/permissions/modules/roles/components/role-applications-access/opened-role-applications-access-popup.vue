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

<script>
import { CrmSections } from '@webitel/ui-sdk/enums';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import CustomLookupsApi from '../../api/custom-lookups';
import { findNodeInTree } from '../../utils/findNodeInTree';
import { flattenTree } from '../../utils/flattenTree';

// Hierarchy of sections in CRM application
const PERMISSION_HIERARCHY = {
  [CrmSections.CrmConfiguration]: [
    CrmSections.Slas,
    CrmSections.Sources,
    CrmSections.ServiceCatalogs,
    CrmSections.CloseReasonGroups,
    CrmSections.ContactGroups,
    CrmSections.Priorities,
    CrmSections.Statuses,
    CrmSections.SectionCustomization,
    CrmSections.CustomLookups,
  ],
};

export default {
  name: 'OpenedRolePermissionsPopup',
  mixins: [nestedObjectMixin],
  props: {
    namespace: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      customLookupRecords: [],
      storedChildStates: {},
    };
  },
  computed: {
    ...mapState({
      access(state) {
        return getNamespacedState(state, this.namespace).itemInstance.metadata.access;
      },
    }),
    editedApp() {
      return this.$route.params.applicationName;
    },

    sectionInfoMap() {
      const map = new Map();
      const appAccess = this.access[this.editedApp];
      if (!appAccess) return map;

      Object.entries(appAccess).forEach(([sectionName, info]) => {
        if (info?._locale) {
          map.set(sectionName, {
            name: sectionName,
            displayName: this.$t(info._locale),
            enabled: !!info._enabled,
          });
        }
      });

      this.customLookupRecords.forEach(record => {
        const sectionName = record.id;
        const info = appAccess[sectionName] || {};
        map.set(sectionName, {
          name: sectionName,
          displayName: record.name,
          enabled: !!info._enabled,
        });
      });

      return map;
    },

    sectionsHierarchy() {
      const customLookupIds = this.customLookupRecords.map(record => record.id);
      const fullHierarchy = {
        [CrmSections.CrmConfiguration]: [
          ...(PERMISSION_HIERARCHY[CrmSections.CrmConfiguration] || []),
          ...customLookupIds,
        ],
      };
      const displayOrder = [
        CrmSections.Contacts,
        CrmSections.Cases,
        CrmSections.CrmConfiguration,
      ];

      return displayOrder.map(sectionName => {
        const childrenNames = fullHierarchy[sectionName] || [];
        return {
          name: sectionName,
          children: childrenNames.map(childName => ({ name: childName, children: [] })),
        };
      });
    },

    sectionsTree() {
      if (!this.sectionInfoMap.size) return [];

      const isParentEnabled = this.sectionInfoMap.get(CrmSections.CrmConfiguration)?.enabled ?? false;

      const mapNodeWithState = (nodeStub) => {
        const info = this.sectionInfoMap.get(nodeStub.name);
        if (!info) return null;

        const node = {
          ...info,
          disabled: false,
          children: [],
        };

        if (nodeStub.children.length) {
          node.children = nodeStub.children.map(childStub => {
            const childInfo = this.sectionInfoMap.get(childStub.name);
            if (!childInfo) return null;
            return {
              ...childInfo,
              disabled: !isParentEnabled,
              children: [],
            };
          }).filter(Boolean);
        }
        return node;
      };

      return this.sectionsHierarchy.map(mapNodeWithState).filter(Boolean);
    },

    appSectionsAccess() {
      return flattenTree(this.sectionsTree);
    },
  },
  async mounted() {
    const response = await CustomLookupsApi.getList({ size: -1 });
    this.customLookupRecords = response.items || [];
  },
  methods: {
    ...mapActions({
      updateAccess(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_APPLICATION_SECTION_ACCESS`, payload);
      },
    }),

    handleAccessChange(sectionNode, isEnabled) {
      this.updateAccess({
        app: this.editedApp,
        section: sectionNode.name,
        value: isEnabled,
      });

      const fullNode = findNodeInTree(this.sectionsTree, sectionNode.name);
      if (fullNode && fullNode.children.length) {
        this.updateChildrenAccess(fullNode.children, isEnabled);
      }
    },

    updateChildrenAccess(children, isParentEnabled) {
      children.forEach(childNode => {
        if (!isParentEnabled) {
          this.storedChildStates[childNode.name] = childNode.enabled;
        }

        const childValue = isParentEnabled
          ? (this.storedChildStates[childNode.name] ?? true)
          : false;

        this.updateAccess({
          app: this.editedApp,
          section: childNode.name,
          value: childValue,
        });
      });
    },

    loadItem() {},
    resetState() {},
  },
};
</script>
<style scoped>

</style>
