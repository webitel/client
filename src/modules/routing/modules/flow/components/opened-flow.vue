<template>
  <diagram
    v-if="isDiagram"
    :namespace="namespace"
    @save="saveDiagram"
    @close="close"
  ></diagram>
  <wt-page-wrapper v-else :actions-panel="false">
    <template v-slot:header>
      <object-header
        :primary-text="computePrimaryText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="computeDisabled"
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
          :v="$v"
          :namespace="namespace"
        ></component>
      </div>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import Diagram from './opened-flow-diagram.vue';
import JsonSchema from './opened-flow-code.vue';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';

export default {
  name: 'opened-flow',
  mixins: [openedObjectMixin],
  components: {
    Diagram,
    JsonSchema,
  },
  data: () => ({
    namespace: 'routing/flow',
  }),

  // by vuelidate
  validations: {
    itemInstance: {
      name: { required },
      schema: { required },
    },
  },

  computed: {
    isDiagram() {
      return this.$route.hash === '#diagram';
    },
    tabs() {
      const tabs = [{
        text: this.$t('objects.general'),
        value: 'json-schema',
      }];
      return tabs;
    },

    path() {
      const baseUrl = '/routing/flow';
      return [
        { name: this.$t('objects.routing.routing') },
        { name: this.$tc('objects.routing.flow.flow', 2), route: baseUrl },
        {
          name: this.id ? this.pathName : this.$t('objects.new'),
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
  methods: {
    async saveDiagram(callback) {
      await this.save();
      callback();
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
