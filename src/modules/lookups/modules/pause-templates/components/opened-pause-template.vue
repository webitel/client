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
        <wt-breadcrumb :path="path" />
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
import { helpers, maxLength, minValue, required } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from '../../../../../app/router/_internals/RouteNames.enum.js';
import { requiredArrayValue } from '../../../../../app/utils/validators.js';
import PauseTemplatesRouteNames from '../router/_internals/PauseTemplatesRouteNames.enum.js';
import Causes from './opened-pause-template-causes.vue';
import General from './opened-pause-template-general.vue';

export default {
  name: 'OpenedPauseTemplate',
  components: { General, Causes },
  mixins: [openedObjectMixin],
  setup: () => {
    const v$ = useVuelidate();
    const { hasSaveActionAccess } = useUserAccessControl();
    return {
      v$,
      hasSaveActionAccess,
    };
  },
  data: () => ({
    namespace: 'lookups/pauseTemplates',
    routeName: RouteNames.PAUSE_TEMPLATES,
  }),
  validations: {
    itemInstance: {
      name: { required, maxLength: maxLength(250) },
      causes: {
        requiredArrayValue,
        $each: helpers.forEach({
          duration: {
            required,
            minValue: minValue(1)
          }
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
          pathName: PauseTemplatesRouteNames.GENERAL
        },
        {
          text: this.$t('objects.routing.chatGateways.templates.templates', 1),
          value: 'causes',
          pathName: PauseTemplatesRouteNames.CAUSES
        },
      ];
      return tabs;
    },
    path() {
      const baseUrl = '/lookups/pause-templates';
      return [
        {
          name: this.$t('objects.lookups.lookups'),
        },
        {
          name: this.$t('objects.lookups.pauseTemplates.pauseTemplates', 2),
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

<style scoped></style>
