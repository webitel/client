import {
	type WebphoneBroadcastPayload,
	type UserSettingsBroadcastMessage,
	BroadcastChannelName,
} from '@webitel/ui-sdk/enums';
import { onUnmounted } from 'vue';

export function useSettingsBroadcast() {
	const channel = new BroadcastChannel(BroadcastChannelName.UserSettings);

	function postWebphoneSettings(payload: WebphoneBroadcastPayload) {
		channel.postMessage({
			type: 'webphone',
			payload,
		} as UserSettingsBroadcastMessage);
	}

	onUnmounted(() => {
		channel.close();
	});

	return {
		postWebphoneSettings,
	};
}
