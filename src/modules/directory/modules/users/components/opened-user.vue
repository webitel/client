<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-action="save"
        :primary-text="computePrimaryText"
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
import { mapActions, mapState } from 'vuex';
import { required, requiredUnless } from 'vuelidate/lib/validators';
import General from './opened-user-general.vue';
import Roles from './opened-user-roles.vue';
import License from './opened-user-license.vue';
import Devices from './opened-user-devices.vue';
import Variables from './opened-user-variables.vue';
import Tokens from '../modules/tokens/components/opened-user-token.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-user',
  mixins: [openedObjectMixin],
  components: {
    General,
    Roles,
    License,
    Devices,
    Variables,
    Tokens,
  },
  data: () => ({
    namespace: 'directory/users',
  }),

  validations: {
    itemInstance: {
      username: { required },
      password: {
        required: requiredUnless('id'),
      },
      variables: {
        $each: {
          key: { required },
          value: { required },
        },
      },
    },
  },

  computed: {
    path() {
      const baseUrl = '/directory/users';
      return [
        { name: this.$t('objects.directory.directory') },
        { name: this.$tc('objects.directory.users.users', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      },
        {
          text: this.$t('objects.directory.users.roles'),
          value: 'roles',
        },
        {
          text: this.$t('objects.directory.users.license'),
          value: 'license',
        },
        {
          text: this.$t('objects.directory.users.devices'),
          value: 'devices',
        },
        {
          text: this.$t('objects.directory.users.variables'),
          value: 'variables',
        },
        {
          text: this.$t('objects.directory.users.tokens'),
          value: 'tokens',
        }];

      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
