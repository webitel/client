<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.queues.params') }}</h3>
    </header>
    <form class="object-input-grid">
      <wt-switcher
        v-if="specificControls['taskProcessing.enabled']"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.enabled')"
        :value="itemInstance.taskProcessing.enabled"
        @change="setItemProcessingProp({ prop: 'enabled', value: $event })"
      ></wt-switcher>

      <!--      v-if-->
      <wt-select
        v-if="specificControls['taskProcessing.formSchema']"
        :disabled="disableUserInput || !itemInstance.taskProcessing.enabled"
        :label="$t('objects.ccenter.queues.processing.formSchema')"
        :search-method="loadDropdownOptionsSchemaList"
        :value="itemInstance.taskProcessing.formSchema"
        @input="setItemProcessingProp({ prop: 'formSchema', value: $event })"
      ></wt-select>
      <wt-input
        v-if="specificControls['taskProcessing.sec']"
        v-show="itemInstance.taskProcessing.enabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.sec')"
        :value="itemInstance.taskProcessing.sec"
        type="number"
        @input="setItemProcessingProp({ prop: 'sec', value: +$event })"
      ></wt-input>
      <wt-input
        v-if="specificControls['taskProcessing.processingRenewalSec']"
        v-show="itemInstance.taskProcessing.enabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.processingRenewalSec')"
        :value="itemInstance.taskProcessing.processingRenewalSec"
        type="number"
        @input="setItemProcessingProp({ prop: 'processingRenewalSec', value: +$event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';

export default {
  name: 'opened-queue-processing',
  mixins: [openedTabComponentMixin],
  computed: {
    specificControls() {
      return QueueTypeProperties[this.itemInstance.type].controls
      .reduce((controls, control) => ({
        ...controls,
        [control]: true,
      }), {});
    },
  },
  methods: {
    ...mapActions({
      setItemProcessingProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROCESSING_PROPERTY`, payload);
      },
    }),
    loadDropdownOptionsSchemaList(params) {
      return FlowsAPI.getLookup(params);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
