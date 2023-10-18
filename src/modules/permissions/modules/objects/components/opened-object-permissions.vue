<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <wt-page-header
        :secondary-action="close"
        hide-primary
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </wt-page-header>
    </template>

    <template v-slot:main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :namespace="namespace"
        ></component>
        <input hidden type="submit"> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Obac from '../modules/obac/components/opened-object-permissions-obac.vue';
import Rbac from '../modules/rbac/components/opened-object-permissions-rbac.vue';

export default {
  name: 'opened-object-permissions',
  components: { Obac, Rbac },
  mixins: [openedObjectMixin],
  data: () => ({
    namespace: 'permissions/objects',
  }),

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.permissions.object.ObAC'),
          value: 'obac',
        }, {
          text: this.$t('objects.permissions.object.RbAC'),
          value: 'rbac',
        },
      ];
      return tabs;
    },

    path() {
      const baseUrl = '/permissions/objects';
      return [
        { name: this.$t('objects.permissions.permissions') },
        { name: this.$t('objects.permissions.object.object'), route: baseUrl },
        { name: this.pathName, route: `${baseUrl}/${this.id}` },
      ];
    },
  },

  methods: {
    // override headlineNavMixin
    setPathName() {
      this.pathName = this.itemInstance.class;
    },
  },
  mounted() {
    // override headlineNavMixin
    const unwatch = this.$watch('itemInstance.class', () => {
      this.setPathName();
      unwatch();
    });
  },
};
</script>

<style lang="scss" scoped>

</style>
