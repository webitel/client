<template>
  <section>
    <header class="content-header">
      <h3 class="content-title">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :value="itemInstance.name"
        required
        @input="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput"
        :label="$t('objects.integrations.importCsv.source')"
        :search-method="loadQueueOptions"
        :v="v.itemInstance.source"
        :value="itemInstance.source"
        required
        @input="setItemProp({ prop: 'source', value: $event })"
      />
      <wt-textarea
        :disabled="disableUserInput"
        :label="$t('objects.description')"
        :value="itemInstance.description"
        @input="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { QueueType } from 'webitel-sdk/esm2015/enums';

import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueuesAPI from '../../../../contact-center/modules/queues/api/queues';

export default {
  name: 'OpenedImportCsvGeneral',
  mixins: [openedTabComponentMixin],
  methods: {
    loadQueueOptions(params) {
      const type = [
        QueueType.OFFLINE_QUEUE,
        QueueType.OUTBOUND_IVR_QUEUE,
        QueueType.PREVIEW_DIALER,
        QueueType.PROGRESSIVE_DIALER,
        QueueType.PREDICTIVE_DIALER,
        QueueType.CHAT_INBOUND_QUEUE,
        QueueType.INBOUND_JOB_QUEUE,
        QueueType.OUTBOUND_JOB_QUEUE,
      ];
      return QueuesAPI.getLookup({
        ...params,
        type,
      });
    },
  },
};
</script>

<style scoped>

</style>
