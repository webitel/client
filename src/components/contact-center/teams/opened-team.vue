<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
    <object-header
      :primary-action="save"
      :primary-disabled="computeDisabled"
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
        >
        </wt-tabs>
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
import { numeric, required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import OpenedTeamGeneral from './opened-team-general.vue';
import OpenedTeamSupervisors from './opened-team-supervisors.vue';
import OpenedTeamAgents from './opened-team-agents.vue';
import OpenedTeamSkills from './opened-team-skills.vue';
import OpenedTeamTiming from './opened-team-timing.vue';
import OpenedTeamPermissions from './opened-team-permissions.vue';
import openedObjectMixin from '../../../mixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-team',
  mixins: [openedObjectMixin],
  components: {
    OpenedTeamGeneral,
    OpenedTeamSupervisors,
    OpenedTeamAgents,
    OpenedTeamSkills,
    OpenedTeamTiming,
    OpenedTeamPermissions,
  },

  data: () => ({
    namespace: 'ccenter/teams',
  }),

  validations: {
    itemInstance: {
      name: { required },
      strategy: { required },
      maxNoAnswer: { numeric, required },
      wrapUpTime: { numeric, required },
      noAnswerDelayTime: { numeric, required },
      callTimeout: { numeric, required },
    },
  },
  computed: {
    ...mapState('ccenter/teams', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$t('objects.ccenter.teams.timing'),
        value: 'timing',
      }, {
        text: this.$tc('objects.ccenter.teams.supervisors', 2),
        value: 'supervisors',
      }, {
        text: this.$tc('objects.ccenter.agents.agents', 2),
        value: 'agents',
      }, {
        text: this.$tc('objects.ccenter.skills.skills', 2),
        value: 'skills',
      }];

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.id) tabs.push(permissions);
      return tabs;
    },

    path() {
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.teams.teams', 2), route: '/contact-center/teams' },
        {
          name: this.id ? this.itemInstance.name : this.$t('objects.new'),
          route: this.id ? `/contact-center/teams/${this.id}` : '/contact-center/teams/new',
        },
      ];
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
