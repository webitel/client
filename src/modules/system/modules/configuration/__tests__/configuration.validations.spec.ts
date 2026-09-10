import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { TypesExportedSettings } from '@webitel/ui-sdk/enums';
import { describe, expect, it } from 'vitest';

import { configurationSchema } from '../validations/configuration.validations';

const issuePaths = (data: unknown) =>
	configurationSchema
		.safeParse(data)
		.error?.issues.map(({ path }) => path.join('.')) ?? [];

describe('configurationSchema', () => {
	it('requires a parameter name', () => {
		expect(
			issuePaths({
				name: '',
				value: true,
			}),
		).toEqual([
			'name',
		]);
	});

	it('validates value by the parameter type', () => {
		expect(
			issuePaths({
				name: EngineSystemSettingName.EnableOmnichannel,
				value: false,
			}),
		).toEqual([]);
		expect(
			issuePaths({
				name: EngineSystemSettingName.EnableOmnichannel,
				value: 'yes',
			}),
		).toEqual([
			'value',
		]);
		expect(
			issuePaths({
				name: EngineSystemSettingName.MemberChunkSize,
				value: -1,
			}),
		).toEqual([
			'value',
		]);
		expect(
			issuePaths({
				name: EngineSystemSettingName.PasswordCategories,
				value: [],
			}),
		).toEqual([
			'value',
		]);
	});

	it('applies the parameter-specific value schema', () => {
		expect(
			issuePaths({
				name: EngineSystemSettingName.PeriodToPlaybackRecords,
				value: 0,
			}),
		).toEqual([
			'value',
		]);
		expect(
			issuePaths({
				name: EngineSystemSettingName.PeriodToPlaybackRecords,
				value: 1,
			}),
		).toEqual([]);
	});

	it('edits an unmapped parameter as a required string', () => {
		expect(
			issuePaths({
				name: 'unknown_parameter',
				value: '',
			}),
		).toEqual([
			'value',
		]);
		expect(
			issuePaths({
				name: 'unknown_parameter',
				value: 'x',
			}),
		).toEqual([]);
	});

	it('requires a separator only for csv export settings', () => {
		const name = EngineSystemSettingName.ExportSettings;

		expect(
			issuePaths({
				name,
				value: '',
			}),
		).toEqual([
			'value',
		]);
		expect(
			issuePaths({
				name,
				value: {
					format: '',
				},
			}),
		).toEqual([
			'value.format',
		]);
		expect(
			issuePaths({
				name,
				value: {
					format: TypesExportedSettings.CSV,
				},
			}),
		).toEqual([
			'value.separator',
		]);
		expect(
			issuePaths({
				name,
				value: {
					format: TypesExportedSettings.CSV,
					separator: ';',
				},
			}),
		).toEqual([]);
		expect(
			issuePaths({
				name,
				value: {
					format: TypesExportedSettings.XLSX,
				},
			}),
		).toEqual([]);
	});
});
