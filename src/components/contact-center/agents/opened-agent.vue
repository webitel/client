<template>
  <wt-page-wrapper :actions-panel="false">
    <template slot="header">
      <object-header
        :primary-action="save"
        :primary-disabled="computeDisabled"
        :primary-text="computePrimaryText"
        :hide-primary="!hasSaveActionAccess"
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
import OpenedAgentGeneral from './opened-agent-general.vue';
import OpenedAgentQueues from './opened-agent-queues.vue';
import OpenedAgentSkills from './opened-agent-skills.vue';
import OpenedAgentSubordinates from './subordinates/opened-agent-subordinates.vue';
import OpenedAgentPermissions from './opened-agent-permissions.vue';
import openedObjectMixin from '../../../mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-agent',
  mixins: [openedObjectMixin],
  components: {
    OpenedAgentGeneral,
    OpenedAgentQueues,
    OpenedAgentSkills,
    OpenedAgentSubordinates,
    OpenedAgentPermissions,
  },

  data: () => ({
    namespace: 'ccenter/agents',
  }),

  validations: {
    itemInstance: {
      user: { required },
      progressiveCount: { required },
      chatCount: { required },
    },
  },

  computed: {
    ...mapState('ccenter/agents', {
      id: (state) => state.itemId,
      itemInstance: (state) => state.itemInstance,
      isSupervisor: (state) => state.itemInstance.isSupervisor,
    }),

    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'general',
      }, {
        text: this.$tc('objects.lookups.skills.skills', 2),
        value: 'skills',
      }, {
        text: this.$tc('objects.ccenter.queues.queues', 2),
        value: 'queues',
      }];

      const subordinates = {
        text: this.$tc('objects.ccenter.agents.agents', 2),
        value: 'subordinates',
      };

      const permissions = {
        text: this.$tc('objects.permissions.permissions', 2),
        value: 'permissions',
      };

      if (this.isSupervisor) tabs.push(subordinates);
      if (this.id) tabs.push(permissions);
      return tabs;
    },

    path() {
      const baseUrl = '/contact-center/agents';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        { name: this.$tc('objects.ccenter.agents.agents', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
  methods: {
    // overrides headlineNavMixin method
    setPathName() {
      this.pathName = this.itemInstance.user.name;
    },
  },
};
</script>


<style lang="scss" scoped>
</style>
