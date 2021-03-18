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
import { requiredArrayValue, timerangeNotIntersect, timerangeStartLessThanEnd } from '../../../../../app/utils/validators';
import General from './opened-resource-group-general.vue';
import Resources from '../modules/resources/components/opened-resource-group-resources.vue';
import Timerange from './opened-resource-group-timerange.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-resource-group',
  mixins: [openedObjectMixin],
  components: {
    General,
    Resources,
    Timerange,
  },
  data: () => ({
    namespace: 'ccenter/resGroups',
  }),

  // by vuelidate
  validations: {
    itemInstance: {
      name: { required },
      communication: { required },
      time: {
        requiredArrayValue,
        timerangeNotIntersect,
        $each: {
          timerangeStartLessThanEnd,
        },
      },
    },
  },
  computed: {
    tabs() {
      const tabs = [
        { text: this.$t('objects.general'), value: 'general' },
        { value: 'resources', text: this.$tc('objects.ccenter.res.res', 2) },
        { value: 'timerange', text: this.$t('objects.ccenter.resGroups.timerange') },
      ];
      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/contact-center/resource-groups';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.resGroups.resGroups', 2), route: baseUrl },
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
