<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :secondary-action="close"
        hide-primary
      >
        <wt-breadcrumb :path="path" />
      </wt-page-header>
    </template>

    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import Obac from '../modules/obac/components/opened-object-permissions-obac.vue';
import Rbac from '../modules/rbac/components/opened-object-permissions-rbac.vue';
import ObjectsRouteNames from "../router/_internals/ObjectsRouteNames.enum.js";

export default {
  name: 'OpenedObjectPermissions',
  components: { Obac, Rbac },
  mixins: [openedObjectMixin],
  setup: () => {
    const { hasSaveActionAccess } = useUserAccessControl();
    return {
      hasSaveActionAccess,
    };
  },
  data: () => ({
    namespace: 'permissions/objects',
    routeName: RouteNames.OBJECTS,
  }),

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.permissions.object.ObAC'),
          value: 'obac',
          pathName: ObjectsRouteNames.OBAC,
        }, {
          text: this.$t('objects.permissions.object.RbAC'),
          value: 'rbac',
          pathName: ObjectsRouteNames.RBAC,
        },
      ];
      return tabs;
    },

    path() {
      const baseUrl = '/permissions/objects';
      return [
        {
          name: this.$t('objects.permissions.permissions'),
        },
        {
          name: this.$t('objects.permissions.object.object'),
          route: baseUrl,
        },
        {
          name: this.pathName,
          route: {
            name: this.currentTab.pathName,
            query: this.$route.query,
          },
        },
      ];
    },
  },
  mounted() {
    // override breadcrumbMixin
    const unwatch = this.$watch('itemInstance.class', () => {
      this.setPathName();
      unwatch();
    });
  },

  methods: {
    // override breadcrumbMixin
    setPathName() {
      this.pathName = this.itemInstance.class;
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
