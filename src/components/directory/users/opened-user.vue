<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <wt-headline>
        <template slot="title">
          {{ $tc('objects.directory.users.users', 1) }} |
          {{ computeTitle }}
        </template>
        <template slot="actions">
          <wt-button :disabled="computeDisabled" @click="save">
            {{ computePrimaryText || $t('objects.addNew') }}
          </wt-button>
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
        >
        </wt-tabs>
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
import editComponentMixin from '../../../mixins/editComponentMixin';

export default {
  name: 'opened-user',
  mixins: [editComponentMixin],
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
      this.resetState();
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
