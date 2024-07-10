<template>
  <wt-popup
    size="sm"
    min-width="480"
    @close="close"
  >
    <template #title>
      {{ $tc('objects.permissions.roles.applicationsAccess.applicationsAccess', 1) }}:
      {{ $t(`WebitelApplications.${editedApp}.name`) }}
    </template>
    <template #main>
      <form>
        <wt-checkbox
          v-for="(sec, key) of appSectionsAccess"
          :key="key"
          :label="sec.displayName"
          :selected="sec.enabled"
          :value="true"
          @change="updateAccess({ app: editedApp, section: sec.name, value: $event })"
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

<script>
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { mapActions, mapState } from 'vuex';
import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'OpenedRolePermissionsPopup',
  mixins: [nestedObjectMixin],
  props: {
    editedApp: {
      type: String,
      required: true,
    },
    namespace: {
      type: String,
      required: true,
    },
  },
  computed: {
    ...mapState({
      access(state) {
        return getNamespacedState(state, this.namespace).itemInstance.metadata.access;
      },
    }),
    appSectionsAccess() {
      return Object.keys(this.access[this.editedApp])
        .filter((section) => section.slice(0, 1) !== '_') // "functional" properties start with _
        .map((section) => ({
          name: section,
          displayName: this.$t(this.access[this.editedApp][section]._locale),
          enabled: this.access[this.editedApp][section]._enabled,
        }));
    },
  },
  methods: {
    ...mapActions({
      updateAccess(dispatch, payload) {
        return dispatch(`${this.namespace}/UPDATE_APPLICATION_SECTION_ACCESS`, payload);
      },
    }),
    loadItem() {},
    resetState() {},
  },
};
</script>

<style scoped>

</style>
