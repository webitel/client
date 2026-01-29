<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.ccenter.res.failure') }}
      </h3>
    </header>
    <div class="object-input-grid grid-w50">
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.maxErrors')"
        :model-value="itemInstance.maxErrors"
        @update:model-value="setItemProp({ prop: 'maxErrors', value: +$event })"
      />
      <wt-tags-input
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.errorCodes')"
        :options="errorIdsAutocomplete"
        :value="itemInstance.errorIds"
        taggable
        @input="setItemProp({ prop: 'errorIds', value: $event })"
      />
      <wt-input-number
        :disabled="disableUserInput"
        :label="$t('objects.ccenter.res.failureDialDelay')"
        :model-value="itemInstance.failureDialDelay"
        @update:model-value="setItemProp({ prop: 'failureDialDelay', value: +$event })"
      />
    </div>
  </section>
</template>

<script>
import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

export default {
  name: 'OpenedResourceFailure',
  mixins: [openedTabComponentMixin],
  setup: () => {
    const { disableUserInput } = useUserAccessControl();
    return {
      disableUserInput,
    };
  },

  data: () => ({
    errorIdsAutocomplete: ['1xx', '2xx', '3xx', '4xx', '5xx'],
  }),
};
</script>
