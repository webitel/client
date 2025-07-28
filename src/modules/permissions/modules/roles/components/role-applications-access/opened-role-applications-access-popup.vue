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

    editedApp() {
      return this.$route.params.applicationName;
    },

    appAccessTree() {
      const tree = this.access[this.editedApp] || {};
      if (
        this.editedApp === WtApplication.Crm &&
        tree.children &&
        tree.children[CrmSections.Configuration]
      ) {
        const configNode = tree.children[CrmSections.Configuration];
        if (!configNode.children) configNode.children = {};
        // Add custom lookups as children if not already present
        this.customLookupRecords.forEach(record => {
          if (!configNode.children[record.id]) {
            configNode.children[record.id] = {
              _enabled: false,
              _locale: undefined,
              displayName: record.name,
            };
          }
        });
      }
      return tree;
    },

    // Flattens the access tree into an array for rendering, preserving parent/child relationships
    appSectionsAccess() {
      const flatten = (node, parentEnabled = true, path = []) => {
        if (!node) return [];
        const { _enabled, _locale, children, displayName } = node;
        const name = path.length === 0 ? this.editedApp : path[path.length - 1];
        const sectionDisplayName = _locale ? this.$t(_locale) : (displayName || name);
        const sectionNode = {
          name,
          displayName: sectionDisplayName,
          enabled: !!_enabled,
          disabled: !parentEnabled,
          path: [...path],
        };
        let result = [];
        if (path.length > 0) {
          result.push(sectionNode);
        }
        if (children) {
          for (const childName in children) {
            result = result.concat(flatten(children[childName], sectionNode.enabled && parentEnabled, [...path, 'children', childName]));
          }
        }
        return result;
      };

      return flatten(this.appAccessTree, true, [this.editedApp]);
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

    // Recursively disable all children in the local access tree
    disableAllChildren(node, path = []) {
      if (!node || !node.children) return;
      console.log(node);
      for (const childName in node.children) {
        node.children[childName]._enabled = false;
        // Update the store for each child
        this.updateAccess([...path, 'children', childName], false);
        this.disableAllChildren(node.children[childName], [...path, 'children', childName]);
      }
    },

    // Handles the checkbox change event. Updates the section's access
    // and cascades the change to its children if it's a parent node.
    handleAccessChange(sectionNode, isEnabled) {
      this.updateAccess(sectionNode.path, isEnabled);
      this.updateChildrenAccess(sectionNode, isEnabled);
    },

    updateAccess(path, value) {
      this.updateAccessAction({
        app: this.editedApp,
        section: path[path.length - 1],
        value,
        path,
      });

      if (!value) {
        const findNodeByPath = (node, path, idx = 0) => {
          if (!node || idx >= path.length) return node;
          return findNodeByPath(node[path[idx]], path, idx + 1);
        };
        const appTree = this.appAccessTree;
        const node = findNodeByPath(appTree, path.slice(1));
        this.disableAllChildren(node, path);
      }
    },

    updateChildrenAccess(sectionNode, isParentEnabled) {
      // Find the node in the access tree by path
      const findNodeByPath = (node, path, idx = 0) => {
        if (!node || idx >= path.length) return node;
        return findNodeByPath(node[path[idx]], path, idx + 1);
      };
      const appTree = this.appAccessTree;
      const node = findNodeByPath(appTree, sectionNode.path);
      if (node && node.children) {
        for (const childName in node.children) {
          const childPath = [...sectionNode.path, 'children', childName];
          this.updateAccess(childPath, isParentEnabled);
          // Recursively update grandchildren
          this.updateChildrenAccess({
            name: childName,
            path: childPath,
          }, isParentEnabled);
        }
      }
    },
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
