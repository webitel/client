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
            :is="$options.name + '-' + currentTab.value"
            :v="$v"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { required, requiredUnless } from 'vuelidate/lib/validators';
import OpenedUserGeneral from './opened-user-general.vue';
import OpenedUserRoles from './opened-user-roles.vue';
import OpenedUserLicense from './opened-user-license.vue';
import OpenedUserDevices from './opened-user-devices.vue';
import OpenedUserVariables from './opened-user-variables.vue';
import OpenedUserTokens from './opened-user-token.vue';
import OpenedUserPermissions from './opened-user-permissions.vue';
import editComponentMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/editComponentMixin';
import headlineNavMixin from '../../../mixins/baseMixins/headlineNavMixin/headlineNavMixin';

export default {
  name: 'opened-user',
  mixins: [editComponentMixin, headlineNavMixin],
  components: {
    OpenedUserGeneral,
    OpenedUserRoles,
    OpenedUserLicense,
    OpenedUserDevices,
    OpenedUserVariables,
    OpenedUserTokens,
    OpenedUserPermissions,
  },
  data() {
    return {
      currentTab: {
        value: 'general',
      },
    };
  },

  validations: {
    itemInstance: {
      username: {
        required,
      },
      password: {
        required: requiredUnless('id'),
      },
    },
  },

  mounted() {
    this.setId(this.$route.params.id);
    this.loadItem();
  },

  computed: {
    ...mapState('directory/users', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),

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

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.id) tabs.push(permissions);
      return tabs;
    },
  },

  methods: {
    ...mapActions('directory/users', {
      setId: 'SET_ITEM_ID',
      loadItem: 'LOAD_ITEM',
      addItem: 'ADD_ITEM',
      updateItem: 'UPDATE_ITEM',
      resetState: 'RESET_ITEM_STATE',
    }),

    close() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
