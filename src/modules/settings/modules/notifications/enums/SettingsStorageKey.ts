// [Claude] localStorage keys of the settings page; cc-workspaces reads the same keys
export const SettingsStorageKey = {
	Ringtone: 'settings/ringtone',
	RingtoneVolume: 'settings/ringtone-volume',
} as const;

export type SettingsStorageKey =
	(typeof SettingsStorageKey)[keyof typeof SettingsStorageKey];
