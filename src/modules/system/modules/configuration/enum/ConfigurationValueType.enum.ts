export const ConfigurationValueType = {
	Boolean: 'boolean',
	Number: 'number',
	String: 'string',
	Select: 'select',
	Multiselect: 'multiselect',
	ExportSettings: 'export-settings',
} as const;

export type ConfigurationValueType =
	(typeof ConfigurationValueType)[keyof typeof ConfigurationValueType];
