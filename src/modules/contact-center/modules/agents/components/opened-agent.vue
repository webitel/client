<template>
  <wt-page-wrapper :actions-panel="false">
    <template v-slot:header>
      <object-header
        :hide-primary="!hasSaveActionAccess"
        :primary-action="save"
        :primary-disabled="computeDisabled"
        :primary-text="computePrimaryText"
        :secondary-action="close"
      >
        <headline-nav :path="path"></headline-nav>
      </object-header>
    </template>
    <template v-slot:main>
      <div class="main-container">
        <wt-tabs
          v-model="currentTab"
          :tabs="tabs"
        ></wt-tabs>
        <component
          :is="currentTab.value"
          :namespace="namespace"
          :v="$v"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import Queues from '../modules/queues/components/opened-agent-queues.vue';
import Skills from '../modules/skills/components/opened-agent-skills.vue';
import Subordinates from '../modules/subordinates/components/opened-agent-subordinates.vue';
import General from './opened-agent-general.vue';

export default {
  name: 'opened-agent',
  mixins: [openedObjectMixin],
  components: {
    General,
    Queues,
    Skills,
    Subordinates,
  },

  data: () => ({
    namespace: 'ccenter/agents',
  }),

  validations: {
    itemInstance: {
      user: { required },
      team: { required },
      progressiveCount: { required },
      chatCount: { required },
    },
  },

  computed: {
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'general',
        }, {
          text: this.$tc('objects.lookups.skills.skills', 2),
          value: 'skills',
        }, {
          text: this.$tc('objects.ccenter.queues.queues', 2),
          value: 'queues',
        },
      ];

      const subordinates = {
        text: this.$tc('objects.ccenter.agents.agents', 2),
        value: 'subordinates',
      };

      if (this.itemInstance.isSupervisor) tabs.push(subordinates);
      if (this.id) tabs.push(this.permissionsTab);
      return tabs;
    },

    path() {
      const baseUrl = '/contact-center/agents';
      return [
        { name: this.$t('objects.ccenter.ccenter') },
        {
          name: this.$tc('objects.ccenter.agents.agents', 2),
          route: baseUrl,
        },
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
