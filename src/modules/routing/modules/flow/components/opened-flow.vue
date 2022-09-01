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
        :primary-text="saveText"
        :primary-action="save"
        :hide-primary="!hasSaveActionAccess"
        :primary-disabled="disabledSave"
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
          :v="$v"
          :namespace="namespace"
        ></component>
        <input type="submit" hidden> <!--  submit form on Enter  -->
      </form>
    </template>
  </wt-page-wrapper>
</template>

<script>
import { mapActions } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import Diagram from '../modules/diagram/components/opened-flow-diagram.vue';
import JsonSchema from '../modules/code/components/opened-flow-code.vue';
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
      return this.$route.query.editor === 'diagram';
    },
    type() {
      return this.$route.query.type || this.itemInstance.type;
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
          name: this.id
            ? `${this.pathName} (${this.$t(`objects.flow.type.${this.type}`)})`
            : `${this.$t('objects.new')} (${this.$t(`objects.flow.type.${this.type}`)})`,
          route: this.id ? `${baseUrl}/${this.id}` : `${baseUrl}/new`,
        },
      ];
    },
  },
  methods: {
    ...mapActions({
      setItemProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROPERTY`, payload);
      },
    }),
    async saveDiagram(callback) {
      await this.save();
      callback();
    },
    initType() {
      if (this.type) this.setItemProp({ prop: 'type', value: this.type });
    },
  },
  mounted() {
    this.initType();
  },
};
</script>

<style lang="scss" scoped>
</style>
