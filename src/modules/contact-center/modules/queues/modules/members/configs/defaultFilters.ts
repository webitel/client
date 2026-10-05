import { ConfigurationsAPI } from '@webitel/api-services/api';
import { EngineSystemSettingName } from '@webitel/api-services/gen/models';
import { FilterOption } from '@webitel/ui-datalist/filters';
import { normalizeToTimestamp } from '@webitel/ui-sdk/scripts';
import { endOfToday, startOfMonth, subMonths } from 'date-fns';

import {
	type DefaultMembersFilterOptions,
	defaultMembersFilterToRelativeDatetime,
} from '../../../../../../system/modules/configuration/enum/DefaultMembersFilterOptions.enum';

export type DateRange = {
	from: number;
	to: number;
};

const settingRange = (
	setting: DefaultMembersFilterOptions,
): DateRange | undefined => {
	const relative = defaultMembersFilterToRelativeDatetime[setting];

	if (!relative) return undefined;

	return {
		from: normalizeToTimestamp(relative, {
			round: 'start',
		}),
		to: normalizeToTimestamp(relative, {
			round: 'end',
		}),
	};
};

const fallbackRange = (): DateRange => ({
	from: startOfMonth(subMonths(new Date(), 1)).getTime(),
	to: endOfToday().getTime(),
});

export const defaultCreatedAtFilter = (range: DateRange = fallbackRange()) => ({
	name: FilterOption.CreatedAt,
	value: range,
});

export const resolveDefaultCreatedAtFilter = async () => {
	try {
		const { items } = await ConfigurationsAPI.getList({
			name: [
				EngineSystemSettingName.DefaultMembersFilter,
			],
			size: 1,
		});

		const setting = items?.[0]?.value as
			| DefaultMembersFilterOptions
			| undefined;
		const range = setting && settingRange(setting);

		if (range) return defaultCreatedAtFilter(range);
	} catch {
		return defaultCreatedAtFilter();
	}

	return defaultCreatedAtFilter();
};
