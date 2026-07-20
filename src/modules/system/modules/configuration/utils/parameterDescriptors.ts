import type { ValidationArgs } from '@vuelidate/core';
import { minValue } from '@vuelidate/validators';
import { LabelsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { LoginOptions, TypesExportedSettings } from '@webitel/ui-sdk/enums';

import { DefaultWorkspaceTabOptions } from '../enum/DefaultWorkspaceTabOptions.enum';
import { PasswordCategories } from '../enum/PasswordCategories.enum';

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

export interface SelectOption {
	name: string;
	value: string;
	id: string;
}

export interface SelectConfig {
	options: SelectOption[];
	labelKey?: string;
}

export interface MultiselectConfig {
	searchMethod: ((params: unknown) => Promise<unknown>) | null;
	options: unknown[];
	optionLabel: string;
	trackBy: string;
}

export interface ParameterDescriptor {
	type: ConfigurationValueType;
	// value assigned on parameter creation; falls back to the type default
	defaultValue?: unknown;
	// vuelidate rules merged into the popup's `value` rules on top of the type defaults
	validators?: ValidationArgs;
	select?: SelectConfig;
	multiselect?: MultiselectConfig;
	// how to render array values in the configurations table
	listDisplay?: {
		keyProperty: string;
		labelProperty: string;
	};
	// excluded from the "add parameter" list
	hidden?: boolean;
}

const toSelectOptions = (values: Record<string, string>): SelectOption[] =>
	Object.values(values).map((value) => ({
		name: value,
		value,
		id: value,
	}));

const passwordCategoriesOptions = Object.values(PasswordCategories).map(
	(category) => ({
		category,
	}),
);

const parameterDescriptors: {
	[key in EngineSystemSettingName]?: ParameterDescriptor;
} = {
	[EngineSystemSettingName.EnableOmnichannel]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.AmdCancelNotHuman]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.Enable2fa]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.AutolinkCallToContact]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.AutolinkMailToContact]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.IsFulltextSearchEnabled]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.WbtHideContact]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.ShowFullContact]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.ExpandContactTabs]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.BlockAllMemberNumbersFromList]: {
		type: ConfigurationValueType.Boolean,
	},

	[EngineSystemSettingName.MemberChunkSize]: {
		type: ConfigurationValueType.Number,
	},
	[EngineSystemSettingName.SchemeVersionLimit]: {
		type: ConfigurationValueType.Number,
	},
	[EngineSystemSettingName.SearchNumberLength]: {
		type: ConfigurationValueType.Number,
	},
	[EngineSystemSettingName.PeriodToPlaybackRecords]: {
		type: ConfigurationValueType.Number,
		validators: {
			minValue: minValue(1),
		},
	},
	[EngineSystemSettingName.ScreenshotInterval]: {
		type: ConfigurationValueType.Number,
		defaultValue: 30,
	},

	[EngineSystemSettingName.PasswordRegExp]: {
		type: ConfigurationValueType.String,
	},
	[EngineSystemSettingName.PasswordValidationText]: {
		type: ConfigurationValueType.String,
	},
	[EngineSystemSettingName.ChatAiConnection]: {
		type: ConfigurationValueType.String,
	},
	[EngineSystemSettingName.DefaultPassword]: {
		type: ConfigurationValueType.String,
	},

	[EngineSystemSettingName.ExportSettings]: {
		type: ConfigurationValueType.ExportSettings,
		select: {
			options: toSelectOptions(TypesExportedSettings),
		},
	},
	[EngineSystemSettingName.DefaultWorkspaceTab]: {
		type: ConfigurationValueType.Select,
		select: {
			options: toSelectOptions(DefaultWorkspaceTabOptions),
			labelKey: 'vocabulary.values',
		},
	},
	[EngineSystemSettingName.LoginOptions]: {
		type: ConfigurationValueType.Select,
		select: {
			options: toSelectOptions(LoginOptions),
			labelKey: 'vocabulary.values',
		},
	},
	[EngineSystemSettingName.LabelsToLimitContacts]: {
		type: ConfigurationValueType.Multiselect,
		multiselect: {
			searchMethod: LabelsAPI.getLookup,
			options: [],
			optionLabel: 'label',
			trackBy: 'label',
		},
		listDisplay: {
			keyProperty: 'id',
			labelProperty: 'label',
		},
	},

	// Notification
	[EngineSystemSettingName.CallEndSoundNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.CallEndPushNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.ChatEndSoundNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.ChatEndPushNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.TaskEndSoundNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.TaskEndPushNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.NewMessageSoundNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.NewChatSoundNotification]: {
		type: ConfigurationValueType.Boolean,
	},
	[EngineSystemSettingName.PushNotificationTimeout]: {
		type: ConfigurationValueType.Number,
		defaultValue: 30,
	},

	// Password settings
	[EngineSystemSettingName.PasswordExpiryDays]: {
		type: ConfigurationValueType.Number,
	},
	[EngineSystemSettingName.PasswordMinLength]: {
		type: ConfigurationValueType.Number,
		defaultValue: 8,
	},
	[EngineSystemSettingName.PasswordCategories]: {
		type: ConfigurationValueType.Multiselect,
		multiselect: {
			searchMethod: null,
			options: passwordCategoriesOptions,
			optionLabel: 'category',
			trackBy: 'category',
		},
		listDisplay: {
			keyProperty: 'category',
			labelProperty: 'category',
		},
	},
	[EngineSystemSettingName.PasswordContainsLogin]: {
		type: ConfigurationValueType.Boolean,
		defaultValue: false,
	},
	[EngineSystemSettingName.PasswordWarningDays]: {
		type: ConfigurationValueType.Number,
	},
};

// parameters the backend already exposes but the frontend hasn't mapped yet
// are edited as a required string instead of rendering no value control at all
const fallbackDescriptor: ParameterDescriptor = {
	type: ConfigurationValueType.String,
};

export const getParameterDescriptor = (
	name?: EngineSystemSettingName | string,
): ParameterDescriptor => parameterDescriptors[name] || fallbackDescriptor;

const defaultValueByType: Record<ConfigurationValueType, unknown> = {
	[ConfigurationValueType.Boolean]: false,
	[ConfigurationValueType.Number]: 0,
	[ConfigurationValueType.Multiselect]: [],
	[ConfigurationValueType.String]: '',
	[ConfigurationValueType.Select]: '',
	[ConfigurationValueType.ExportSettings]: '',
};

export const getParameterDefaultValue = (
	name?: EngineSystemSettingName | string,
): unknown => {
	const descriptor = getParameterDescriptor(name);
	return descriptor.defaultValue ?? defaultValueByType[descriptor.type];
};
