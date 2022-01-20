<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.res.failure') }}</h3>
    </header>
    <form class="object-input-grid grid-w50">
      <wt-input
        :value="itemInstance.maxErrors"
        :label="$t('objects.ccenter.res.maxErrors')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'maxErrors', value: +$event })"
      ></wt-input>
      <wt-tags-input
        :value="itemInstance.errorIds"
        :autocomplete-items="errorIdsAutocomplete"
        :label="$t('objects.ccenter.res.errorCodes')"
        :add-only-from-autocomplete="false"
        :disabled="disableUserInput"
        @input="setItemProp({ prop: 'errorIds', value: $event })"
      ></wt-tags-input>
      <wt-input
        :value="itemInstance.failureDialDelay"
        :label="$t('objects.ccenter.res.failureDialDelay')"
        :disabled="disableUserInput"
        type="number"
        @input="setItemProp({ prop: 'failureDialDelay', value: +$event })"
      ></wt-input>
    </form>
  </section>
</template>

<script>
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'opened-resource-failure',
  mixins: [openedTabComponentMixin],

  data: () => ({
    errorIdsAutocomplete: [
      { name: '1xx' },
      { name: '2xx' },
      { name: '3xx' },
      { name: '4xx' },
      { name: '5xx' },
    ],
  }),
};
</script>
