import { CalendarsAPI, UserSettingsAPI } from '@webitel/api-services/api';
import type { EngineTimezone } from '@webitel/api-services/gen/models';
import { TIMEZONE_STORAGE_KEY } from '@webitel/ui-sdk/src/modules/Userinfo/constants/UserSettingsConstants';
import { storeToRefs } from 'pinia';
import { onMounted, ref } from 'vue';

import { useUserinfoStore } from '../../../../userinfo/stores/userinfoStore';

const getBrowserTimezone = (): string =>
	Intl.DateTimeFormat().resolvedOptions().timeZone;

const extractTimezoneId = (timezoneString: string): string => {
	if (!timezoneString || typeof timezoneString !== 'string') {
		return '';
	}
	/**
	 * @author @rzaritskyi
	 *
	 * [WTEL-7508](https://webitel.atlassian.net/browse/WTEL-7508)
	 *
	 * Original timezoneString looks like "America/New_York -04:00"
	 * For toLocaleDateString method i need only "America/New_York"
	 * so this regex will extract the part before the space
	 */
	const match = timezoneString.match(/^([^\s]+)/);
	return match?.[1] || timezoneString;
};

const findTimezoneByName = async (
	timezoneId: string,
): Promise<EngineTimezone | undefined> => {
	const { items } = await CalendarsAPI.getTimezonesLookup({
		search: timezoneId,
	});
	return items.find((timezone: EngineTimezone) =>
		timezone.name?.includes(timezoneId),
	);
};

export const useTimezone = () => {
	// [Claude] the user timezone itself lives in userinfo settings store (initialized on app start)
	const userinfoStore = useUserinfoStore();
	const { timezone: userTimezone } = storeToRefs(userinfoStore);

	// [Claude] full lookup name for the select, e.g. "Europe/Kiev 03:00"
	const selectedTimezone = ref<string | null>(null);

	const setTimezone = (timezoneName: string) => {
		const timezoneId = extractTimezoneId(timezoneName);
		userTimezone.value = timezoneId;
		localStorage.setItem(TIMEZONE_STORAGE_KEY, timezoneId);
		selectedTimezone.value = timezoneName;
	};

	const changeTimezone = async (timezone: EngineTimezone) => {
		if (!timezone.name) return;
		const previousTimezone = selectedTimezone.value;

		setTimezone(timezone.name);

		try {
			const { timezone: updatedTimezone } = await UserSettingsAPI.set({
				key: 'timezone',
				value: {
					timezone: extractTimezoneId(timezone.name),
				},
			});
			if (!updatedTimezone && previousTimezone) setTimezone(previousTimezone);
		} catch {
			if (previousTimezone) setTimezone(previousTimezone);
		}
	};

	const initializeTimezone = async () => {
		const targetTimezone = userTimezone.value || getBrowserTimezone();
		const timezone = await findTimezoneByName(targetTimezone);
		selectedTimezone.value = timezone?.name || targetTimezone;
	};

	onMounted(initializeTimezone);

	return {
		selectedTimezone,
		changeTimezone,
	};
};
