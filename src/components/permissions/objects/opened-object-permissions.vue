<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <wt-headline>
        <template slot="title">
          {{ $t('objects.permissions.object.operations') }} |
          {{ computeTitle }}
        </template>
        <template slot="actions">
          <wt-button color="secondary" @click="close">
            {{ $t('objects.close') }}
          </wt-button>
        </template>
      </wt-headline>
    </template>

    <template slot="main">
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="$options.name + '-' + currentTab.value"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import openedObjectPermissionsObac from './obac/opened-object-permissions-obac.vue';
import openedObjectPermissionsRbac from './rbac/opened-object-permissions-rbac.vue';
import openedObjectMixin from '../../../mixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-object-permissions',
  components: {
    openedObjectPermissionsObac,
    openedObjectPermissionsRbac,
  },
  mixins: [openedObjectMixin],
  data: () => ({
    namespace: 'permissions/objects',
  }),

  computed: {
    ...mapState('permissions/objects', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),
    tabs() {
      const tabs = [{
        text: this.$t('objects.permissions.object.ObAC'),
        value: 'obac',
      }, {
        text: this.$t('objects.permissions.object.RbAC'),
        value: 'rbac',
      }];
      return tabs;
    },

    path() {
      const baseUrl = '/permissions/objects';
      return [
        { name: this.$t('objects.permissions.permissions') },
        { name: this.$t('objects.permissions.object.object'), route: baseUrl },
        {
          name: this.pathName,
          route: `${baseUrl}/${this.id}`,
        },
      ];
    },
  },

  methods: {
    ...mapActions('permissions/objects', {
      setId: 'SET_ITEM_ID',
      loadItem: 'LOAD_ITEM',
      resetState: 'RESET_ITEM_STATE',
    }),
  },
  // override headlineNavMixin
  setPathName() {
    this.pathName = this.itemInstance.class;
  },
};
</script>

<style lang="scss" scoped>

</style>
