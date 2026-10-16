import {
	type ChatGatewayChannelParams,
	type ChatGatewayChannelSetup,
	ChatGatewayChannelsAPI,
} from '@webitel/api-services/api';
import { useEventBus } from '@webitel/ui-sdk/composables';
import { type MaybeRefOrGetter, type Ref, ref, toValue } from 'vue';

import { getAppUrls } from '../../../../../../../app/api/getAppUrls';
import openMessengerWindow, {
	type MessengerWindowMessage,
} from '../../../scripts/openMessengerWindow';

/**
 * [Claude] A messenger tab's list (facebook pages, instagram, whatsapp accounts).
 * The chat service returns it whole for the gateway's uri, with no paging, so it
 * lives in the tab rather than in a datalist store.
 */
export const useMessengerList = <Item>({
	uri,
	getList,
}: {
	uri: MaybeRefOrGetter<string | undefined>;
	getList: (params: ChatGatewayChannelParams) => Promise<Item[]>;
}) => {
	const eventBus = useEventBus();

	const dataList = ref<Item[]>([]) as Ref<Item[]>;
	const isLoading = ref(false);

	/** [Claude] the gateway's channel address in the chat service */
	const channelParams = (): ChatGatewayChannelParams => ({
		uri: toValue(uri) ?? '',
		appUrls: getAppUrls(),
	});

	const loadList = async () => {
		if (!toValue(uri)) return;
		isLoading.value = true;
		try {
			dataList.value = await getList(channelParams());
		} catch {
			// [Claude] the api has already shown the error; an empty table keeps the tab usable
			dataList.value = [];
		} finally {
			isLoading.value = false;
		}
	};

	/** [Claude] reloads after a change and runs the list request once more even when it fails */
	const withReload = async (action: () => Promise<unknown>) => {
		try {
			await action();
		} finally {
			await loadList();
		}
	};

	/** [Claude] the messenger's own setup page, in a popup that reports back with a message */
	const openSetupWindow = (setup: ChatGatewayChannelSetup) =>
		openMessengerWindow({
			url: ChatGatewayChannelsAPI.getSetupUrl({
				...channelParams(),
				setup,
			}),
			listener: ({ data }: MessageEvent<MessengerWindowMessage>) => {
				if (data.status === 'success') loadList();
				else if (data.status === 'error') {
					eventBus.$emit('notification', {
						type: 'error',
						text: data.detail,
					});
				}
			},
		});

	loadList();

	return {
		dataList,
		isLoading,
		loadList,
		withReload,
		channelParams,
		openSetupWindow,
	};
};
