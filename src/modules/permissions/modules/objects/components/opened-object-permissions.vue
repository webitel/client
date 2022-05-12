<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :secondary-action="close"
        hide-primary
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>

    <template v-slot:main>
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import Obac from '../modules/obac/components/opened-object-permissions-obac.vue';
import Rbac from '../modules/rbac/components/opened-object-permissions-rbac.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-object-permissions',
  components: { Obac, Rbac },
  mixins: [openedObjectMixin],
  data: () => ({
    namespace: 'permissions/objects',
  }),

  computed: {
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
    // override headlineNavMixin
    setPathName() {
      this.pathName = this.itemInstance.class;
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
