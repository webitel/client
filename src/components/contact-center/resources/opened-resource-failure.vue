<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.ccenter.res.failure') }}</h3>
    </header>
    <form class="object-input-grid grid-w50">
      <wt-input
        :value="maxErrors"
        :label="$t('objects.ccenter.res.maxErrors')"
        type="number"
        @input="setItemProp({ prop: 'maxErrors', value: +$event })"
      ></wt-input>
      <wt-tags-input
        :value="errorIds"
        :autocomplete-items="errorIdsAutocomplete"
        :label="$t('objects.ccenter.res.errorCodes')"
        :add-only-from-autocomplete="false"
        @input="setItemProp({ prop: 'errorIds', value: $event })"
      ></wt-tags-input>
    </form>
  </section>
</template>

<script>
import { mapState } from 'vuex';
import openedTabComponentMixin from '../../../mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';

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

  computed: {
    ...mapState('ccenter/res', {
      maxErrors: (state) => state.itemInstance.maxErrors,
      errorIds: (state) => state.itemInstance.errorIds,
    }),
  },
};
</script>
