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
        :primary-action="saveCode"
        :primary-disabled="disabledSave"
        :primary-text="saveText"
        :secondary-action="handleConfirmationUnsavedChangesPopup"
      >
        <wt-headline-nav :path="path" />
      </wt-page-header>
      <confirmation-unsaved-changes-popup
        v-if="isConfirmationUnsavedChangesPopup"
        :name="itemInstance.name"
        @closePage="closePage"
        @closePopup="toggleIsConfirmationUnsavedChangesPopup"
        @save="saveCode"
      ></confirmation-unsaved-changes-popup>
    </template>

    <template #main>
      <wt-save-failed-popup
        v-if="isSaveFailedPopup"
        @download="download"
        @save="saveCode"
        @close-popup="hideSaveFailedPopup"
      />
      <form
        class="main-container"
        @submit.prevent="saveCode"
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
import WtSaveFailedPopup from '@webitel/ui-sdk/src/components/on-demand/wt-save-failed-popup/wt-save-failed-popup.vue';
import saveAsJSON from '@webitel/ui-sdk/src/scripts/saveAsJSON';
import getNamespacedState from '@webitel/ui-sdk/src/store/helpers/getNamespacedState';
import { computed } from 'vue';
import { mapActions, useStore } from 'vuex';
import { useCheckingUnsavedChanges } from '../../../../../app/composables/useCheckingUnsavedChanges';
import openedObjectMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectMixin/openedObjectMixin';
import JsonSchema from '../modules/code/components/opened-flow-code.vue';
import Diagram from '../modules/diagram/components/opened-flow-diagram.vue';
import ConfirmationUnsavedChangesPopup from './confirmation-unsaved-changes-popup.vue';

const namespace = 'routing/flow';
export default {
  name: 'OpenedFlow',
  components: {
    Diagram,
    JsonSchema,
    WtSaveFailedPopup,
    ConfirmationUnsavedChangesPopup,
  },
  mixins: [openedObjectMixin],

  setup() {
    const v$ = useVuelidate();
    const store = useStore();
    const itemInstance = computed(() => getNamespacedState(store.state, namespace).itemInstance);

    const {
      isConfirmationUnsavedChangesPopup,
      displayConfirmationPopup,
      addCheckingUnsavedChanges,
      removeCheckingUnsavedChanges,
      toggleIsConfirmationUnsavedChangesPopup,
    } = useCheckingUnsavedChanges(itemInstance);

    return {
      v$,
      isConfirmationUnsavedChangesPopup,
      displayConfirmationPopup,
      addCheckingUnsavedChanges,
      removeCheckingUnsavedChanges,
      toggleIsConfirmationUnsavedChangesPopup,
    };
  },
  data: () => ({
    namespace,
    isSaveFailedPopup: false,
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
    async saveCode() {
      try {
        await this.save();
        this.hideSaveFailedPopup();
        this.removeCheckingUnsavedChanges();
      } catch (err) {
        // Required to prevent an open popup when the error is related to "already existed name"
        this.isSaveFailedPopup = err.response?.data?.id !== 'store.sql_routing_schema.save.valid.name';
        throw err;
      }
    },
    saveAsJSON,
    download() {
      // _dirty is not needed inside JSON file
      const { _dirty, ...content } = this.itemInstance;
      this.saveAsJSON(content.name, content);
    },
    hideSaveFailedPopup() {
      this.isSaveFailedPopup = false;
    },
    initType() {
      if (!this.itemInstance.type && this.type) this.setItemProp({ prop: 'type', value: this.type });
    },
    closePage() {
      this.removeCheckingUnsavedChanges();
      this.close();
    },
    handleConfirmationUnsavedChangesPopup() {
      this.itemInstance._dirty
        ? this.toggleIsConfirmationUnsavedChangesPopup()
        : this.closePage();
    },
  },
  mounted() {
    this.initType();
    if (!this.isDiagram) {
      this.addCheckingUnsavedChanges();
    } else {

      // [https://webitel.atlassian.net/browse/WTEL-4509]
      // Temporary solution - open in a new browser tab Flow diagram and clear itemInstance

      this.resetState();
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
