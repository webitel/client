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
import { required } from 'vuelidate/lib/validators';
import { mapState } from 'vuex';
import OpenedAgentGeneral from './opened-agent-general.vue';
import OpenedAgentTeams from './opened-agent-teams.vue';
import OpenedAgentQueues from './opened-agent-queues.vue';
import OpenedAgentSkills from './opened-agent-skills.vue';
import OpenedAgentPermissions from './opened-agent-permissions.vue';
import openedObjectMixin from '../../../mixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-agent',
  mixins: [openedObjectMixin],
  components: {
    OpenedAgentGeneral,
    OpenedAgentTeams,
    OpenedAgentQueues,
    OpenedAgentSkills,
    OpenedAgentPermissions,
  },

  data: () => ({
    namespace: 'ccenter/agents',
  }),

  validations: {
    itemInstance: {
      user: { required },
    },
  },

  computed: {
    ...mapState('ccenter/agents', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
    }),

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$tc('objects.ccenter.skills.skills', 2),
        value: 'skills',
      }, {
        text: this.$tc('objects.ccenter.teams.teams', 2),
        value: 'teams',
      }, {
        text: this.$tc('objects.ccenter.queues.queues', 2),
        value: 'queues',
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
        { name: this.$tc('objects.ccenter.agents.agents', 2), route: '/contact-center/agents' },
        {
          name: this.id ? this.itemInstance.user.name : this.$t('objects.new'),
          route: this.id ? `/contact-center/agents/${this.id}` : '/contact-center/agents/new',
        },
      ];
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
