<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.res.failure') }}
      </h3>
    </header>
    <div class="object-input-grid grid-w50">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.maxErrors')"
        :value="itemInstance.maxErrors"
        type="number"
        @input="setItemProp({ prop: 'maxErrors', value: +$event })"
      />
      <wt-tags-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.errorCodes')"
        :options="errorIdsAutocomplete"
        :value="itemInstance.errorIds"
        taggable
        @input="setItemProp({ prop: 'errorIds', value: $event })"
      />
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.failureDialDelay')"
        :value="itemInstance.failureDialDelay"
        type="number"
        @input="setItemProp({ prop: 'failureDialDelay', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedResourceFailure',
  mixins: [openedTabComponentMixin],

  data: () => ({
    errorIdsAutocomplete: [
      '1xx',
      '2xx',
      '3xx',
      '4xx',
      '5xx',
    ],
  }),
};
</script>
