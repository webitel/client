import { QueuesAPI } from '@webitel/api-services/api';
import type { EngineQueue } from '@webitel/api-services/gen/models';
import { QueueType } from '@webitel/ui-sdk/enums';
import { computed, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

/**
 * The queue these members belong to — its name for the breadcrumb, and its
 * type, which decides whether members can be edited at all.
 */
export const useParentQueue = () => {
	const route = useRoute();

	const queueId = computed(() => route.params.queueId as string);
	const parentQueue = ref<EngineQueue>({});

	watch(
		queueId,
		async (id) => {
			if (!id) return;
			parentQueue.value = await QueuesAPI.get({
				itemId: id,
			});
		},
		{
			immediate: true,
		},
	);

	/** an inbound queue's members are filled by the flow, so they are read-only */
	const isInboundQueue = computed(
		() => parentQueue.value?.type === QueueType.INBOUND_QUEUE,
	);

	return {
		parentQueue,
		queueId,
		isInboundQueue,
	};
};
