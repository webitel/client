import { UserSettingsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { computed, onMounted, ref } from 'vue';

import { NotificationType } from '../enums/NotificationType';

// [Claude] types without an EngineSystemSettingName key (socketCloseSound) are kept in localStorage, not on backend
const isBackendNotification = (type: NotificationType) =>
	(Object.values(EngineSystemSettingName) as string[]).includes(type);

const getStorageKey = (type: NotificationType) => `settings/${type}`;

const readLocalNotifications = () =>
	Object.fromEntries(
		Object.values(NotificationType)
			.filter((type) => !isBackendNotification(type))
			.map((type) => [
				type,
				localStorage.getItem(getStorageKey(type)) === 'true',
			]),
	) as Partial<Record<NotificationType, boolean>>;

export const useNotificationSettings = () => {
	const backendNotifications = ref<Partial<Record<NotificationType, boolean>>>(
		{},
	);
	const localNotifications = ref(readLocalNotifications());
	const isLoaded = ref(false);

	const notifications = computed(() =>
		Object.values(NotificationType).map((type) => ({
			type,
			value: isBackendNotification(type)
				? !!backendNotifications.value[type]
				: !!localNotifications.value[type],
		})),
	);

	const loadNotifications = async () => {
		try {
			backendNotifications.value = await UserSettingsAPI.get({
				key: 'notification',
			});
		} finally {
			isLoaded.value = true;
		}
	};

	const updateBackendNotification = async (
		type: NotificationType,
		value: boolean,
	) => {
		backendNotifications.value[type] = value;
		try {
			await UserSettingsAPI.set({
				key: 'notification',
				value: backendNotifications.value,
			});
		} catch {
			backendNotifications.value[type] = !value;
		}
	};

	const updateLocalNotification = (type: NotificationType, value: boolean) => {
		localStorage.setItem(getStorageKey(type), String(value));
		localNotifications.value[type] = value;
	};

	const changeNotification = (type: NotificationType, value: boolean) =>
		isBackendNotification(type)
			? updateBackendNotification(type, value)
			: updateLocalNotification(type, value);

	onMounted(loadNotifications);

	return {
		notifications,
		isLoaded,
		changeNotification,
	};
};
