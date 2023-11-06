<template>
  <diagram
    v-if="isDiagram"
    :namespace="namespace"
    @close="close"
    @save="saveDiagram"
  />
  <wt-page-wrapper
    v-else
    :actions-panel="false"
  >
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
          v-model="currentTab"
          :tabs="tabs"
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
import { required } from '@vuelidate/validators';
import { mapActions } from 'vuex';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import JsonSchema from '../modules/code/components/opened-flow-code.vue';
import Diagram from '../modules/diagram/components/opened-flow-diagram.vue';

export default {
  name: 'OpenedFlow',
  components: {
    Diagram,
    JsonSchema,
  },
  mixins: [openedObjectMixin],

  setup: () => ({
    v$: useVuelidate(),
  }),
  data: () => ({
    namespace: 'routing/flow',
  }),
  validations: {
    itemInstance: {
      name: { required },
      schema: { required },
    },
  },

  computed: {
    isDiagram() {
      return this.$route.query.editor === 'diagram' || this.itemInstance.editor;
    },
    type() {
      return this.$route.query.type || this.itemInstance.type;
    },
    tabs() {
      const tabs = [
        {
          text: this.$t('objects.general'),
          value: 'json-schema',
        },
      ];
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
    async saveDiagram({ resolve, reject }) {
      try {
        await this.save();
        resolve();
      } catch (err) {
        reject(err);
      }
    },
    initType() {
      if (!this.itemInstance.type && this.type) this.setItemProp({ prop: 'type', value: this.type });
    },
  },
  mounted() {
    this.initType();
  },
};
</script>

<style lang="scss" scoped>
</style>
