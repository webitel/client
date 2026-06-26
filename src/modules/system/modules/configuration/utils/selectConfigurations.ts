import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { TypesExportedSettings } from '@webitel/ui-sdk/enums';

import { DefaultWorkspaceTabOptions } from '../enum/DefaultWorkspaceTabOptions.enum';
import { LoginOptions } from '../enum/LoginOptions.enum';

interface SelectOption {
	name: string;
	value: string;
	id: string;
}

interface SelectConfig {
	options: SelectOption[];
	labelKey: string;
	prop: string;
}

type SelectConfigurations = {
	[key in EngineSystemSettingName]?: SelectConfig;
};

export const selectConfigurations: SelectConfigurations = {
	[EngineSystemSettingName.ExportSettings]: {
		options: Object.values(TypesExportedSettings).map((value: string) => ({
			name: value,
			value,
			id: value,
		})),
		labelKey: 'vocabulary.format',
		prop: 'format',
	},
	[EngineSystemSettingName.DefaultWorkspaceTab]: {
		options: Object.values(DefaultWorkspaceTabOptions).map((value: string) => ({
			name: value,
			value,
			id: value,
		})),
		labelKey: 'vocabulary.values',
		prop: 'value',
	},
	[EngineSystemSettingName.LoginOptions]: {
		options: Object.values(LoginOptions).map((value: string) => ({
			name: value,
			value,
			id: value,
		})),
		labelKey: 'vocabulary.values',
		prop: 'value',
	},
};

export const defaultSelectConfig: SelectConfig = {
	options: [],
	labelKey: 'vocabulary.values',
	prop: 'value',
};

export const getSelectConfig = (
	settingName: EngineSystemSettingName,
): SelectConfig => {
	return selectConfigurations[settingName] || defaultSelectConfig;
};
