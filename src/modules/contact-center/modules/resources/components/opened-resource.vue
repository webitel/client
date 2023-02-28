<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
      :primary-action="save"
      :primary-disabled="disabledSave"
      :hide-primary="!hasSaveActionAccess"
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
          :v="v$"
          :namespace="namespace"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, minValue, maxValue } from '@vuelidate/validators';
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

  setup: () => ({
    v$: useVuelidate(),
  }),
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
