<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.ccenter.queues.processing.processing') }}
      </h3>
    </header>
    <div class="object-input-area-grid">
      <wt-switcher
        v-if="specificControls['taskProcessing.enabled']"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.enabled')"
        :model-value="itemInstance.taskProcessing.enabled"
        class="object-input-area-grid__processing-enabled"
        @update:model-value="setItemProcessingProp({ prop: 'enabled', value: $event })"
      />

      <wt-select
        v-if="specificControls['taskProcessing.formSchema']"
        :disabled="disableUserInput || !isProcessingEnabled"
        :label="$t('objects.ccenter.queues.processing.formSchema')"
        :search-method="loadDropdownOptionsSchemaList"
        :value="itemInstance.taskProcessing.formSchema"
        class="object-input-area-grid__form-schema"
        @input="setItemProcessingProp({ prop: 'formSchema', value: $event })"
      />

      <wt-input-number
        v-if="specificControls['taskProcessing.sec']"
        v-show="isProcessingEnabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.sec')"
        :model-value="itemInstance.taskProcessing.sec"
        class="object-input-area-grid__processing-sec"
        @update:model-value="setItemProcessingProp({ prop: 'sec', value: +$event })"
      />

      <wt-switcher
        v-if="specificControls['taskProcessing.prolongationOptions.enabled']"
        v-show="isProcessingEnabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.allowProlongation')"
        :model-value="itemInstance.taskProcessing.prolongationOptions.enabled"
        class="object-input-area-grid__processing-allow-prolongation"
        @update:model-value="setItemProlongationOption({ prop: 'enabled', value: $event })"
      />

      <wt-input-number
        v-if="specificControls['taskProcessing.prolongationOptions.renewalSec']"
        v-show="isProlongationEnabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.renewalSec')"
        :model-value="itemInstance.taskProcessing.renewalSec"
        class="object-input-area-grid__processing-renewal-sec"
        @update:model-value="setItemProcessingProp({ prop: 'renewalSec', value: +$event })"
      />

      <wt-input-number
        v-if="specificControls['taskProcessing.prolongationOptions.repeatsNumber']"
        v-show="isProlongationEnabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.repeatsNumber')"
        :model-value="itemInstance.taskProcessing.prolongationOptions.repeatsNumber"
        :min="1"
        class="object-input-area-grid__processing-repeat-numbers"
        @update:model-value="setItemProlongationOption({ prop: 'repeatsNumber', value: +$event })"
      />

      <wt-input-number
        v-if="specificControls['taskProcessing.prolongationOptions.prolongationTimeSec']"
        v-show="isProlongationEnabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.prolongationTimeSec')"
        :model-value="itemInstance.taskProcessing.prolongationOptions.prolongationTimeSec"
        :min="1"
        class="object-input-area-grid__processing-prolongation-time"
        @update:model-value="setItemProlongationOption({ prop: 'prolongationTimeSec', value: +$event })"
      />

      <wt-switcher
        v-if="specificControls['taskProcessing.prolongationOptions.isTimeoutRetry']"
        v-show="isProlongationEnabled"
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.queues.processing.isTimeoutRetry')"
        :model-value="itemInstance.taskProcessing.prolongationOptions.isTimeoutRetry"
        class="object-input-area-grid__processing-timeout-retry"
        @update:model-value="setItemProlongationOption({ prop: 'isTimeoutRetry', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { mapActions } from 'vuex';
import { EngineRoutingSchemaType } from 'webitel-sdk';

import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import FlowsAPI from '../../../../routing/modules/flow/api/flow';
import QueueTypeProperties from '../lookups/QueueTypeProperties.lookup';

export default {
  name: 'OpenedQueueProcessing',
  mixins: [openedTabComponentMixin],
  computed: {
    specificControls() {
      return QueueTypeProperties[this.itemInstance.type].controls.reduce(
        (controls, control) => ({
          ...controls,
          [control]: true,
        }),
        {},
      );
    },
    isProcessingEnabled() {
      return this.itemInstance.taskProcessing.enabled;
    },
    isProlongationEnabled() {
      return this.itemInstance.taskProcessing.enabled && this.itemInstance.taskProcessing.prolongationOptions.enabled;
    },
  },
  methods: {
    ...mapActions({
      setItemProcessingProp(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROCESSING_PROPERTY`, payload);
      },
      setItemProlongationOption(dispatch, payload) {
        return dispatch(`${this.namespace}/SET_ITEM_PROLONGATION_OPTION`, payload);
      },
    }),
    loadDropdownOptionsSchemaList(params) {
      return FlowsAPI.getLookup({
        ...params,
        type: [EngineRoutingSchemaType.Processing, EngineRoutingSchemaType.Default],
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.object-input-area-grid {
  display: grid;
  grid-template-areas:
    'processingEnabled formSchema'
    'sec .'
    'allowProlongation .'
    'renewalSec .'
    'repeatNumbers .'
    'prolongationTime .'
    'timeoutRetry .'
  ;
  grid-template-columns: 1fr 1fr;
  grid-auto-rows: 1fr;

  &__processing-enabled {
    grid-area: processingEnabled;
  }
  &__form-schema {
    grid-area: formSchema;
  }
  &__processing-sec {
    grid-area: sec;
  }
  &__processing-renewal-sec {
    grid-area: renewalSec;
  }
  &__processing-allow-prolongation {
    grid-area: allowProlongation;
  }
  &__processing-repeat-numbers {
    grid-area: repeatNumbers;
  }
  &__processing-prolongation-time {
    grid-area: prolongationTime;
  }
  &__processing-timeout-retry {
    grid-area: timeoutRetry;
  }
}
</style>
