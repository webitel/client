import { getCalendarDayRangeIssues } from '@webitel/api-services/validations';
import { computed, type Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import type { CalendarAcceptOfDayUi } from '../stores';

/**
 * Live per-row validation of the work-week table, derived from the same schema
 * the card saves with.
 *
 * The regle field statuses cannot drive this: a cross-row rule (overlapping
 * ranges) is only re-derived by a full `$validate()`, so a row the user has not
 * touched keeps showing a message that no longer holds.
 */
export function useWeekDaysIssues(dataList: Ref<CalendarAcceptOfDayUi[]>) {
	const { t } = useI18n();

	const issues = computed(() => {
		const byField = new Map<string, string>();

		for (const { index, prop, key } of getCalendarDayRangeIssues(
			dataList.value,
		)) {
			const field = `${index}.${prop}`;
			if (!byField.has(field)) byField.set(field, key);
		}

		return byField;
	});

	/** shaped like a regle field status, which is what the inputs read */
	const issueFor = (index: number, prop: 'start' | 'end') => {
		const key = issues.value.get(`${index}.${prop}`);

		if (!key) return undefined;

		return {
			$error: true,
			$errors: [
				t(`validation.${key}`),
			],
		};
	};

	return {
		issueFor,
	};
}
