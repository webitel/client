<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">{{ $t('objects.generalInfo') }}</h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      ></wt-input>
      <wt-select
        :disabled="disableUserInput"
        :label="$t('objects.integrations.importCsv.source')"
        :v="v.itemInstance.source"
        :value="itemInstance.source"
        :search-method="loadQueueOptions"
        :clearable="false"
        required
        @input="setItemProp({ prop: 'source', value: $event })"
      ></wt-select>
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      ></wt-textarea>
    </div>
  </section>
</template>

<script>
import openedTabComponentMixin
  from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueuesAPI from '../../../../contact-center/modules/queues/api/queues';

export default {
  name: 'opened-import-csv-general',
  mixins: [openedTabComponentMixin],
  methods: {
    loadQueueOptions(params) {
      return QueuesAPI.getLookup(params);
    },
  },
};
</script>

<style scoped>

</style>
