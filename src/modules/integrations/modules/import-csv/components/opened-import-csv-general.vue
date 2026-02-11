<template>
  <section>
    <header class="content-header">
      <h3 class="content-title typo-heading-4">
        {{ $t('objects.generalInfo') }}
      </h3>
    </header>
    <div class="object-input-grid">
      <wt-input-text
        :disabled="disableUserInput"
        :label="$t('objects.name')"
        :v="v.itemInstance.name"
        :model-value="itemInstance.name"
        required
        @update:model-value="setItemProp({ prop: 'name', value: $event })"
      />
      <wt-select
        :clearable="false"
        :disabled="disableUserInput || !hasQueuesReadAccess"
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
        :model-value="itemInstance.description"
        @update:model-value="setItemProp({ prop: 'description', value: $event })"
      />
    </div>
  </section>
</template>

<script>
import { WtObject } from '@webitel/ui-sdk/enums';
import { QueueType } from 'webitel-sdk/esm2015/enums';

import { useUserAccessControl } from '../../../../../app/composables/useUserAccessControl';
import openedTabComponentMixin from '../../../../../app/mixins/objectPagesMixins/openedObjectTabMixin/openedTabComponentMixin';
import QueuesAPI from '../../../../contact-center/modules/queues/api/queues';

export default {
	name: 'OpenedImportCsvGeneral',
	mixins: [
		openedTabComponentMixin,
	],
	setup: () => {
		const { disableUserInput } = useUserAccessControl();
		const { hasReadAccess: hasQueuesReadAccess } = useUserAccessControl(
			WtObject.Queue,
		);
		return {
			disableUserInput,
			hasQueuesReadAccess,
		};
	},
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

<style scoped></style>
