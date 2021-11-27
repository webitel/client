<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-text="computePrimaryText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="computeDisabled"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template slot="main">
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import General from './opened-role-general.vue';
import Permissions from './role-permissions/opened-role-permissions.vue';
import ApplicationsAccess from './role-applications-access/opened-role-applications-access.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-role',
  mixins: [openedObjectMixin],
  components: { General, Permissions, ApplicationsAccess },
  data: () => ({
    namespace: 'permissions/roles',
  }),

  validations: {
    itemInstance: {
      name: { required },
    },
  },

  computed: {
    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$tc('objects.permissions.roles.permissions.permissions', 2),
        value: 'permissions',
      }, {
        text: this.$tc('objects.permissions.roles.applicationsAccess.applicationsAccess', 2),
        value: 'applications-access',
      }];
      return tabs;
    },
    path() {
      const baseUrl = '/permissions/roles';
      return [
        { name: this.$t('objects.permissions.permissions') },
        { name: this.$tc('objects.permissions.permissionsRole', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>

</style>
