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
import { CrmSections } from '@webitel/ui-sdk/src/enums/index';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';

import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';
import CustomLookupsApi from '../../api/custom-lookups';
import { findNodeInTree } from '../../utils/findNodeInTree';

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

    sectionsTree() {
      const tree = [];
      const appAccess = this.access[this.editedApp];
      if (!appAccess || !this.sectionInfoMap.size) return tree;

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

      const parentConfigNode = this.sectionInfoMap.get(CrmSections.CrmConfiguration);
      const isParentEnabled = parentConfigNode ? parentConfigNode.enabled : false;

      displayOrder.forEach(sectionName => {
        const info = this.sectionInfoMap.get(sectionName);
        if (info) {
          const node = {
            ...info,
            disabled: false,
            children: [],
          };

          const childrenNames = fullHierarchy[sectionName];
          if (childrenNames) {
            node.children = childrenNames.map(childName => {
              const childInfo = this.sectionInfoMap.get(childName);
              if (!childInfo) return null;
              return {
                ...childInfo,
                disabled: !isParentEnabled,
                children: [],
              };
            }).filter(Boolean);
          }
          tree.push(node);
        }
      });
      return tree;
    },

    appSectionsAccess() {
      const flatten = (nodes) => {
        let flatList = [];
        for (const node of nodes) {
          const { children, ...nodeWithoutChildren } = node;
          flatList.push(nodeWithoutChildren);
          if (children && children.length) {
            flatList = flatList.concat(flatten(children));
          }
        }
        return flatList;
      };
      return flatten(this.sectionsTree);
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
