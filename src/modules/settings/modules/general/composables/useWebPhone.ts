import { UserSettingsAPI } from '@webitel/api-services/api';
import { onMounted, ref } from 'vue';

export const useWebPhone = () => {
	const webrtc = ref(true);
	const stun = ref(false);

	const save = () =>
		UserSettingsAPI.set({
			key: 'phone',
			value: {
				webrtc: webrtc.value,
				stun: stun.value,
			},
		});

	const changeWebrtc = async (value: boolean) => {
		webrtc.value = value;
		if (!value) stun.value = false;

		await save();
	};

	const changeStun = async (value: boolean) => {
		stun.value = !webrtc.value ? false : value;

		await save();
	};

	const loadWebPhone = async () => {
		const settings = await UserSettingsAPI.getWebPhone();
		if (!settings) return;
		webrtc.value = settings.webrtc;
		stun.value = settings.stun;
	};

	onMounted(loadWebPhone);

	return {
		webrtc,
		stun,
		changeWebrtc,
		changeStun,
	};
};
