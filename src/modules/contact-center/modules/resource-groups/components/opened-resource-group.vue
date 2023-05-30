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
import { helpers, required } from '@vuelidate/validators';
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

  setup: () => ({
    v$: useVuelidate(),
  }),
  // by vuelidate
  validations: {
    itemInstance: {
      name: { required },
      communication: { required },
      time: {
        requiredArrayValue,
        timerangeNotIntersect,
        $each: helpers.forEach({
          timerangeStartLessThanEnd,
        }),
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
