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
import { required, minValue, maxValue } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import General from './opened-resource-general.vue';
import Numbers from '../modules/display/components/opened-resource-numbers.vue';
import Failure from './opened-resource-failure.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-resource',
  mixins: [openedObjectMixin],
  components: {
    General,
    Numbers,
    Failure,
  },

  data: () => ({
    namespace: 'ccenter/res',
  }),

  // by vuelidate
  validations: {
    itemInstance: {
      name: { required },
      gateway: { required },
      cps: {
        required,
        minValue: minValue(-1),
        maxValue: maxValue(1000),
      },
      limit: {
        required,
        minValue: minValue(-1),
        maxValue: maxValue(1000),
      },
      maxErrors: { required },
      // numberList: {
      //     requiredArrayValue
      // }
    },
  },

  computed: {
    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$tc('objects.ccenter.res.numbers', 2),
        value: 'numbers',
      }, {
        text: this.$t('objects.ccenter.res.failure'),
        value: 'failure',
      }];

      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/contact-center/resources';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.res.res', 2), route: baseUrl },
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
