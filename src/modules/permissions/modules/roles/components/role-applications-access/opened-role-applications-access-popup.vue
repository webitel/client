<template>
  <wt-popup min-width="480" @close="close">
    <template slot="title">
      {{ $tc('objects.permissions.roles.applicationsAccess.applicationsAccess', 1) }}:
      {{ $t(`WebitelApplications.${editedApp}.name`) }}
    </template>
    <template v-slot:main>
      <form>
        <wt-checkbox
          v-for="(sec, key) of appSectionsAccess"
          :selected="sec.enabled"
          :value="true"
          :key="key"
          :label="sec.displayName"
          @change="updateAccess({ app: editedApp, section: sec.name, value: $event })"
        ></wt-checkbox>
      </form>
    </template>
    <template slot="actions">
      <wt-button
        @click="close"
      >{{ $t('objects.ok') }}
      </wt-button>
      <wt-button
        color="secondary"
        @click="close"
      >{{ $t('objects.close') }}
      </wt-button>
    </template>
  </wt-popup>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import nestedObjectMixin from '../../../../../../app/mixins/objectPagesMixins/openedObjectMixin/nestedObjectMixin';

export default {
  name: 'opened-role-permissions-popup',
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
