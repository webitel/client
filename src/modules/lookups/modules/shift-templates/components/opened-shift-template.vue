<template>
  <wt-page-wrapper :actions-panel="false">
    <template #header>
      <wt-page-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="close"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
    </template>
    <template #main>
      <form
        class="main-container"
        @submit.prevent="save"
      >
        <wt-tabs
          :current="currentTab"
          :tabs="tabs"
          @change="changeTab"
        />
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="v$"
        />
        <input
          hidden
          type="submit"
        > <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { useVuelidate } from '@vuelidate/core';
import { required, maxLength, helpers, minValue, maxValue } from '@vuelidate/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import { requiredArrayValue, timerangeStartLessThanEnd } from '../../../../../app/utils/validators.js';
import General from './opened-shift-template-general.vue';
import Template from './opened-shift-template-template.vue';
import ShiftTemplatesRouteNames from '../router/_internals/ShiftTemplatesRouteName.enum.js';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';

export default {
  name: 'OpenedShiftTemplate',
  components: { General, Template },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'lookups/shiftTemplates',
    routeName: RouteNames.SHIFT_TEMPLATES,
  }),
  validations: {
    itemInstance: {
      name: { required, maxLength: maxLength(250) },
      times: {
        requiredArrayValue,
        $each: helpers.forEach({
          timerangeStartLessThanEnd,
          start: {
            required,
            minValue: minValue(0),
            maxValue: maxValue(1440),
          },
          end: {
            required,
            minValue: minValue(0),
            maxValue: maxValue(1440),
          },
        }),
      }
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: ShiftTemplatesRouteNames.GENERAL
        },
        {
          text: this.$tc('objects.routing.chatGateways.templates.templates', 1),
          value: 'template',
          pathName: ShiftTemplatesRouteNames.TEMPLATE
        },
      ];
      return tabs;
    },

    path() {
      const baseUrl = '/lookups/shift-templates';
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$tc('objects.lookups.shiftTemplates.shiftTemplates', 2),
          route: baseUrl,
        },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: {
            name: this.currentTab.pathName,
            query: this.$route.query,
          },
        },
      ];
    },
  },
};
</script>

<style scoped>

</style>
