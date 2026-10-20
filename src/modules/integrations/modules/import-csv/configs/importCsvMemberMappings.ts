import type { ImportTemplateCard } from '@webitel/api-services/validations';
import type { CsvMappingField } from '@webitel/ui-sdk/modules/UploadCsvPopup';

export type ImportCsvMemberMappingName = keyof NonNullable<
	ImportTemplateCard['parameters']
>['mappings'];

export interface ImportCsvMemberMapping extends CsvMappingField {
	name: ImportCsvMemberMappingName;
	locale: string;
}

const baseLocale = 'objects.ccenter.members.csvMappingFields';

/** [Claude] a queue member's fields a csv column maps to: one column for a plain field, several for a multiple one */
export const importCsvMemberMappings: ImportCsvMemberMapping[] = [
	{
		name: 'name',
		locale: `${baseLocale}.name`,
		required: true,
		csv: '',
	},
	{
		name: 'timezoneId',
		locale: `${baseLocale}.timezoneId`,
		csv: '',
	},
	{
		name: 'priority',
		locale: `${baseLocale}.priority`,
		csv: '',
	},
	{
		name: 'expireAt',
		locale: `${baseLocale}.expireAt`,
		csv: '',
	},
	{
		name: 'bucketId',
		locale: `${baseLocale}.bucketId`,
		csv: '',
	},
	{
		name: 'agentId',
		locale: `${baseLocale}.agentId`,
		csv: '',
	},
	{
		name: 'variables',
		locale: `${baseLocale}.variables`,
		multiple: true,
		csv: [],
	},
	{
		name: 'destination',
		locale: `${baseLocale}.destination`,
		required: true,
		multiple: true,
		csv: [],
	},
	{
		name: 'commPriority',
		locale: `${baseLocale}.commPriority`,
		multiple: true,
		csv: [],
	},
	{
		name: 'code',
		locale: `${baseLocale}.code`,
		required: true,
		multiple: true,
		csv: [],
	},
	{
		name: 'description',
		locale: `${baseLocale}.description`,
		multiple: true,
		csv: [],
	},
	{
		name: 'dtmf',
		locale: `${baseLocale}.dtmf`,
		multiple: true,
		csv: [],
	},
];
