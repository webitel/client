import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { DefaultWorkspaceTabOptions } from '../enum/DefaultWorkspaceTabOptions.enum';

interface SelectOption {
	name: string;
	value: string;
	id: string;
}

interface SelectConfig {
	options: SelectOption[];
}

type SelectConfigurations = {
	[key in EngineSystemSettingName]?: SelectConfig;
};

export const selectConfigurations: SelectConfigurations = {
	[EngineSystemSettingName.DefaultWorkspaceTab]: {
		options: Object.values(DefaultWorkspaceTabOptions).map((value) => ({
			name: value,
			value,
			id: value,
		})),
	},
};

export const getSelectConfig = (
	settingName: EngineSystemSettingName,
): SelectConfig | null => {
	return selectConfigurations[settingName] || null;
};
