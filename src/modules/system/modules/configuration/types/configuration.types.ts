import type {
	EngineSystemSetting,
	EngineSystemSettingName,
} from '@webitel/api-services/gen/models';
import type { z } from 'zod';

import type { ConfigurationValueType } from '../enum/ConfigurationValueType.enum';

export interface ConfigurationParameter
	extends Omit<EngineSystemSetting, 'name'> {
	name?: EngineSystemSettingName | string;
	value?: unknown;
}

export interface ExportSettingsValue {
	format: string;
	separator?: string;
}

export interface SelectOption {
	name: string;
	value: string;
	id: string;
	locale?: string;
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
	// replaces the type's default `value` schema
	valueSchema?: z.ZodType;
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
