<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path"></wt-headline-nav>
      </object-header>
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
          :v="$v"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required, requiredIf, requiredUnless } from 'vuelidate/lib/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Tokens from '../modules/tokens/components/opened-user-token.vue';
import Devices from './opened-user-devices.vue';
import General from './opened-user-general.vue';
import License from './opened-user-license.vue';
import Roles from './opened-user-roles.vue';
import Variables from './opened-user-variables.vue';

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
          key: { required: requiredIf('value') },
          value: { required: requiredIf('key') },
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
      const tabs = [
        {
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
        },
      ];

      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
