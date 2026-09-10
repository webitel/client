import { i18nIssue } from '@webitel/api-services/validations';
import { TypesExportedSettings } from '@webitel/ui-sdk/enums';
import { z } from 'zod';

import { ConfigurationValueType } from '../enum/ConfigurationValueType.enum';
import { getParameterDescriptor } from '../utils/parameterDescriptors';

const exportSettingsValueSchema = z
	.object({
		format: z.string().min(1),
		separator: z.string().optional(),
	})
	.superRefine((value, ctx) => {
		if (value.format === TypesExportedSettings.CSV && !value.separator) {
			ctx.addIssue({
				code: 'custom',
				path: [
					'separator',
				],
				...i18nIssue('required'),
			});
		}
	});

const valueSchemaByType: Record<ConfigurationValueType, z.ZodType> = {
	[ConfigurationValueType.Boolean]: z.boolean(),
	[ConfigurationValueType.Number]: z.number().min(0),
	[ConfigurationValueType.String]: z.string().min(1),
	[ConfigurationValueType.Select]: z.string().min(1),
	[ConfigurationValueType.Multiselect]: z.array(z.unknown()).min(1),
	[ConfigurationValueType.ExportSettings]: exportSettingsValueSchema,
};

export const getParameterValueSchema = (name?: string): z.ZodType => {
	const descriptor = getParameterDescriptor(name);
	return descriptor.valueSchema ?? valueSchemaByType[descriptor.type];
};

export const configurationSchema = z
	.object({
		name: z.string().min(1),
		value: z.unknown(),
	})
	.superRefine((data, ctx) => {
		if (!data.name) return;

		const result = getParameterValueSchema(data.name).safeParse(data.value);
		for (const issue of result.error?.issues ?? []) {
			ctx.addIssue({
				...issue,
				path: [
					'value',
					...issue.path,
				],
			});
		}
	});
