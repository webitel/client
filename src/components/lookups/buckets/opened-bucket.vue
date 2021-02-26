<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-action="save"
        :primary-disabled="computeDisabled"
        :hide-primary="!hasSaveActionAccess"
        :primary-text="computePrimaryText"
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
import OpenedBucketPermissions from './opened-bucket-permissions.vue';
import OpenedBucketGeneral from './opened-bucket-general.vue';
import openedObjectMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-bucket',
  mixins: [openedObjectMixin],
  components: { OpenedBucketGeneral, OpenedBucketPermissions },
  data: () => ({
    namespace: 'lookups/buckets',
  }),

  validations: {
    itemInstance: {
      name: { required },
    },
  },

  computed: {
    ...mapState('lookups/buckets', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.id) tabs.push(permissions);
      return tabs;
    },

    path() {
      const baseUrl = '/lookups/buckets';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.lookups.buckets.buckets', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
