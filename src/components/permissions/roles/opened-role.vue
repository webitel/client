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
          :is="`${$options.name}-${currentTab.value}`"
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import OpenedRoleGeneral from './opened-role-general.vue';
import openedObjectMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-role',
  mixins: [openedObjectMixin],
  components: { OpenedRoleGeneral },
  data: () => ({
    namespace: 'permissions/roles',
  }),

  validations: {
    itemInstance: {
      name: { required },
    },
  },

  computed: {
    ...mapState('permissions/roles', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
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
