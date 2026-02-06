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
import { minValue, required } from '@vuelidate/validators';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import RouteNames from "../../../../../app/router/_internals/RouteNames.enum.js";
import Queues from '../modules/queues/components/opened-agent-queues.vue';
import Skills from '../modules/skills/components/opened-agent-skills.vue';
import Subordinates from '../modules/subordinates/components/opened-agent-subordinates.vue';
import AgentsRouteNames from "../router/_internals/AgentsRouteNames.enum.js";
import General from './opened-agent-general.vue';

export default {
  name: 'OpenedAgent',
  components: {
    General,
    Queues,
    Skills,
    Subordinates,
  },
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
    namespace: 'ccenter/agents',
    routeName: RouteNames.AGENTS,
    permissionsTabPathName: AgentsRouteNames.PERMISSIONS,
  }),
  validations: {
    itemInstance: {
      user: { required },
      team: { required },
      progressiveCount: {
        required,
        minValue: minValue(1),
      },
      chatCount: {
        required,
        minValue: minValue(1),
      },
      taskCount: {
        required,
        minValue: minValue(1),
      },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
          pathName: AgentsRouteNames.GENERAL,
        }, {
          text: this.$t('objects.lookups.skills.skills', 2),
          value: 'skills',
          pathName: AgentsRouteNames.SKILLS,
        }, {
          text: this.$t('objects.ccenter.queues.queues', 2),
          value: 'queues',
          pathName: AgentsRouteNames.QUEUES,
        },
      ];

      const subordinates = {
        text: this.$t('objects.ccenter.agents.agents', 2),
        value: 'subordinates',
        pathName: AgentsRouteNames.SUBORDINATES,
      };

      if (this.itemInstance.isSupervisor) tabs.push(subordinates);
      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/contact-center/agents';
      return [
        {
          name: this.$t('objects.ccenter.ccenter'),
        },
        {
          name: this.$t('objects.ccenter.agents.agents', 2),
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
  methods: {
    // overrides breadcrumbMixin method
    setPathName() {
      this.pathName = this.itemInstance.user.name;
    },
  },
};
</script>

<style
  lang="scss"
  scoped
></style>
